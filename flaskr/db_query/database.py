import os

import psycopg2
from psycopg2 import sql

from flaskr.log.log import error_log, info_log

module_name = "flaskr.db_query.database"

class Database:
    def __init__(self):
        if ('DATABASE_URL' in os.environ):
            self.DATABASE_URL = os.environ['DATABASE_URL']
        else :
            self.DATABASE_URL = "dbname='IF4061_angkot' user='postgres' host='localhost' password='' port='5433'"
        
        self.table_name = self.get_table()
        self.column_name = {}
        if (self.table_name is not None):
            for table in self.table_name :
                self.column_name[table] = self.get_column(table)

    def execute(self, query, values, query_type:str):
        try :
            conn = psycopg2.connect(self.DATABASE_URL)
            cur = conn.cursor()
            if (len(values) == 0):
                cur.execute(query)
            else :
                cur.execute(query, values)
        except Exception as e :
            error_log(module_name, e)
        else :
            if (query_type == "commit"):
                conn.commit()
            elif (query_type == "fetch"):
                return cur.fetchall()
            elif (query_type == "cursor"):
                return cur
        finally :
            conn.close()

    def get_table(self):
        from_table = ["pg_class"]
        select_column = ["relname"]
        id_column = ["relkind","relname"]
        query = sql.SQL("SELECT {0} FROM {1} WHERE {2} = %s AND {3} !~ %s").format(
            sql.SQL(', ').join(map(sql.Identifier,select_column)),
            sql.Identifier(from_table[0]),
            sql.Identifier(id_column[0]),
            sql.Identifier(id_column[1])
            )
        try :
            result = self.execute(query, ['r', '^(pg_|sql_)'], "fetch")
            result_data = {}
            if (result[0] is not None):
                for data in result:
                    result_data[data[0]] = data[0]
        except Exception as e:
            error_log(module_name, e)
        else :
            return result_data

    def get_column(self, table):
        from_table = [table]
        query = sql.SQL("SELECT * FROM {0} LIMIT 0").format(
            sql.Identifier(from_table[0])
            )
        try :
            result = self.execute(query, [], "cursor")
            result_data = {}
            if (result.description is not None):
                for desc in result.description:
                    result_data[desc[0]] = desc[0]
        except Exception as e:
            error_log(module_name, e)
        else :
            return result_data

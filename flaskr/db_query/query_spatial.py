from psycopg2 import sql

from flaskr.db_query.database import Database
from flaskr.log.log import error_log, info_log

module_name = "flaskr.db_query.query_spatial"

def get_kecamatan():
    return select_kecamatan()

def build_sql_inputs(input_list):
    inputs = ", ".join(input_list)
    sql = "({})".format(inputs)
    return sql

def select_kecamatan():
    db = Database()
    from_table = [
        db.table_name["kecamatan"]
    ]
    select_column = [
        db.column_name["kecamatan"]["kecamatan"],
        db.column_name["kecamatan"]["geometry"]
    ]
    id_column = [
        db.column_name["kecamatan"]["kecamatan"]
    ]
    query = sql.SQL("SELECT kecamatan.kecamatan, ST_AsGeoJSON({1}) "
                    "FROM {2} "
                    "ORDER BY kecamatan.kecamatan ASC").format(
        sql.Identifier(select_column[0]),
        sql.Identifier(select_column[1]),
        sql.Identifier(from_table[0])
        )
    try :
        result = db.execute(query, [], "fetch")
        r_kecamatan = []
        r_geojson = []
        if (result is not None):
            for i in range(len(result)):
                r_kecamatan.append(result[i][0])
                r_geojson.append(result[i][1])
            result_data = {
                "kecamatan" : r_kecamatan,
                "geojson"   : r_geojson
            }
    except Exception as e:
        error_log(module_name, e)
    else :
        return result_data

def select_sekolah(kecamatan):
    db = Database()
    from_table = [
        db.table_name["sekolah"],
        db.table_name["kecamatan"]
    ]
    select_column = [
        db.column_name["kecamatan"]["kecamatan"],
        db.column_name["sekolah"]["jumlah_pd"],
        "ST_PointOnSurface({0})".format(db.column_name["kecamatan"]["geometry"])
    ]
    join_column = [
        db.column_name["sekolah"]["id_kecamatan"],
        db.column_name["kecamatan"]["object_id"]
    ]
    id_column = [
        db.column_name["kecamatan"]["kecamatan"]
    ]
    query = sql.SQL("SELECT {0} "
                    "FROM {1} JOIN {2} ON {3} = {4}"
                    "WHERE {5} IN %s").format(
        sql.SQL(', ').join(map(sql.Identifier,select_column)),
        sql.Identifier(from_table[0]),
        sql.Identifier(from_table[1]),
        sql.Identifier(join_column[0]),
        sql.Identifier(join_column[1]),
        sql.Identifier(id_column[0])
        )
    try :
        result = db.execute(query, [kecamatan], "fetch")
        result_data = {}
        if (result[0] is not None):
            for data in result:
                result_data[data[0]] = data[0]
    except Exception as e:
        error_log(module_name, e)
    else :
        return result_data


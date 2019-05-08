from psycopg2 import sql

from flaskr.db_query.database import Database
from flaskr.log.log import error_log, info_log

module_name = "flaskr.db_query.query_angkot"

def get_trayek():
    return select_trayek()

def select_trayek():
    db = Database()
    from_table = [
        db.table_name["trayek"]
    ]
    select_column = [
        db.column_name["trayek"]["nama_trayek"],
        db.column_name["trayek"]["jarak"],
        db.column_name["trayek"]["jumlah"]
    ]
    id_column = [
        db.column_name["trayek"]["nama_trayek"]
    ]
    query = sql.SQL("SELECT {0} "
                    "FROM {1} "
                    "ORDER BY nama_trayek ASC").format(
        sql.SQL(', ').join(map(sql.Identifier,select_column)),
        sql.Identifier(from_table[0])
        )
    try :
        result = db.execute(query, [], "fetch")
        r_trayek = []
        r_jarak = []
        r_jumlah = []
        if (result is not None):
            for i in range(len(result)):
                r_trayek.append(result[i][0])
                r_jarak.append(result[i][1])
                r_jumlah.append(result[i][2])
            result_data = {
                "trayek"    : r_trayek,
                "jarak"     : r_jarak,
                "jumlah"    : r_jumlah
            }
    except Exception as e:
        error_log(module_name, e)
    else :
        return result_data

def select_jalur():
    db = Database()
    query = sql.SQL(
        "SELECT "
        "trayek.nama_trayek, "
        "ST_Makeline( "
            "ST_PointOnSurface(kecamatan.geometry) "
            "ORDER BY ST_distance( "
                "st_pointonsurface(kecamatan.geometry), "
                "st_pointonsurface(kecamatan.geometry) "
            ") "
		") "
        "FROM kecamatan "
        "JOIN kecamatan_trayek ON kecamatan_trayek.id_kecamatan = kecamatan.object_id "
        "JOIN trayek ON kecamatan_trayek.id_trayek = trayek.id_trayek "
        "GROUP BY trayek.nama_trayek "
        "ORDER BY nama_trayek")
    try :
        result = db.execute(query, [], "fetch")
        r_trayek = []
        r_jalur = []
        if (result is not None):
            for i in range(len(result)):
                r_trayek.append(result[i][0])
                r_jalur.append(result[i][1])
            result_data = {
                "trayek"    : r_trayek,
                "jalur"     : r_jalur
            }
    except Exception as e:
        error_log(module_name, e)
    else :
        return result_data

def select_angkot_per_kecamatan():
    pass

def select_total_angkot():
    db = Database()
    query = sql.SQL("SELECT SUM(jumlah) FROM trayek")
    try :
        result = db.execute(query, [], "fetch")
        if (result is not None):
            result_data = {
                "total"    : result[0][0]
            }
    except Exception as e:
        error_log(module_name, e)
    else :
        return result_data
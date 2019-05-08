from psycopg2 import sql

from flaskr.db_query.database import Database
from flaskr.log.log import error_log, info_log

module_name = "flaskr.db_query.query_angkot_sekolah"

def get_kebutuhan_per_km2(kapasitas, limit):
    return select_kebutuhan_per_km2(kapasitas, limit)

def select_kebutuhan_per_km2(kapasitas, limit):
    db = Database()
    query = sql.SQL("SELECT "
        "kecamatan.kecamatan, "
        "ROUND(CAST((sekolah.jumlah_pd/%s)/kecamatan.luas as numeric), 2) as jumlah_pd, "
        "ROUND(CAST(SUM(trayek.jumlah)/kecamatan.luas as numeric), 2) as jumlah_angkot, "
        "ROUND(CAST(SUM(trayek.jumlah)-(sekolah.jumlah_pd/%s)/kecamatan.luas as numeric), 2) as kebutuhan "
        "FROM sekolah "
        "JOIN kecamatan ON sekolah.id_kecamatan=kecamatan.object_id "
        "JOIN kecamatan_trayek ON kecamatan_trayek.id_kecamatan=sekolah.id_kecamatan "
        "JOIN trayek ON kecamatan_trayek.id_trayek=trayek.id_trayek "
        "GROUP BY kecamatan.kecamatan, sekolah.jumlah_pd, kecamatan.luas "
        "ORDER BY kebutuhan ASC LIMIT %s")
    try :
        result = db.execute(query, [kapasitas, kapasitas, limit], "fetch")
        r_kecamatan = []
        r_jumlah_pd = []
        r_jumlah_angkot = []
        r_kebutuhan = []
        if (result is not None):
            for i in range(len(result)):
                r_kecamatan.append(result[i][0])
                r_jumlah_pd.append(result[i][1])
                r_jumlah_angkot.append(result[i][2])
                r_kebutuhan.append(result[i][3])
            result_data = {
                "kecamatan"     : r_kecamatan,
                "siswa"         : r_jumlah_pd,
                "angkot"        : r_jumlah_angkot,
                "kebutuhan"     : r_kebutuhan,
            }
    except Exception as e:
        error_log(module_name, e)
    else :
        return result_data
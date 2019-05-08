from psycopg2 import sql

from flaskr.db_query.database import Database
from flaskr.log.log import error_log, info_log

module_name = "flaskr.db_query.query_sekolah"

def get_total_siswa():
    return select_total_siswa()

def get_siswa():
    return select_siswa()

def select_siswa():
    db = Database()
    query = sql.SQL(
        "SELECT kecamatan.kecamatan, st_pointonsurface(kecamatan.geometry), "
            "jumlah_pd, jumlah_pd_sd, jumlah_pd_smp, jumlah_pd_sma, jumlah_pd_smk, jumlah_pd_slb "
        "FROM sekolah "
        "JOIN kecamatan ON sekolah.id_kecamatan=kecamatan.object_id")
    try :
        result = db.execute(query, [], "fetch")
        r_kecamatan = []
        r_geom = []
        r_total = []
        r_sd = []
        r_smp = []
        r_sma = []
        r_smk = []
        r_slb = []
        if (result is not None):
            for i in range(len(result)):
                r_kecamatan.append(result[i][0])
                r_geom.append(result[i][1])
                r_total.append(result[i][2])
                r_sd.append(result[i][3])
                r_smp.append(result[i][4])
                r_sma.append(result[i][5])
                r_smk.append(result[i][6])
                r_slb.append(result[i][7])
            result_data = {
                "kecamatan"    : r_kecamatan,
                "geom"     : r_geom,
                "total"     : r_total,
                "sd"     : r_sd,
                "smp"     : r_smp,
                "sma"     : r_sma,
                "smk"     : r_smk,
                "slb"     : r_slb
            }
    except Exception as e:
        error_log(module_name, e)
    else :
        return result_data

def select_total_siswa():
    db = Database()
    query = sql.SQL(
        "SELECT SUM(jumlah_pd), SUM(jumlah_pd_sd), SUM(jumlah_pd_smp), SUM(jumlah_pd_sma), SUM(jumlah_pd_smk), SUM(jumlah_pd_slb) "
        "FROM sekolah "
        "JOIN kecamatan ON sekolah.id_kecamatan=kecamatan.object_id")
    try :
        result = db.execute(query, [], "fetch")
        if (result is not None):
            result_data = {
                "total"    : result[0][0],
                "sd"     : result[0][1],
                "smp"     : result[0][2],
                "sma"     : result[0][3],
                "smk"     : result[0][4],
                "slb"     : result[0][5]
            }
    except Exception as e:
        error_log(module_name, e)
    else :
        return result_data
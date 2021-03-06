import os
import multiprocessing as mp
import sys
from os import environ
import json 

from flask import Flask
from flask import render_template
from flask import request

from flaskr.db_query.query_angkot_sekolah import get_kebutuhan_per_km2
from flaskr.db_query.query_angkot import get_trayek, get_angkot_total, get_angkot_per_kecamatan
from flaskr.db_query.query_sekolah import get_total_siswa, get_siswa
from flaskr.db_query.query_spatial import get_kecamatan
from flaskr.http_request.send import send_http_request
from flaskr.log.log import error_log, info_log

module_name = "app"
app = Flask(__name__)

@app.route("/sekolah", methods=['POST'])
def sekolah():
    print(request)
    return '1'

@app.route("/kapasitas", methods=['POST'])
def kapasitas():
    return request.form['kapasitas']

@app.route("/")
def index():
    kecamatan = get_kecamatan()
    trayek = get_trayek()
    angkot_total = get_angkot_total()
    siswa_total = get_total_siswa()
    siswa = get_siswa()
    angkot, angkot_kecamatan = get_angkot_per_kecamatan()
    
    spatial = []
    for i in range(len(siswa['geojson'])):
        jml_angkot = 0

        if (siswa["kecamatan"][i] not in angkot_kecamatan):
            jml_angkot = 0
        elif (siswa["kecamatan"][i] in angkot_kecamatan):
            index = angkot_kecamatan.index(siswa["kecamatan"][i])
            for j in range(len(angkot[index]["angkot"])):
                jml_angkot = jml_angkot + angkot[index]["angkot"][j]
        
        spatial.append([
            siswa["kecamatan"][i], 
            json.loads(siswa['geojson'][i]),
            siswa["total"][i],
            jml_angkot
        ])
    
    return render_template(
        'index.html',
        kecamatan = kecamatan,
        trayek = trayek,
        angkot_total = angkot_total,
        siswa_total = siswa_total,
        siswa = siswa,
        angkot = angkot,
        spatial = spatial
    )
    #return render_template('index.html')

if __name__ == '__main__':
    try:
        info_log(module_name, "START SERVER")
        multi_process = mp.Process(target=send_http_request)
        multi_process.start()
        app.run(host='0.0.0.0',debug=False, port=environ.get("PORT", 5000))
        multi_process.join()
    except Exception as e :
        multi_process.close()
        error_log(module_name, e)
        info_log(module_name, "END SERVER")
        os.execv(sys.executable, [sys.executable, 'app.py'] + sys.argv)
        sys.exit()
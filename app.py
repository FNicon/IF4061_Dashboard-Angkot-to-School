import os
import multiprocessing as mp
import sys
from os import environ

from flask import Flask
from flask import render_template

from flaskr.db_query.query_spatial import get_kecamatan
from flaskr.http_request.send import send_http_request
from flaskr.log.log import error_log, info_log

module_name = "app"
app = Flask(__name__)

@app.route("/")
def index():
    kecamatan = get_kecamatan(['CICENDO','DAGO'])
    return render_template('index.html', kecamatan=kecamatan)
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
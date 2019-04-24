import os
import multiprocessing as mp
import sys
from os import environ

from flask import Flask

from utils.http_request.send import SendHTTPRequest
from utils.log.log import ErrorLog, InfoLog

module_name = "app.py"
app = Flask(__name__)

@app.route("/")
def hello():
	return "Hello World!"

if __name__ == '__main__':
	try:
		InfoLog(module_name, "START SERVER")
		multi_process = mp.Process(target=SendHTTPRequest)
		multi_process.start()
		app.run(host='0.0.0.0',debug=False, port=environ.get("PORT", 5000))
		multi_process.join()
	except Exception as e :
		multi_process.close()
		ErrorLog(module_name, e)
		InfoLog(module_name, "END SERVER")
		os.execv(sys.executable, [sys.executable, 'app.py'] + sys.argv)
		sys.exit()
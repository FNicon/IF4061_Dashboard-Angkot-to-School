import os
import sys
import time
import urllib.request

from flaskr.log.log import error_log, info_log

module_name = "flaskr.http_request.send"

def send_http_request():
	info_log(module_name, "START SEND REQUEST")
	while True :
		try :
			time.sleep(1740)
			contents = urllib.request.urlopen("http://dashboard-angkot-to-school.herokuapp.com/").read()
			info_log(module_name, contents)
		except Exception as e :
			error_log(module_name, e)
			info_log(module_name, "END SEND REQUEST")
			sys.exit()

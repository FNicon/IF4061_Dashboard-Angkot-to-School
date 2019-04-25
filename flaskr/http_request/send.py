import os
import sys
import time
import urllib.request

from flaskr.log.log import ErrorLog, InfoLog

module_name = "utils.log.log.py"

def SendHTTPRequest():
	InfoLog(module_name, "START SEND REQUEST")
	while True :
		try :
			time.sleep(1740)
			contents = urllib.request.urlopen("http://dashboard-angkot-to-school.herokuapp.com/").read()
			InfoLog(module_name, contents)
		except Exception as e :
			ErrorLog(module_name, e)
			InfoLog(module_name, "END SEND REQUEST")
			sys.exit()

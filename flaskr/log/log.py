import logging
import time

def ConfigLog():
	logging.basicConfig(
		filename="app_log/app.log",
		format='%(levelname)s:%(asctime)s %(message)s',
		datefmt='%m/%d/%Y %I:%M:%S %p')

def WarningLog(module, msg):
	logging.warning("{0}:{1}".format(module,msg))

def ErrorLog(module, msg):
	logging.error("{0}:{1}".format(module,msg))

def InfoLog(module, msg):
	logging.info("{0}:{1}".format(module,msg))

import logging
import time

def config_log():
	logging.basicConfig(
		filename="app_log/app.log",
		format='%(levelname)s:%(asctime)s %(message)s',
		datefmt='%m/%d/%Y %I:%M:%S %p')

def warning_log(module, msg):
	logging.warning("{0}:{1}".format(module,msg))

def error_log(module, msg):
	logging.error("{0}:{1}".format(module,msg))

def info_log(module, msg):
	logging.info("{0}:{1}".format(module,msg))

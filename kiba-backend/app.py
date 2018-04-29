# -*- coding: utf-8 -*-

from flask import Flask, request, Response
from flask_restful import Resource, Api
from flask_cors import CORS
from robocontrol import RoboControl
import requests

# Flask and CORS setup
app = Flask(__name__)
api = Api(app)
CORS(app)

robo = RoboControl()

class KIBA(Resource):
	def get(self, percentage):
		print percentage
		robo.reset()
		robo.ready(percentage)
		return {"kiba": percentage}

class KIBAreset(Resource):
	def get(self):
		robo.reset()
		return {"kiba": "reset"}

class KIBAclean(Resource):
	def get(self):
		robo.clean()
		return {"kiba": "clean"}

class KIBAlights(Resource):
	def get(self, command):
		if(command == "on"):
			robo.lights("on")
			return {"kiba": "lights on"}
		else:
			robo.lights("off")
			return {"kiba": "lights off"}

class JobData(Resource):
	def get(self, jobid):
		if(jobid == 12345):
			return {"id":12345,"name":"Bundesministerin für Bildung und Forschung im Kabinett Merkel IV","potential":68,"skills":[{"id":123451,"skill":"Organisatorische und inhaltliche Leitung","replaceable":False},{"id":123452,"skill":"Teilnahme an Sitzungen","replaceable":False},{"id":123453,"skill":"Reden halten im Bundestag und bei offiziellen Anlässen","replaceable":True}]}
		else:
			r = requests.get("https://job-futuromat.iab.de/api/job/" + str(jobid))
			return Response(
				r.text,
				status = r.status_code,
				content_type = r.headers['content-type']
			)

api.add_resource(KIBA, '/kiba/<int:percentage>')
api.add_resource(KIBAreset, '/kiba/reset')
api.add_resource(KIBAclean, '/kiba/clean')
api.add_resource(KIBAlights, '/kiba/lights/<string:command>')
api.add_resource(JobData, '/jobdata/<int:jobid>')

if __name__ == '__main__':
	app.run(debug=True)

# -*- coding: utf-8 -*-

from flask import Flask, request, Response
from flask_restful import Resource, Api
from flask_cors import CORS
from robocontrol import RoboControl
import requests
import datetime
from tinydb import TinyDB, Query


# Flask and CORS setup
app = Flask(__name__)
api = Api(app)
db = TinyDB('stats.json')
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

class KIBAtestButton(Resource):
	def get(self):
		robo.testButton()
		return {"kiba": "testButton"}

class JobData(Resource):
	def get(self, jobid):
		if(jobid == 12345):
			return {"id":12345,"name":"Bundesministerin für Bildung und Forschung im Kabinett Merkel IV","potential":68,"skills":[{"id":123451,"skill":"Organisatorische und inhaltliche Leitung","replaceable":False},{"id":123452,"skill":"Teilnahme an Sitzungen","replaceable":False},{"id":123453,"skill":"Reden halten im Bundestag und bei offiziellen Anlässen","replaceable":True}]}
		else:
			with open("jobdata/" + str(jobid) + ".json", "r") as read_file:
				data = read_file.read()
				return Response(
					data,
					status = 200,
					content_type = "application/json"
				)

class StatsData(Resource):
	def post(self):
		timestamp = datetime.datetime.now().isoformat()
		json_data = request.get_json(force=True)
		json_data["timestamp"] = timestamp
		return {"id": db.insert(json_data)}


api.add_resource(KIBA, '/kiba/<int:percentage>')
api.add_resource(KIBAreset, '/kiba/reset')
api.add_resource(KIBAclean, '/kiba/clean')
api.add_resource(KIBAlights, '/kiba/lights/<string:command>')
api.add_resource(KIBAtestButton, '/kiba/testButton')
api.add_resource(JobData, '/jobdata/<int:jobid>')
api.add_resource(StatsData, '/stats')

if __name__ == '__main__':
	app.run(debug=True)

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

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

class JobData(Resource):
	def get(self, jobid):
		r = requests.get("https://job-futuromat.iab.de/api/job/" + str(jobid))
		return Response(
			r.text,
			status = r.status_code,
			content_type = r.headers['content-type']
		)

api.add_resource(KIBA, '/<int:percentage>')
api.add_resource(JobData, '/jobdata/<int:jobid>')

if __name__ == '__main__':
    app.run(debug=True)
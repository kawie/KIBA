from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
from robocontrol import RoboControl

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

api.add_resource(KIBA, '/<int:percentage>')

if __name__ == '__main__':
    app.run(debug=True)
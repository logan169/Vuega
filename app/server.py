

from static.python import kernel as K
import json
import flask

def App():
    # Initialize the Flask application
    app = flask.Flask(__name__)



	#return index.html on load
    @app.route('/')
    def index():

        return flask.render_template("index.html")



    @app.route('/getData/',methods=['GET'])
    def getData():

    	v = [
	      {"a": 5,"b": 28}, {"a": 3,"b": 55}, {"a": 7,"b": 43},
	      {"a": 1,"b": 91}, {"a": 2,"b": 81}, {"a": 8,"b": 53},
	      {"a": 4,"b": 19}, {"a": 6,"b": 87}, {"a": 9,"b": 52}
	    ]

    	return flask.jsonify(**K.JSONResponse(data = v, error=False, message='Data send'))

    return app

if __name__ == '__main__':
	
	app=App()
	app.run(debug=True)







































Weather App
=============

A nodejs micro service to display past week's weather information based on a location

This micro service is hosted on google cloud cluster running on top of kubernetes.

# Endpoints for testing:

1. To display past one week's weather information from today based on a location

http://{host}:{port}/weather/pastweek/42.3601,-71.0589

this app running at:
http://35.188.219.158:3000/weather/pastweek/42.3601,-71.0589


2. To get today's weather information

http://{host}:{port}/weather/42.3601,-71.0589

this app running at:
http://35.188.219.158:3000/weather/42.3601,-71.0589

# Testing
Use POSTMAN/REST client to test:
Doing HTTP GET to url: http://35.188.219.158:3000/weather/pastweek/42.3601,-71.0589
should get you response along these lines:

 ```
 [
    {
        "02/16/2018": {
            "latitude": 42.3601,
            "longitude": -71.0589,
            "timezone": "America/New_York",
            "hourly": {...},
            "daily" : {...}
            "offset": -5
        }
    },
    {
        "02/15/2018": {
			"latitude": 42.3601,
            "longitude": -71.0589,
            "timezone": "America/New_York",
            "hourly": {...},
            "daily" : {...}
            "offset": -5
        }
    },
    {	
    	"02/14/2018": {
			"latitude": 42.3601,
            "longitude": -71.0589,
            "timezone": "America/New_York",
            "hourly": {...},
            "daily" : {...}
            "offset": -5
        }

	}
	...... and so on for last 7 days.
]
```

Development setup
=============

* should have both nodeJs and npm installed
* git clone https://github.com/venkatesh608/weather.git
* npm install --save
* node app.js    (starts on port 3000)
* test it: http://localhost:3000/weather/pastweek/42.3601,-71.0589

# Deploy NodeJs docker app onto kubernetes on google cloud
=============
# cd to location where your clone "weather" app resides.
	$cd weather
# Install Google Cloud SDK
	follow the instructions here: https://cloud.google.com/sdk/
	$gcloud init   -> to initialize sdk with credentials
# Install Kuberbetes client:
	$ gcloud components install kubectl
	On macosx, 
	$brew install kubectl
# Check kubectl version
	$kubectl version
# Create a GCP project
	from here: https://console.cloud.google.com/
# Set the defualt project_id to the "weather" project
	$gcloud config set project weather-195622
# Create docker image for weather App.
	$docker build -t weather-image . 
# Run locally and test: 
	$docker run --name weather-image -p 3000:3000 weather-image	
# Build Docker Image to upload to Google Container Image Registry
	$docker build -t gcr.io/weather-195622/weather-image:v1 .
# Upload image to GCIR
	$ gcloud docker -- push gcr.io/weather-195622/weather-image:v1
# If your upload fails, go enable Google Container Image Registry service on your account
	https://console.cloud.google.com/apis/api/containerregistry.googleapis.com/overview?project=weather-195622 
# Create deployment.yml - refer to it
# Run the deployment:
	$ kubectl create -f deployment.yml --save-config
# Check deployment status:
	$kubectl get deployments
# Check pods
	$kubectl get pods
# Check logs for the pods
	$ kubectl logs {pod-name}
# Create kubernetes service to expose the nodeJs service to internet
As the VM's are behind the internet, we need ELB to expose them
	$ kubectl expose deployment weather-deployment --type="LoadBalancer"
# Access kunerneted service: to get the external ip
	$kubectl get services
# Visit http://{EXTERNAL-IP}:{PORT}/{path} to access the service
	in my case: http://35.188.219.158:3000/weather/pastweek/42.3601,-71.0589













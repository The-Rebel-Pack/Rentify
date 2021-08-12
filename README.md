# Rentify

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
A platform where you can rent anything from your peers. Built as a full stack application.
	
## Technologies
Project is created with:
* Node.js
* Express.js
* ElephantSQL
* PostgreSQL
* React
* Firebase
	
## Setup
First, make sure that you have Docker installed.

Prepare the projects .env files:

Create .env in client folder
```
$ cd client/
$ touch .env
```
Add the following and insert your own values:
```
REACT_APP_FIREBASE_APIKEY=<firebase API key>
REACT_APP_FIREBASE_AUTHDOMAIN=<firebase auth domain>
REACT_APP_FIREBASE_DATABASEURL=<firebase database url>
REACT_APP_FIREBASE_PROJECTID=<firebase project id>
REACT_APP_FIREBASE_STORAGEBUCKET=<firebase storage bucket>
REACT_APP_FIREBASE_MESSAGINGSENDERID=<firebase messaging sender id>
REACT_APP_FIREBASE_APPID=<firebase app id>
```

Create .env in api folder
```
$ cd ../api/
$ touch .env
```
Add the following and insert your own values:
```
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=<firebase project id>
FIREBASE_PRIVATE_KEY_ID=<firebase private key id>
FIREBASE_PRIVATE_KEY=<firebase private key>
FIREBASE_CLIENT_EMAIL=<firebase client email>
FIREBASE_CLIENT_ID=<firebase client id>
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=<firebase client x509 cert URL>
DB_ELEPHANTSQL_URL=<elephant db connection string>
```

Run Docker on you computer.

To run this project, install it locally using npm:

In terminal
```
$ docker-compose up --build -d
```

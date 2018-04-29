# Node REST API

This is a simple REST API server implementation built on top `Node.js` and `Express.js` with `Mongoose.js` for `MongoDB` integration. Authentication is handled using `JWT` integration.

[![Build Status](https://travis-ci.org/Nipan83/node-api.svg?branch=master)](https://travis-ci.org/Nipan83/node-api)

## Get Started:

`git clone https://github.com/Nipan83/node-api.git`

`cd node-api`

## Running project

## Manual

You need to have Node.js and npm installed.

## Run server

```sh
	# Install all dependencies
	npm install

	# Start the server
	npm start

```

## Base URI for making requests

### Running locally

`http://localhost:3000/`

### Heroku 

`https://nipan-nodeapi.herokuapp.com/`

## RUN THE APIs

Check the APIs using [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop)

## Routes

### POST Sign up

`http://localhost:3000/user/signup` <br />

or <br />

`https://nipan-nodeapi.herokuapp.com/user/signup`

This route allows a user to register herself on the platform with basic information <br />

▪ `username`, `password`, `firstname`, `lastname`, `gender`, `mobile`,`email` <br />

All you need to do is pass the information in the request body in key-value pair 


### POST Login

`http://localhost:3000/user/login` <br />

or <br />

`https://nipan-nodeapi.herokuapp.com/user/login` <br />

This route allows a user to log in herself on the platform with basic information <br />

▪ `username` and `password` <br />

All you need to do is pass the information in the request body in key-value pair 

A `JWT TOKEN` will be returned which will be used for further using the API.

The token should be placed in header `key` as `x-access-token` and `value` will be the token.

### GET user

`http://localhost:3000/user/details` <br />
or <br />
`https://nipan-nodeapi.herokuapp.com/user/details`<br />

This route returns all the details of the user.

Token will also be needed here.

### POST Forgot Password

`http://localhost:3000/user/forgotPassword` <br />
or <br />
`https://nipan-nodeapi.herokuapp.com/user/forgotPassword` <br />

 This endpoint takes `email` as the input. 

On request, a 6-digit verification code email is sent.(Check Your Spam)

Use that code for verification and changing your password.




### POST verify Code

`http://localhost:3000/user/verifyCode`<br />
or <br />
`https://nipan-nodeapi.herokuapp.com/user/verifyCode`<br />

This route will return a JWT token if verification code is matched.<br />

▪ `email` and `code` <br />

All you need to do is pass the information in the request body in key-value pair


### POST change password

`http://localhost:3000/user/changePassword` <br />
or <br />
`https://nipan-nodeapi.herokuapp.com/user/changePassword` <br />

You can change password here with the information <br />
▪ `email` and `newPassword` <br />

All you need to do is pass the information in the request body in key-value pair 




## TESTING

```sh

	# TESTING of APIs
	npm test
	`note: more test cases to be added!`

```


## AUTHOR

Created and Maintained by [@Nipan83](https://github.com/Nipan83) - nipandas83@gmail.com


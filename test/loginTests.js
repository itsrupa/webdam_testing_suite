var should = require("should");
var request = require("request");
var expect = require("chai").expect;
var assert = require("chai").assert;
var util = require("util");
var config = require('../config');

describe("Successful Login", function(){
	var body;
	var res;
	var access_token;

	before(function(done) {
		request.post({ url: config["baseUrl"] + "/oauth/token", 
			form: {
				"grant_type": "client_credentials",
				"client_id": config["client_id"],
				"client_secret": config["client_secret"],
				"scope": "*"
			},
			json: true
		},
		function(error, r, b){
			access_token = b.access_token;
			request.get({ url: config["baseUrl"] + "/api/v1/login", 
				headers: {
					Authorization: access_token
				},
				json: true
			},
			function(error, r, b){
				res = r;
				body = b;
				done();
			});
		});
	});

	it("has valid response code in the response", function(done) {
		assert.exists(res.statusCode, "Did not find the Status Code in the response");
		assert(res.statusCode == 202, "Did not receive the 202 Accepted as the status code");
		done();

	});


	it("has expected key for login in the response", function(done) {
		assert.exists(body.logged_in, "Did not find the 'logged_in' in the response");
		assert.isTrue(body.logged_in, "'logged_in' is not set to true");
    done();

	});

});

describe("Login with POST instead GET", function(){
	var body;
	var res;
	var access_token;
	
	before(function(done) {
		request.post({ url: config["baseUrl"] + "/oauth/token", 
			form: {
				"grant_type": "client_credentials",
				"client_id": config["client_id"],
				"client_secret": config["client_secret"],
				"scope": "*"
			},
			json: true
		},
		function(error, r, b){
			access_token = b.access_token;
			request.post({ url: config["baseUrl"] + "/api/v1/login", 
				headers: {
					Authorization: access_token
				},
				json: true
			},
			function(error, r, b){
				res = r;
				body = b;
				done();
			});
		});
	});

	it("has valid response code in the response", function(done) {
		assert.exists(res.statusCode, "Did not find the Status Code in the response");
		assert(res.statusCode == 405, "Did not receive the 405 Method Not Allowed as the status code");
		done();

	});

});

describe("Login with bad access_token", function(){
	var body;
	var res;
	var access_token;
	
	before(function(done) {
		request.post({ url: config["baseUrl"] + "/oauth/token", 
			form: {
				"grant_type": "client_credentials",
				"client_id": config["client_id"],
				"client_secret": config["client_secret"],
				"scope": "*"
			},
			json: true
		},
		function(error, r, b){
			access_token = b.access_token;
			request.get({ url: config["baseUrl"] + "/api/v1/login", 
				headers: {
					"Authorization": "abc"
				},
				json: true
			},
			function(error, r, b){
				res = r;
				body = b;
				done();
			});
		});
	});

	it("has valid response code in the response", function(done) {
		assert.exists(res.statusCode, "Did not find the Status Code in the response");
		assert(res.statusCode == 401, "Did not receive the 400 Bad Request as the status code instead found ");
		done();

	});

	it("has error field in the response", function(done) {
		assert.exists(body.error, "Did not find the Status Code in the response");
		assert(body.error == "Unauthenticated.", "Did not receive the error field in the response");
		done();

	});


});
var should = require("should");
var request = require("request");
var expect = require("chai").expect;
var assert = require("chai").assert;
var util = require("util");
var config = require('../config');

describe("Successful Logout", function(){
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
				request.get({ url: config["baseUrl"] + "/api/v1/logout", 
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
	});

	it("has valid response code in the response", function(done) {
		assert.exists(res.statusCode, "Did not find the Status Code in the response");
		assert(res.statusCode == 200, "Did not receive the 200 OK as the status code");
		done();

	});


	it("has expected key for logout in the response", function(done) {
		assert.exists(body.logged_out, "Did not find the 'logged_out' in the response instead found '" + Object.keys(body)[0]);
		assert.isTrue(body.logged_out, "'logged_out' is not set to true");
		done();

	});

});

describe("Retrieve Assets after Logout", function(){
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
				request.get({ url: config["baseUrl"] + "/api/v1/logout", 
					headers: {
						Authorization: access_token
					},
					json: true
				},
				function(error, r, b){
					res = r;
					body = b;
					request.get({ url: config["baseUrl"] + "/api/v1/asset/12345", 
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
		});
	});

	it("has valid response code in the response", function(done) {
		assert.exists(res.statusCode, "Did not find the Status Code in the response");
		assert(res.statusCode == 200, "Did not receive the 200 OK as the status code");
		done();

	});


	it("has returned no results", function(done) {
		assert(body.length == 0, "Did not receive the expected number of Assets in the response");
		done();

	});

});
var should = require("should");
var request = require("request");
var expect = require("chai").expect;
var assert = require("chai").assert;
var util = require("util");
var config = require('../config');

describe("Successful Authentication", function(){
	var body;
	var res;
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
			res = r;
			body = b;
			done();
		});
	});

	it("has valid response code in the response", function(done) {
		assert.exists(res.statusCode, "Did not find the Status Code in the response");
		assert(res.statusCode == 200, "Did not receive the 200 OK as the status code");
		done();

	});


	it("has expected token type in the response", function(done) {
		assert.exists(body.token_type, "Did not find the Token Type in the response");
		assert(body.token_type == "Bearer", "Did not receive Bearer as the Token Type")
		done();

	});

	it("expires in an hour", function(done) {
		assert.exists(body.expires_in, "Did not find the Expires In in the response");
		assert(body.expires_in == 3600, "Did not receive the expected number in the expires field")
		done();

	});

	it("has access token in the response", function(done) {
		assert.exists(body.access_token, "Did not find the access token in the response")
		done();

	});

});

//-----------------------------------------------------------------------------------------------------------------------------
describe("Authentication with Invalid Grant Type '123'", function(){
	var body;
	var res;
	before(function(done) {
		request.post({ url: config["baseUrl"] + "/oauth/token",
			form: {
				"grant_type": 123,
				"client_id": config["client_id"],
				"client_secret": config["client_secret"],
				"scope": "*"
			},
			json: true
		},
		function(error, r, b){
			res = r;
			body = b;
			done();
		});
	});

	it("has valid response code in the response", function(done) {
		assert.exists(res.statusCode, "Did not find the Status Code in the response");
		assert(res.statusCode == 400, "Did not receive the 400 Bad Request as the status code");
		done();

	});

	it("has right error field in the response", function(done) {
		assert.exists(body.error, "Did not find the Error field in the response");
		assert(body.error == "unsupported_grant_type", "Did not receive the Grant Type as the error field in the response");
		done();

	});


	it("has expected error message in the response", function(done) {
		assert.exists(body.message, "Did not find the Message field in the response");
		assert(body.message == "The authorization grant type is not supported by the authorization server.", "Did not receive expected error message in the response")
		done();

	});

	it("has expected hint in the response", function(done) {
		assert.exists(body.hint, "Did not find the Hint field in the response");
		assert(body.hint == "Check the `grant_type` parameter", "Did not receive expected hint in the response")
		done();

	});

});

describe("Authentication with Empty Grant Type", function(){
	var body;
	var res;
	before(function(done) {
		request.post({ url: config["baseUrl"] + "/oauth/token",
			form: {
				"grant_type": "",
				"client_id": config["client_id"],
				"client_secret": config["client_secret"],
				"scope": "*"
			},
			json: true
		},
		function(error, r, b){
			res = r;
			body = b;
			done();
		});
	});

	it("has valid response code in the response", function(done) {
		assert.exists(res.statusCode, "Did not find the Status Code in the response");
		assert(res.statusCode == 400, "Did not receive the 400 Bad Request as the status code");
		done();

	});

	it("has right error field in the response", function(done) {
		assert.exists(body.error, "Did not find the Error field in the response");
		assert(body.error == "unsupported_grant_type", "Did not receive the Grant Type as the error field in the response")
		done();

	});


	it("has expected error message in the response", function(done) {
		assert.exists(body.message, "Did not find the Message field in the response");
		assert(body.message == "The authorization grant type is not supported by the authorization server.", "Did not receive expected error message in the response")
		done();

	});

	it("has expected hint in the response", function(done) {
		assert.exists(body.hint, "Did not find the Hint field in the response");
		assert(body.hint == "Check the `grant_type` parameter", "Did not receive expected hint in the response")
		done();

	});

});

describe("Authentication with Missing Grant Type", function(){
	var body;
	var res;
	before(function(done) {
		request.post({ url: config["baseUrl"] + "/oauth/token",
			form: {
				"client_id": config["client_id"],
				"client_secret": config["client_secret"],
				"scope": "*"
			},
			json: true
		},
		function(error, r, b){
			res = r;
			body = b;
			done();
		});
	});


	it("has valid response code in the response", function(done) {
		assert.exists(res.statusCode, "Did not find the Status Code in the response");
		assert(res.statusCode == 400, "Did not receive the 400 Bad Request as the status code");
		done();

	});

	it("has right error field in the response", function(done) {
		assert.exists(body.error, "Did not find the Error field in the response");
		assert(body.error == "unsupported_grant_type", "Did not receive the Grant Type as the error field in the response")
		done();

	});


	it("has expected error message in the response", function(done) {
		assert.exists(body.message, "Did not find the Message field in the response");
		assert(body.message == "The authorization grant type is not supported by the authorization server.", "Did not receive expected error message in the response")
		done();

	});

	it("has expected hint in the response", function(done) {
		assert.exists(body.hint, "Did not find the Hint field in the response");
		assert(body.hint == "Check the `grant_type` parameter", "Did not receive expected hint in the response")
		done();

	});

});

//-----------------------------------------------------------------------------------------------------------------------------
describe("Authentication with Invalid Client ID 'a'", function(){
	var body;
	var res;
	before(function(done) {
		request.post({ url: config["baseUrl"] + "/oauth/token",
			form: {
				"grant_type": "client_credentials",
				"client_id": "a",
				"client_secret": config["client_secret"],
				"scope": "*"
			},
			json: true
		},
		function(error, r, b){
			res = r;
			body = b;
			done();
		});
	});

	it("has valid response code in the response", function(done) {
		assert.exists(res.statusCode, "Did not find the Status Code in the response");
		assert(res.statusCode == 401, "Did not receive the 400 Bad Request as the status code");
		done();

	});

	it("has right error field in the response", function(done) {
		assert.exists(body.error, "Did not find the Error field in the response");
		assert(body.error == "invalid_client", "Did not receive the Client as the error field")
		done();

	});


	it("has expected error message in the response", function(done) {
		assert.exists(body.message, "Did not find the Message field in the response");
		assert(body.message == "Client authentication failed", "Did not receive expected error message in the response")
		done();

	});

});

describe("Authentication with Null Client ID", function(){
	var body;
	var res;
	before(function(done) {
		request.post({ url: config["baseUrl"] + "/oauth/token",
			form: {
				"grant_type": "client_credentials",
				"client_id": null,
				"client_secret": config["client_secret"],
				"scope": "*"
			},
			json: true
		},
		function(error, r, b){
			res = r;
			body = b;
			done();
		});
	});

	it("has valid response code in the response", function(done) {
		assert.exists(res.statusCode, "Did not find the Status Code in the response");
		assert(res.statusCode == 400, "Did not receive the 400 Bad Request as the status code");
		done();

	});

	it("has right error field in the response", function(done) {
		assert.exists(body.error, "Did not find the Error field in the response");
		assert(body.error == "invalid_request", "Did not receive the Grant Type as the error field")
		done();

	});


	it("has expected error message in the response", function(done) {
		assert.exists(body.message, "Did not find the Message field in the response");
		assert(body.message == "The request is missing a required parameter, includes an invalid parameter value, includes a parameter more than once, or is otherwise malformed.", "Did not receive expected error message in the response")
		done();

	});

	it("has expected hint in the response", function(done) {
		assert.exists(body.hint, "Did not find the Hint field in the response");
		assert(body.hint == "Check the `client_id` parameter", "Did not receive expected hint in the response")
		done();

	});

});

describe("Authentication with Missing Client ID", function(){
	var body;
	var res;
	before(function(done) {
		request.post({ url: config["baseUrl"] + "/oauth/token",
			form: {
				"grant_type": "client_credentials",
				"client_secret": config["client_secret"],
				"scope": "*"
			},
			json: true
		},
		function(error, r, b){
			res = r;
			body = b;
			done();
		});
	});

	it("has valid response code in the response", function(done) {
		assert.exists(res.statusCode, "Did not find the Status Code in the response");
		assert(res.statusCode == 400, "Did not receive the 400 Bad Request as the status code");
		done();

	});

	it("has right error field in the response", function(done) {
		assert.exists(body.error, "Did not find the Error field in the response");
		assert(body.error == "invalid_request", "Did not receive the Grant Type as the error field")
		done();

	});


	it("has expected error message in the response", function(done) {
		assert.exists(body.message, "Did not find the Message field in the response");
		assert(body.message == "The request is missing a required parameter, includes an invalid parameter value, includes a parameter more than once, or is otherwise malformed.", "Did not receive expected error message in the response")
		done();

	});

	it("has expected hint in the response", function(done) {
		assert.exists(body.hint, "Did not find the Hint field in the response");
		assert(body.hint == "Check the `client_id` parameter", "Did not receive expected hint in the response")
		done();

	});

});

//-----------------------------------------------------------------------------------------------------------------------------
describe("Authentication with Invalid Client Secret 'Junk'", function(){
	var body;
	var res;
	before(function(done) {
		request.post({ url: config["baseUrl"] + "/oauth/token",
			form: {
				"grant_type": "client_credentials",
				"client_id": config["client_id"],
				"client_secret": "Junk",
				"scope": "*"
			},
			json: true
		},
		function(error, r, b){
			res = r;
			body = b;
			done();
		});
	});

	it("has valid response code in the response", function(done) {
		assert.exists(res.statusCode, "Did not find the Status Code in the response");
		assert(res.statusCode == 401, "Did not receive the 400 Bad Request as the status code");
		done();

	});

	it("has right error field in the response", function(done) {
		assert.exists(body.error, "Did not find the Error field in the response");
		assert(body.error == "invalid_client", "Did not receive the Client as the error field")
		done();

	});


	it("has expected error message in the response", function(done) {
		assert.exists(body.message, "Did not find the Message field in the response");
		assert(body.message == "Client authentication failed", "Did not receive expected error message in the response")
		done();

	});

});

describe("Authentication with Empty Client Secret", function(){
	var body;
	var res;
	before(function(done) {
		request.post({ url: config["baseUrl"] + "/oauth/token",
			form: {
				"grant_type": "client_credentials",
				"client_id": config["client_id"],
				"client_secret": "",
				"scope": "*"
			},
			json: true
		},
		function(error, r, b){
			res = r;
			body = b;
			done();
		});
	});

	it("has valid response code in the response", function(done) {
		assert.exists(res.statusCode, "Did not find the Status Code in the response");
		assert(res.statusCode == 401, "Did not receive the 400 Bad Request as the status code");
		done();

	});

	it("has right error field in the response", function(done) {
		assert.exists(body.error, "Did not find the Error field in the response");
		assert(body.error == "invalid_client", "Did not receive the Client as the error field")
		done();

	});

	it("has expected error message in the response", function(done) {
		assert.exists(body.message, "Did not find the Message field in the response");
		assert(body.message == "Client authentication failed", "Did not receive expected error message in the response")
		done();

	});

});

describe("Authentication with Missing Client Secret", function(){
	var body;
	var res;
	before(function(done) {
		request.post({ url: config["baseUrl"] + "/oauth/token",
			form: {
				"grant_type": "client_credentials",
				"client_id": config["client_id"],
				"scope": "*"
			},
			json: true
		},
		function(error, r, b){
			res = r;
			body = b;
			done();
		});
	});

	it("has valid response code in the response", function(done) {
		assert.exists(res.statusCode, "Did not find the Status Code in the response");
		assert(res.statusCode == 401, "Did not receive the 400 Bad Request as the status code");
		done();

	});

	it("has right error field in the response", function(done) {
		assert.exists(body.error, "Did not find the Error field in the response");
		assert(body.error == "invalid_client", "Did not receive the Client as the error field")
		done();

	});


	it("has expected error message in the response", function(done) {
		assert.exists(body.message, "Did not find the Message field in the response");
		assert(body.message == "Client authentication failed", "Did not receive expected error message in the response")
		done();

	});

});

//-----------------------------------------------------------------------------------------------------------------------------
describe("Authentication with Invalid Scope '123'", function(){
	var body;
	var res;
	before(function(done) {
		request.post({ url: config["baseUrl"] + "/oauth/token",
			form: {
				"grant_type": "client_credentials",
				"client_id": config["client_id"],
				"client_secret": config["client_secret"],
				"scope": 123
			},
			json: true
		},
		function(error, r, b){
			res = r;
			body = b;
			done();
		});
	});

	it("has valid response code in the response", function(done) {
		assert.exists(res.statusCode, "Did not find the Status Code in the response");
		assert(res.statusCode == 400, "Did not receive the 400 Bad Request as the status code");
		done();

	});

	it("has right error field in the response", function(done) {
		assert.exists(body.error, "Did not find the Error field in the response");
		assert(body.error == "invalid_scope", "Did not receive the Scope as the error field")
		done();

	});


	it("has expected error message in the response", function(done) {
		assert.exists(body.message, "Did not find the Message field in the response");
		assert(body.message == "The requested scope is invalid, unknown, or malformed", "Did not receive expected error message in the response")
		done();

	});

	it("has expected hint in the response", function(done) {
		assert.exists(body.hint, "Did not find the Hint field in the response");
		assert(body.hint == "Check the `scope` parameter", "Did not receive expected hint in the response instead found '" + body.hint + "'")
		done();

	});

});

describe("Authentication with Empty Scope", function(){
	var body;
	var res;
	before(function(done) {
		request.post({ url: config["baseUrl"] + "/oauth/token",
			form: {
				"grant_type": "client_credentials",
				"client_id": config["client_id"],
				"client_secret": config["client_secret"],
				"scope": ""
			},
			json: true
		},
		function(error, r, b){
			res = r;
			body = b;
			done();
		});
	});

	it("has valid response code in the response", function(done) {
		assert.exists(res.statusCode, "Did not find the Status Code in the response");
		assert(res.statusCode == 400, "Did not receive the 400 Bad Request as the status code");
		done();

	});

	it("has right error field in the response", function(done) {
		assert.exists(body.error, "Did not find the Error field in the response");
		done();

	});


	it("has expected error message in the response", function(done) {
		assert.exists(body.message, "Did not find the Message field in the response");
		done();

	});

	it("has expected hint in the response", function(done) {
		assert.exists(body.hint, "Did not find the Hint field in the response");
		done();

	});

});

describe("Authentication with Missing Scope", function(){
	var body;
	var res;
	before(function(done) {
		request.post({ url: config["baseUrl"] + "/oauth/token",
			form: {
				"grant_type": "client_credentials",
				"client_id": config["client_id"],
				"client_secret": config["client_secret"]
			},
			json: true
		},
		function(error, r, b){
			res = r;
			body = b;
			done();
		});
	});


	it("has valid response code in the response", function(done) {
		assert.exists(res.statusCode, "Did not find the Status Code in the response");
		assert(res.statusCode == 400, "Did not receive the 400 Bad Request as the status code");
		done();

	});

	it("has right error field in the response", function(done) {
		assert.exists(body.error, "Did not find the Error field in the response");
		done();

	});


	it("has expected error message in the response", function(done) {
		assert.exists(body.message, "Did not find the Message field in the response");
		done();

	});

	it("has expected hint in the response", function(done) {
		assert.exists(body.hint, "Did not find the Hint field in the response");
		done();

	});

});

//-----------------------------------------------------------------------------------------------------------------------------
describe("Authentication that is not form encoded", function(){
	var body;
	var res;
	before(function(done) {
		request.post({ url: config["baseUrl"] + "/oauth/token",
			headers: {
				"Content-Type": "application/json"
			},
			params: {
				"grant_type": "client_credentials",
				"client_id": config["client_id"],
				"client_secret": config["client_secret"],
				"scope": "*"
			},
			json: true
		},
		function(error, r, b){
			res = r;
			body = b;
			done();
		});
	});


	it("has valid response code in the response", function(done) {
		assert.exists(res.statusCode, "Did not find the Status Code in the response");
		assert(res.statusCode == 400, "Did not receive the 400 Bad Request as the status code");
		done();

	});

});

//-----------------------------------------------------------------------------------------------------------------------------
//Should I try GET instead of post

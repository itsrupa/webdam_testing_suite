var should = require("should");
var request = require("request");
var expect = require("chai").expect;
var assert = require("chai").assert;
var util = require("util");
var config = require('../config');

describe("Search with invalid Limit Input", function(){
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
				request.get({ url: config["baseUrl"] + "/api/v1/search?query=aut&sort=aut&limit=a", 
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
		assert(res.statusCode == 422, "Did not receive the 422 Unprocessable Entity as the status code");
		done();

	});


	it("has expected key for error in limit", function(done) {
		assert.exists(body.limit, "Did not find the 'logged_out' in the response");
		assert(body.limit == "The limit must be an integer.", "Expected Error message for limit was not received");
		done();

	});

});

describe("Search with Invalid Limit Input", function(){
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
				request.get({ url: config["baseUrl"] + "/api/v1/search?query=a&sort=desc&limit=12", 
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
		assert(res.statusCode == 422, "Did not receive the 422 Unprocessable Entity as the status code");
		done();

	});


	it("has expected key for error in limit", function(done) {
		assert.exists(body.limit, "Did not find the 'logged_out' in the response");
		assert(body.limit == "The limit may not be greater than 10.", "Expected Error message for limit was not received");
		done();

	});

});

describe("Search with invalid Sort Input", function(){
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
				request.get({ url: config["baseUrl"] + "/api/v1/search?query=a&sort=abc&limit=2", 
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
		assert(res.statusCode == 400, "Did not receive the 400 Bad Request as the status code");
		done();

	});

});

describe("Search and Sort Results in Ascending Order", function(){
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
				request.get({ url: config["baseUrl"] + "/api/v1/search?query=a&sort=asc&limit=2", 
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

	it("has returned 2 results", function(done) {
		assert(body.length == 2, "Did not receive the expected number of Assets in the response");
		done();

	});

	it("has returned results in ascending order", function(done) {
		assert.exists(body[0].asset_id, "Did not find the Key AssetID in the response");
		assert(body[0].asset_id == 12341, "Did not receive the expected Asset as the first element of the response");
		assert.exists(body[1].asset_id, "Did not find the Key AssetID in the response");
		assert(body[1].asset_id == 12342, "Did not receive the expected Asset as the first element of the response");
		done();

	});

});

describe("Search and Sort Results in Descending Order", function(){
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
				request.get({ url: config["baseUrl"] + "/api/v1/search?query=a&sort=desc&limit=2", 
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

	it("has returned 2 results", function(done) {
		assert(body.length == 2, "Did not receive the expected number of Assets in the response");
		done();

	});

	it("has returned results in descending order", function(done) {
		assert.exists(body[0].asset_id, "Did not find the Key AssetID in the response");
		assert(body[0].asset_id == 12345, "Did not receive the expected Asset as the first element of the response");
		assert.exists(body[1].asset_id, "Did not find the Key AssetID in the response");
		assert(body[1].asset_id == 12344, "Did not receive the expected Asset as the first element of the response");
		done();

	});

});

describe("Search and Results for Missing Search Params", function(){
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
				request.get({ url: config["baseUrl"] + "/api/v1/search", 
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

	it("has returned results in descending order", function(done) {
		assert(body.length == 5, "Did not receive the expected number of Assets in the response");
		done();

	});

});
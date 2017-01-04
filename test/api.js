const config = require('../app/config');
const crypto = require('../app/crypto');

//include the testing dev dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

//API links and variables
const eventUrl = '/api/v1/event';
const dummyId = '307e6d30-c556-11e6-9cb8-bb15b01c6e55';
const showUrl = '/api/v1/showcase';
const projectId = '1653fac0-c712-11e6-b0e4-fd8b404bc168';
const mailingUrl = '/api/v1/mailinglist';
const dummyEmail = 'myEmail@ucla.edu';


describe("API.v1", () => {
	//we first test the Events API, specifically POST and GET
	describe("Events", () => {
		describe("POST " + eventUrl, () => {
			it("It should create a new event", (done) => {
				//send a request with valid input parameters
				chai.request(server).post(eventUrl)
					.send({
						"token": crypto.getToken(),
						"event": {
							"date": {
								"start": "2016-12-18T19:10:33.251Z",
								"end": "2016-12-18T19:12:07.770Z"
							},
							"desc": "Test Desc",
							"link": "Test Link",
							"title": "Test Title",
							"tagline": "Test Tagline",
							"location": "Test Location",
							"category": "Test Category"
						}
					//the response should be valid
					}).end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('success');
						res.body.should.have.property('event');
						res.body.success.should.be.eql(true);
						res.body.event.should.be.a('object');
						res.body.event.should.have.property('id');
						res.body.event.id.length.should.be.above(0);
						done();
				});
			});

			it("It should not create a new event, due to missing date", (done) => {
				//create a POST request with invalid data (specifically, no date)
				chai.request(server).post(eventUrl)
					.send({
						"token": crypto.getToken(),
						"event": {
							"desc": "Test Desc",
							"link": "Test Link",
							"title": "Test Title",
							"tagline": "Test Tagline",
							"location": "Test Location",
							"category": "Test Category"
						}
						//the response should not indicate success.
					}).end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('success');
						res.body.success.should.be.eql(false);
						done();
				});
			});


		});
		//testing the GET portion of our API for events
		describe("GET " + eventUrl, () => {
			it("It should get all events", (done) => {
				//without an event ID, the response should return all events.
				chai.request(server)
				.get(eventUrl)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('success');
					res.body.success.should.be.eql(true);
					res.body.should.have.property('events');
					res.body.should.have.property('numResults');
					done();
				});
			});
			//testing with a specific event ID
			it("It should return a specific event given an event ID", (done) =>{
				chai.request(server)
				.get(eventUrl + '/' + dummyId)
				.end((err, res) =>{
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('events');
					done();
				});
			});
			it("Should fail with an invalid event ID", (done) => {
				chai.request(server)
				.get(eventUrl + '/' + "oidwio")
				.end((err, res) => {
					res.should.have.status(200);
					//console.log(res.events);
					done();
					//console.log(res);
				})
			})
		});
	});
	describe("Mailing list", () =>{
		describe("POST" + mailingUrl, () =>{
			it("Should POST an email correctly, given a email and name", (done) => {
				chai.request(server)
				.post(mailingUrl)
				.send({
					//token: crypto.getToken(),
					email: {
						"email": "rvarm1@ucla.edu",
						"name": "rohan"
					}
				})
				.end((err, res) =>{
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('success');
					res.body.success.should.be.eql(true);
					res.body.should.have.property('email');
					res.body.email.email.should.be.eql('rvarm1@ucla.edu');
					done();
				})
			});
			it("Should POST correctly even with no name field", (done) =>{
				chai.request(server)
				.post(mailingUrl)
				.send({
				//	token: crypto.getToken(),
					email: {
						"email": "rohan@ucla.edu",
					}
				})
				.end((err, res) =>{
					res.should.have.status(200);
					res.body.email.email.should.be.eql("rohan@ucla.edu");
					done();
				})
			});
		});
		describe("GET" + mailingUrl, () => {
			it("Should GET all emails correctly", (done) =>{
				chai.request(server)
				.get(mailingUrl)
				.send({
					"token": crypto.getToken()
				})
				.end((err, res) => {
					console.log(res.body);
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('success');
					res.body.success.should.be.eql(true);
					res.body.should.have.property('mailingList');
					done();
				})
			});
			it("Should not succeed without all valid tokens", (done) => {
				chai.request(server)
				.get(mailingUrl)
				.end((err, res) => {
					res.body.should.be.a('object');
					res.body.should.have.property('success');
					res.body.success.should.be.eql(false);
					done();
				})
			})
		});
	});
	//testing showcase API
	describe("Showcase", () => {
		describe("POST" + showUrl, () => {
			//POST request to create a new showcase project with valid data
			it("should create a new project if valid data is passed in", (done) => {
				chai.request(server)
				.post(showUrl)
				.send({
					"token": crypto.getToken(),
					"project": {
						"desc": "Test Desc",
						"image": "Test Link",
						"link": "Test Title",
						"title": "Test Tagline",
						"contributors": [
							"person1",
							"person2"
						]
					}
				})
				//the response should be valid.
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('success');
					res.body.success.should.be.eql(true);
					res.body.should.have.property('project');
					done();
				})
			});
			//POST request with invalid data (no contributors)
			it("should not create a new project if the contributors field is missing", (done) => {
				chai.request(server)
				.post(showUrl)
				.send({
					"token": crypto.getToken(),
					"project": {
						"desc": "Test Desc",
						"image": "Test Link",
						"link": "Test Title",
						"title": "Test Tagline"
					}
				})
				//the response should be invalid.
				.end((err,res)=>{
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('success');
					res.body.success.should.be.eql(false);
					done();
				});
			});
		});
		//testing GET request for the showcase API.
		describe("GET " + showUrl, () => {
			//without a project ID, all projects should be returned.
			it("It should get all showcase projects", (done) => {
				chai.request(server)
				.get(showUrl)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('success');
					res.body.success.should.be.eql(true);
					res.body.should.have.property('projects');
					res.body.should.have.property('numResults');
					done();
				});
			});
			//with a project ID, the appropriate project should be returned.
			it("It should return a specific project given a project ID", (done) => {
				chai.request(server)
				.get(showUrl + '/' + projectId)
				.end((err, res) =>{
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('projects');
					done();
				});
			});
		});
		});
	});

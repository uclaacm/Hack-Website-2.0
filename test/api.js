const config = require('../app/config');
const crypto = require('../app/crypto');

const chai = require('chai');
const chaiHttp = require('chai-http');

let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);
const eventUrl = '/api/v1/event';
const dummyId = '307e6d30-c556-11e6-9cb8-bb15b01c6e55';
const showUrl = '/api/v1/showcase';
const projectId = '1653fac0-c712-11e6-b0e4-fd8b404bc168';

describe("API.v1", () => {
	describe("Events", () => {
		describe("POST " + eventUrl, () => {
			it("It should create a new event", (done) => {
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
					}).end((err, res) => {
						res.should.have.status(500);
						res.body.should.be.a('object');
						res.body.should.have.property('success');
						res.body.success.should.be.eql(false);
						done();
				});
			});


		});

		describe("GET " + eventUrl, () => {
			it("It should get all events", (done) => {
				chai.request(server)
				.get(eventUrl)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('success');
					res.body.success.should.be.eql(true);
					res.body.should.have.property('events');
					done();
				});
			});

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
		});

		describe("GET " + showUrl, () => {
			it("It should get all events", (done) => {
				chai.request(server)
				.get(showUrl)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('success');
					res.body.success.should.be.eql(true);
					res.body.should.have.property('projects');
					done();
				});
			});

			it("It should return a specific project given a project ID", (done) =>{
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

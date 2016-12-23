const config = require('../app/config');
const crypto = require('../app/crypto');

const chai = require('chai');
const chaiHttp = require('chai-http');

let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe("API.v1", () => {
	describe("Events", () => {
		describe("POST /api/v1/event", () => {
			it("It should create a new event", (done) => {
				chai.request(server).post('/api/v1/event')
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
				chai.request(server).post('/api/v1/event')
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
	});
});

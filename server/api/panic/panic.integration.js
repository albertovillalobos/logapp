'use strict';

var app = require('../..');
import request from 'supertest';

var newPanic;

describe('Panic API:', function() {

  describe('GET /api/panics', function() {
    var panics;

    beforeEach(function(done) {
      request(app)
        .get('/api/panics')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          panics = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      panics.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/panics', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/panics')
        .send({
          name: 'New Panic',
          info: 'This is the brand new panic!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPanic = res.body;
          done();
        });
    });

    it('should respond with the newly created panic', function() {
      newPanic.name.should.equal('New Panic');
      newPanic.info.should.equal('This is the brand new panic!!!');
    });

  });

  describe('GET /api/panics/:id', function() {
    var panic;

    beforeEach(function(done) {
      request(app)
        .get('/api/panics/' + newPanic._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          panic = res.body;
          done();
        });
    });

    afterEach(function() {
      panic = {};
    });

    it('should respond with the requested panic', function() {
      panic.name.should.equal('New Panic');
      panic.info.should.equal('This is the brand new panic!!!');
    });

  });

  describe('PUT /api/panics/:id', function() {
    var updatedPanic;

    beforeEach(function(done) {
      request(app)
        .put('/api/panics/' + newPanic._id)
        .send({
          name: 'Updated Panic',
          info: 'This is the updated panic!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPanic = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPanic = {};
    });

    it('should respond with the updated panic', function() {
      updatedPanic.name.should.equal('Updated Panic');
      updatedPanic.info.should.equal('This is the updated panic!!!');
    });

  });

  describe('DELETE /api/panics/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/panics/' + newPanic._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when panic does not exist', function(done) {
      request(app)
        .delete('/api/panics/' + newPanic._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});

'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var panicCtrlStub = {
  index: 'panicCtrl.index',
  show: 'panicCtrl.show',
  create: 'panicCtrl.create',
  update: 'panicCtrl.update',
  destroy: 'panicCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var panicIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './panic.controller': panicCtrlStub
});

describe('Panic API Router:', function() {

  it('should return an express router instance', function() {
    panicIndex.should.equal(routerStub);
  });

  describe('GET /api/panics', function() {

    it('should route to panic.controller.index', function() {
      routerStub.get
        .withArgs('/', 'panicCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/panics/:id', function() {

    it('should route to panic.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'panicCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/panics', function() {

    it('should route to panic.controller.create', function() {
      routerStub.post
        .withArgs('/', 'panicCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/panics/:id', function() {

    it('should route to panic.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'panicCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/panics/:id', function() {

    it('should route to panic.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'panicCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/panics/:id', function() {

    it('should route to panic.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'panicCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});

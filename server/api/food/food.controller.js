/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/foods              ->  index
 * POST    /api/foods              ->  create
 * GET     /api/foods/:id          ->  show
 * PUT     /api/foods/:id          ->  update
 * DELETE  /api/foods/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Food from './food.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Foods
export function index(req, res) {
  return Food.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Food from the DB
export function show(req, res) {
  return Food.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Food in the DB
export function create(req, res) {
  return Food.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Food in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Food.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Food from the DB
export function destroy(req, res) {
  return Food.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

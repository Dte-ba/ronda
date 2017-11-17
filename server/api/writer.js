'use strict';

var _ = require('lodash');
var compose = require('compose-middleware').compose;

function isPromise(obj){
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

var waitPromise = function(req, res, next){
  if (!req.result){
    return next();
  }

  if (isPromise(req.result)){
    req
      .result
      .then(function(res){
        req.result = res;
        next();
      })
      .catch(function(err){
        next(err);
      });

  } else {
    next();
  }
};

var write = function(req, res, next){
  if (!req.result){
    return next();
  }

  if (req.squery){
    var items = _.take(_.drop(req.result, (req.squery.page-1)*req.squery.limit), req.squery.limit);
    return res.json({
      count: items.length,
      data: items,
      page: req.squery.page,
      limit: req.squery.limit
    });
  }
  res.json(req.result);
};

module.exports = function() {
  return compose([
    waitPromise,
    write
  ]);
};
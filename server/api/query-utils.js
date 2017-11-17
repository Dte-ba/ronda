'use strict';

var _ = require('lodash');

module.exports = function(fields){
  return function(req, res, next){
    var squery = {};

    if (req.query.filter && req.query.filter !== ''){
      squery.where = {};
      var or = squery.where['$or'] = [];

      var sf = req.query.filter;

      _.each(fields, function(field){
        var obj = {};
        obj[field] = new RegExp(sf, 'ig');
        or.push(obj)
      });
    }

    if (req.query.limit !== undefined){
      squery.limit = parseInt(req.query.limit);
    }

    if (req.query.page !== undefined){
      squery.page = parseInt(req.query.page);
    }

    if (req.query.page !== undefined && squery.limit !== undefined){
      var l = squery.limit;
      squery.offset = (req.query.page-1)*l;
    }

    if (req.query.order &&  req.query.order !== ''){
      var o = req.query.order;
      var desc = o.indexOf('-') === 0;
      let order = o.replace('-', '');
      squery.order = {};
      squery.order[order] = 1; 
      if (desc){
        squery.order[order] = -1;
      }
    }

    req.squery = squery;

    next();
  }
};
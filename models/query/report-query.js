// Subclass of Query. Represents a query of the report collection.

var Report = require('../report');
var Query = require('../query');
var util = require('util');
var _ = require('underscore');

var ReportQuery = function(options) {
  options = options || {};
  this.keywords = options.keywords;
  this.status = options.status;
  this.after = options.after;
  this.before = options.before;
  this.sourceId = options.sourceId;
  this.sourceType = options.sourceType;
  this.incidentId = options.incidentId;
  this.author = options.author;
  this.event = 'reports';
};

_.extend(ReportQuery, Query);
util.inherits(ReportQuery, Query);

ReportQuery.prototype.run = function(callback) {
  Report.queryReports(this, function(err, results) {
    callback(err, results);
  });
};

// Normalize query for comparison
ReportQuery.prototype.normalize = function() {
  return _.pick(this, ['keywords', 'status', 'after', 'before', 'sourceId', 'sourceType', 'incidentId', 'author']);
};

module.exports = ReportQuery;

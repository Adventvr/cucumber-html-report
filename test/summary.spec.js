var report = require('../cucumber_report.json');
var Summary = require('../lib/summary');
var expect = require('chai').expect;

describe('Summary module', function() {

  var sum;

  beforeEach(function() {
    sum = Summary.calculateSummary(report);
  });

  it('should return total number of features', function() {
    expect(sum.totalFeatures).to.equal(3);
  });

  it('should return number of passed scenarios', function() {
    expect(sum.scenariosPassed).to.equal(6);
  });

  it('should return number of failed scenarios', function() {
    expect(sum.scenariosFailed).to.equal(0);
  });

  it('should return status of the report', function() {
    expect(sum.status).to.equal('OK');
  });
});
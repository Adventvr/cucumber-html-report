'use strict'

const Report = require('./report')
const expect = require('chai').expect
const path = require('path')

describe('Report', () => {
  describe('Validate options', () => {
    let options
    beforeEach(() => {
      options = {
        source: path.join(__dirname, '..', 'testdata', 'cucumber_report.json'),
        dest: './reports',
        name: 'index.html',
        title: 'Cucumber Report',
        component: 'My Component',
        logo: './logos/cucumber-logo.svg',
        screenshots: './screenshots'
      }
    })

    it('should validate valid input', () => {
      return Report.validate(options).then(opts => {
        expect(opts).to.equal(options)
      })
    })

    it('should validate valid source', () => {
      options.source = undefined
      return Report.validate(options).catch(error => {
        expect(error).to.equal('Input file undefined does not exist! Aborting')
      })
    })

    it('should validate valid name', () => {
      options.name = undefined
      return Report.validate(options).catch(error => {
        expect(error).to.equal('Template name undefined does not valid! Aborting')
      })
    })

    it('should validate valid template file', () => {
      options.template = undefined
      return Report.validate(options).catch(error => {
        expect(error).to.equal('Template file undefined does not exist! Aborting')
      })
    })

    it('should set default dest if not specified', () => {
      delete options.dest
      return Report.validate(options).then(opts => {
        expect(opts.dest).to.equal('./reports')
      })
    })

    it('should set default logo if not specified', () => {
      delete options.logo
      return Report.validate(options).then(opts => {
        expect(opts.logo).to.equal(path.join(__dirname, '..', 'logos', 'cucumber-logo.svg'))
      })
    })
  })

  describe('Parse Cucumber json file with passing features', () => {
    let options
    beforeEach(() => {
      options = {
        source: path.join(__dirname, '..', 'testdata', 'feature_passing.json'),
        dest: './reports',
        name: 'index.html',
        title: 'Cucumber Report',
        component: 'My Component',
        logo: './logos/cucumber-logo.svg',
        screenshots: './screenshots'
      }
    })

    it('should contain the title and component', () => {
      return Report.createReport(options).then(report => {
        expect(report.title).to.equal('Cucumber Report')
        expect(report.component).to.equal('My Component')
      })
    })

    it('should contain the summary', () => {
      return Report.createReport(options).then(report => {
        const sum = report.summary
        expect(sum.totalFeatures).to.equal(1)
        expect(sum.featuresPassed).to.equal(1)
        expect(sum.featuresFailed).to.equal(0)
        expect(sum.totalScenarios).to.equal(2)
        expect(sum.scenariosPassed).to.equal(2)
        expect(sum.scenariosFailed).to.equal(0)
        expect(sum.status).to.equal('passed')
      })
    })

    it('should contain the features', () => {
      return Report.createReport(options).then(report => {
        expect(report.features.length).to.equal(1)
      })
    })
  })

  describe('Parse Cucumber json file with failures', () => {
    let options
    beforeEach(() => {
      options = {
        source: path.join(__dirname, '..', 'testdata', 'feature_failing.json'),
        dest: './reports',
        name: 'index.html',
        title: 'Cucumber Report',
        component: 'My Component',
        logo: './logos/cucumber-logo.svg',
        screenshots: './screenshots'
      }
    })

    it('should contain the summary', () => {
      return Report.createReport(options).then(report => {
        var summary = report.summary
        expect(summary.totalFeatures).to.equal(1)
        expect(summary.featuresPassed).to.equal(0)
        expect(summary.featuresFailed).to.equal(1)
        expect(summary.totalScenarios).to.equal(2)
        expect(summary.scenariosPassed).to.equal(1)
        expect(summary.scenariosFailed).to.equal(1)
        expect(summary.status).to.equal('failed')
      })
    })
  })

  describe('Parse Cucumber json file with skipped scenario', () => {
    let options
    beforeEach(() => {
      options = {
        source: path.join(__dirname, '..', 'testdata', 'feature_skipped.json'),
        dest: './reports',
        name: 'index.html',
        title: 'Cucumber Report',
        component: 'My Component',
        logo: './logos/cucumber-logo.svg',
        screenshots: './screenshots'
      }
    })

    it('should contain the summary', () => {
      return Report.createReport(options).then(report => {
        var summary = report.summary
        expect(summary.totalFeatures).to.equal(1)
        expect(summary.featuresPassed).to.equal(0)
        expect(summary.featuresFailed).to.equal(1)
        expect(summary.totalScenarios).to.equal(2)
        expect(summary.scenariosPassed).to.equal(0)
        expect(summary.scenariosFailed).to.equal(2)
        expect(summary.status).to.equal('failed')
      })
    })
  })
})

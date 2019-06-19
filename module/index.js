const fs = require('fs')
const path = require('path')
const modulePath = path.join(__dirname + '/lib')
const { createNewApp } = require('./scripts')
const createNewJavaScriptApp = async root => {
  createNewApp(`${modulePath}/javascript`, root)
}

const createNewTypeScriptApp = root => {
  createNewApp(`${modulePath}/typescript`, root)
}

module.exports = { createNewJavaScriptApp, createNewTypeScriptApp }

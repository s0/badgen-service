const assert = require('assert')
const tap = require('tap')
const request = require('supertest')
const micro = require('micro')
const badgen = require('../service.js')

// process.env.TARGET should be the service url
//   - "https://badgen-canary.now.sh"
//   - "http://localhost:3000"
const service = process.env.TARGET || micro(badgen)
const isSvg = str => str.trim().startsWith('<svg ')

const badgeTests = [
  '/badge/npm/v1.2.3',
  '/badge/npm/v1.2.3/blue',
  '/badge/npm/v1.2.3/FAD',
  '/badge/npm/v1.2.3/FAD?icon=travis',
  '/npm/v/express',
  '/npm/v/babel-core',
  '/npm/v/ava/next',
  '/npm/v/next/canary'
]

badgeTests.forEach(badgePath => {
  tap.test(badgePath, t => {
    return request(service)
      .get(badgePath)
      .expect(200)
      .expect('Content-Type', /svg\+xml/)
      .then(res => assert(isSvg(res.body.toString())))
  })
})

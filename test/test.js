'use strict'

var app = require('../app')
var request = require('supertest')
var superagent = require('superagent')
var agent = superagent.agent()
var mocha = require('mocha')
var jwt = require('jsonwebtoken')
var expect = require('chai').expect
var describe = mocha.describe
var it = mocha.it


describe('login', function () {
  it('Generates token for user for any email and password', function (done) {
    request(app)
            .post('/user/login')
            .send({ username: 'nipandas83', password: 'abcde' })
            .expect(200, done)
            
  })
})


describe('signup', function () {
  it('user registration', function (done) {
    request(app)
            .post('/user/signup')
            .send({ email: 'nipandas@gmail.com', password: 'abcde', username: 'nipan', gender:'Male', firstname:'nipan', lastname:'das', mobile:7896369004 })
            .expect(200, done)
            
  })
})


describe('home', function () {
  it('Should show the home page', function (done) {
            request(app)
      .get('/')
      .expect(200, done)
  })
})

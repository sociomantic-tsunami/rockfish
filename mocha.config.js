/* eslint-disable */
global.chai = require('chai');
global.expect = global.chai.expect;


global.sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const { JSDOM } = require('jsdom');
const chai = require('chai');
const dirtyChai = require('dirty-chai');

chai.use(dirtyChai);

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.HTMLElement = window.HTMLElement;

copyProps(window, global);

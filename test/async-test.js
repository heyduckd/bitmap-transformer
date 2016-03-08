'use strict';

// Testing for properties of the headers.
var expect = require('chai').expect;
var fs = require('fs');
var readHeaders = require(__dirname + '/../lib/read-bitmap-imgs.js');
var bitmap = fs.readFileSync(__dirname + '/../img/non-palette-bitmap.bmp');

describe('Testing for the properties inside the headers', function(){
  it('should return the "string" value properties of the bitmap headers', function(){
    var bitmapData = readHeaders(bitmap);
    expect(bitmapData).to.have.property('headField');
    expect(bitmapData).to.have.property('size');
    expect(bitmapData).to.have.property('pixelArrayStartAddress');
    expect(bitmapData).to.have.property('imageSize');
    expect(bitmapData).to.have.property('colorsInPalette');
  });
});

// Testing readColors against a mock array. The values of r, g, b, and a should be equal to 1, 2, 3, and 4.
var colors = require(__dirname + '/../lib/read-color-data.js');

describe('Testing the readColors function', ()=>{
  it('should take an array of mock data and return the values of the r, g, b, and a values', ()=>{
    var mockArray = new Buffer ([1, 2, 3, 4]);
    var rgba = {
      r: 1,
      g: 2,
      b: 3,
      a: 4
    };
    expect(colors.readColors(0, mockArray)).to.eql(rgba);
  });
});

// Testing invertColors in the same way as above. Setting a mock value for the RGBA output values and testing against what we know they should equal.

describe('Testing the invertColors function', ()=>{
  it('should take an array of mock data and return the values of the r, g, b, and a values', ()=>{
    var colorValuesObj = {
      r: 0,
      b: 0,
      g: 0,
      a: 0
    };
    var expectedColorValuesObj = {
      r: 255,
      g: 255,
      b: 255,
      a: 255
    };
    expect(colors.invertColors(colorValuesObj)).to.eql(expectedColorValuesObj);
  });
});


// Testing greyColors
describe('Testing the greyColors function', ()=>{
  it('should take an array of mock data and return the values of the r, g, b, and a values', ()=>{
    var greyColorValuesObj = {
      r: 300,
      g: 300,
      b: 300,
      a: 300
    };
    var expectedGreyColorValuesObj = {
      r: 150,
      g: 150,
      b: 150,
      a: 150
    };
    expect(colors.greyColors(greyColorValuesObj)).to.eql(expectedGreyColorValuesObj);
  });
});


// Testing blueFilter
describe('Testing the blueFilter function', ()=>{
  it('should take an array of mock data and return the value of b', ()=>{
    var blueColorValuesObj = {
      r: 300,
      g: 300,
      b: 300,
      a: 300
    };
    var expectedBlueColorValuesObj = {
      r: 300,
      g: 300,
      b: 150,
      a: 300
    };
    expect(colors.blueFilter(blueColorValuesObj)).to.eql(expectedBlueColorValuesObj);
  });
});

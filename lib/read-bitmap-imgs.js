'use strict';

var os = require('os');
var leOrBe = os.endianness();
var bitmapData = {};


function readHeaders(bitmap){
  if (leOrBe === 'LE'){
    bitmapData.headField = bitmap.toString('ascii', 0, 2);
    bitmapData.size = bitmap.readUInt32LE(2);
    bitmapData.pixelArrayStartAddress = bitmap.readUInt32LE(10);
    bitmapData.imageSize = bitmap.readUInt32LE(34);
    bitmapData.colorsInPalette = bitmap.readUInt32LE(46);
    return bitmapData;
  } else if (leOrBe === 'BE'){
    bitmapData.headField = bitmap.toString('ascii', 0, 2);
    bitmapData.size = bitmap.readUInt32BE(2);
    bitmapData.pixelArrayStartAddress = bitmap.readUInt32BE(10);
    bitmapData.imageSize = bitmap.readUInt32BE(34);
    bitmapData.colorsInPalette = bitmap.readUInt32BE(46);
  }
}

module.exports = readHeaders;

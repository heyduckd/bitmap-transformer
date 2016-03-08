'use strict';

const fs = require('fs');
// const os = require('os');

// Requires read-bitmap-imgs.js and read-color.js
// Stores the functions as variables
var readHeaders = require('./lib/read-bitmap-imgs.js');
var colors = require('./lib/read-color-data.js');

var bitmap = fs.readFileSync(__dirname + '/img/' + process.argv[2]);
var bitmapData = readHeaders(bitmap);
// console.log(bitmapData);

// Assigns argv[3] a command phrase that can be used in terminal to run corresponding transform function.
var argv = process.argv[3];
var transform;
if(argv === 'npinvert'){
  transform = nonPaletteInversion;
} else if(argv === 'pinvert'){
  transform = paletteInversion;
} else if(argv === 'npgreyscale'){
  transform = nonPaletteGreyscale;
} else if(argv === 'pgreyscale'){
  transform = paletteGreyscale;
} else if(argv === 'npblue'){
  transform = nonPaletteBlueFilter;
} else if(argv === 'pblue'){
  transform = paletteBlueFilter;
}

function nonPaletteInversion(){
  for(var i = bitmapData.pixelArrayStartAddress; i < bitmapData.size - 4; i += 4){
    var invertedColorsObject = colors.invertColors(colors.readColors(i, bitmap));
    colors.writeColors(i, bitmap, invertedColorsObject);
    console.log(invertedColorsObject);
  }
}

function paletteInversion(){
  for(var i = 54; i < bitmapData.pixelArrayStartAddress; i += 4){
    var invertedColorsObject = colors.invertColors(colors.readColors(i, bitmap));
    colors.writeColors(i, bitmap, invertedColorsObject);
  }
}

function nonPaletteGreyscale(){
  for(var i = bitmapData.pixelArrayStartAddress; i < bitmapData.size - 4; i += 4){
    var greyscaleColorsObject = colors.greyColors(colors.readColors(i, bitmap));
    colors.writeColors(i, bitmap, greyscaleColorsObject);
  }
}

function paletteGreyscale(){
  for(var i = 54; i < bitmapData.pixelArrayStartAddress; i += 4){
    var greyscaleColorsObject = colors.greyColors(colors.readColors(i, bitmap));
    colors.writeColors(i, bitmap, greyscaleColorsObject);
  }
}

function paletteBlueFilter(){
  for(var i = bitmapData.pixelArrayStartAddress; i < bitmapData.size - 4; i += 4){
    var blueFilterColorsObject = colors.blueFilter(colors.readColors(i, bitmap));
    colors.writeColors(i, bitmap, blueFilterColorsObject);
  }
}

function nonPaletteBlueFilter(){
  for(var i = 54; i < bitmapData.pixelArrayStartAddress; i += 4){
    var blueFilterColorsObject = colors.blueFilter(colors.readColors(i, bitmap));
    colors.writeColors(i, bitmap, blueFilterColorsObject);
  }
}

transform();
fs.writeFileSync(__dirname + '/output/' + process.argv[2], bitmap);

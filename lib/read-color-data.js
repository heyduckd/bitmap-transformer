'use strict';

var colors = {};

colors.readColors = function(index, bitmap){
  var colorsObject = {};
  colorsObject.r = bitmap.readUInt8(index);
  colorsObject.g = bitmap.readUInt8(index + 1);
  colorsObject.b = bitmap.readUInt8(index + 2);
  colorsObject.a = bitmap.readUInt8(index + 3);
  return colorsObject;
};

// Inverts Colors
colors.invertColors = function(colorsObject){
  var colorsList = ['r', 'g', 'b', 'a'];
  colorsList.forEach(function(curr){
    var currentColor = colorsObject[curr];
    colorsObject[curr] = 255 - currentColor;
  });
  return colorsObject;
};

// Greyscale
colors.greyColors = function(colorsObject){
  var colorsList = ['r', 'g', 'b', 'a'];
  colorsList.forEach(function(curr){
    var currentColor = colorsObject[curr];
    colorsObject[curr] = currentColor * 0.5;
  });
  return colorsObject;
};

// Blue Filter
colors.blueFilter = function(colorsObject){
  var colorsList = ['b'];
  colorsList.forEach(function(curr){
    var currentColor = colorsObject[curr];
    colorsObject[curr] = currentColor * 0.5;
  });
  return colorsObject;
};

colors.writeColors = function(i, bitmap, colorsObject){
  bitmap.writeUInt8(colorsObject.r, i);
  bitmap.writeUInt8(colorsObject.g, i + 1);
  bitmap.writeUInt8(colorsObject.b, i + 2);
  bitmap.writeUInt8(colorsObject.a, i + 3);
};

module.exports = colors;

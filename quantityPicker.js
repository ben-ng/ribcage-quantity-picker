var Picker = require('ribcage-picker')
  , convert = require('convert-units')
  , each = require('lodash.foreach')
  , vulgarities = require('vulgarities')
  , QuantityPicker
  , createQuantities
  , createDivisions
  , createUnits;

QuantityPicker = function (opts) {
  opts = opts || {};

  var slots = {}
    , picker
    , range = opts.range || {low: 0, high: 1000}
    , measure = opts.measure || convert().measures().pop()
    , quantities
    , units;

  slots.quantity = {
    values: createQuantities(range.low, range.high)
  , defaultKey: '100'
  };

  slots.division = {
    values: createDivisions()
  };

  slots.unit = {
    values: createUnits(measure)
  , defaultKey: 'g'
  };

  picker = new Picker({slots: slots});

  return picker;
};

createQuantities = function (low, high) {
  var quantities = {};

  if(high < low)
    throw new Error('Cannot create quantities when `high` is lower than `low`');

  for(; low != high; ++low) {
    quantities[low] = low;
  }

  return quantities;
};

createDivisions = function () {
  var divisions = {
    '--': 0
  };

  each(vulgarities, function (code, key) {
    var frac = key.split('/');
    divisions[code] = frac[0]/frac[1];
  });

  return divisions;
};

createUnits = function (measure) {
  var measures = {}
    , units = convert().possibilities(measure);

  each(units, function (unit) {
    measures[unit] = unit;
  });

  return measures;
};

module.exports = QuantityPicker;

var Picker = require('ribcage-picker')
  , convert = require('convert-units')
  , each = require('lodash.foreach')
  , vulgarities = require('vulgarities')
  , fracCharFor = require('vulgarities/charFor')
  , ratio = require('ratio')
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
    , units
    , splitDefaultQuantity
    , parsedDivision
    , defaultQuantity = 1
    , defaultDivision = '--';

  if(opts.defaultQuantity) {
    splitDefaultQuantity = ('' + opts.defaultQuantity).split('.');
    defaultQuantity = parseInt(splitDefaultQuantity[0], 10);

    if(splitDefaultQuantity.length > 1) {
      parsedDivision = parseInt(splitDefaultQuantity[1], 10);
      defaultDivision = ratio(parsedDivision / (10 * splitDefaultQuantity[1].length)).toString();
    }
  }

  slots.quantity = {
    values: createQuantities(range.low, range.high)
  , defaultKey: defaultQuantity
  };

  slots.division = {
    values: createDivisions()
  , defaultKey: defaultDivision != '--' ? fracCharFor.apply(this, defaultDivision.split('/')) : '--'
  };

  slots.unit = {
    values: createUnits(measure)
  , defaultKey: opts.defaultUnit
  };

  picker = new Picker({
    slots: slots
  , offsetParent: opts.offsetParent
  });

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

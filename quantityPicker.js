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
    , eachAlias = opts.eachAlias
    , splitDefaultQuantity
    , parsedDivision
    , defaultQuantity = 1
    , defaultDivision = '--'
    , divKey;

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

  divKey = opts.vulgar ? fracCharFor.apply(this, defaultDivision.split('/')) : defaultDivision;

  slots.division = {
    values: createDivisions(opts.vulgar)
  , defaultKey: defaultDivision != '--' ? divKey : '--'
  };

  slots.unit = {
    values: createUnits(measure, eachAlias)
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

createDivisions = function (vulgar) {
  var divisions = {
    '--': 0
  };

  each(vulgarities, function (code, key) {
    var frac = key.split('/');

    if(vulgar === true) {
      divisions[code] = frac[0]/frac[1];
    }
    else {
      divisions[frac[0] + '/' + frac[1]] = frac[0]/frac[1];
    }
  });

  return divisions;
};

createUnits = function (measure, eachAlias) {
  if(eachAlias) {
    var ret = {};
    ret[eachAlias] = 'ea';
    return ret;
  }
  else {
    var measures = {}
      , units = convert().possibilities(measure);

    each(units, function (unit) {
      measures[unit] = unit;
    });

    return measures;
  }
};

module.exports = QuantityPicker;

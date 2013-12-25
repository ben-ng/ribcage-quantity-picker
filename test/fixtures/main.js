var QuantityPicker = require('../../quantityPicker')
  , Ribcage = require('ribcage-view')
  , AppView
  , App;

AppView = Ribcage.extend({
  template: require('./app.hbs')
, quantity: 50
, unit: 'lb'
, afterInit: function () {
    this.picker = new QuantityPicker({
      range: {low: 1, high: 1000}
    , step: 4
    , measure: 'mass'
    , defaultQuantity: 2.5
    , defaultUnit: 'kg'
    });
  }
, afterRender: function () {
    var self = this;

    this.appendSubview(this.picker, this.$('.spinholder'));
    this.picker.render();
    this.picker.delegateEvents();

    this.listenTo(this.picker, 'change', function () {
      var pickerVals = self.context();

      self.$('.value').text(pickerVals.value);
      self.$('.unit').text(pickerVals.unit);
    });
  }
, context: function () {
    var pickerVals = this.picker.getValues();

    return {
      value: pickerVals.quantity.value + pickerVals.division.value
    , unit: pickerVals.unit.value
    };
  }
});

App = new AppView({el: document.getElementById('app')});
App.render();

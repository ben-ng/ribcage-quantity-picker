ribcage-quantity-picker
==============

This is a widget that mimics the native "slot-machine" style pickers now ubiquitious on our mobile devices. It extends from [`ribcage-picker`](http://npmjs.org/package/ribcage-picker).

`ribcage-quantity-picker` is a [Backbone](http://backbonejs.org/) view, best served with the other great components in the [ribcage-ui](https://github.com/Techwraith/ribcage-ui) collection.

Usage
-----

#### Creating A Quantity Picker

```js
var Picker = require('ribcage-quantity-picker')
  , picker;

picker = new Picker({
  measure: 'mass'
, vulgar: true            // Not all devices support vulgar fractions (i.e. Android)
                          // Thus, this is disabled by default.
, defaultQuantity: 1.25   // Will be massaged into the closest possible fraction
, defaultUnit: 'kg'
});
```

### Listening for changes
```js
picker.on('change', function (selection) {
  // Do something with the current selection
  console.log(selection.quantity.value);  // e.g. 100
  console.log(selection.division.value);  // e.g. 0.25
  console.log(selection.unit.value);      // e.g. 'kg'
});
```

License & Acknowledgements
--------------------------

Copyright (c) 2013 Ben Ng, http://benng.me

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

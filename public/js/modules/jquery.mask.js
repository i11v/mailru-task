(function ($) {
  "use strict";

  var Mask = function (element, options) {
    this.element = element;
    this.options = options;
    this.init();
  };

  Mask.prototype.init = function () {};

  $.fn.mask = function (options) {
    return this.each(function () {
      new Mask(this, options);
    });
  };
}(jQuery));

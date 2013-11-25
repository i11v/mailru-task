;(function ($) {
  "use strict";

  var Declension = function (element, options) {
    this.element = element;
    this.$element = $(element);
    this.options = options;

    this.init();
  };

  Declension.prototype.init = function () {};

  $.fn.declension = function (options) {
    return this.each(function () {
      new Declension(this, options);
    });
  };
}(jQuery));

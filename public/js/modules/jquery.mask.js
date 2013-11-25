;(function ($) {
  "use strict";

  var Mask = function (element, options) {
    var $element = $(element);

    this.element = element;
    this.$element = $element;
    this.pattern = new RegExp($element.attr("pattern"));
    this.mask = $element.data().mask;
    this.options = options;
    this.init();
  };

  Mask.prototype.init = function () {
    var that = this;

    that.$element.on("keyup.mask", function (e) {
      var value = this.value
        , length = this.value.length
        , match = function () { return value.match(/\-/g) };

      // Adding dashs
      length === that.mask.indexOf("-", length)
        && (!match() || (match() && match().length !== 2))
        && (e.keyCode !== 8)
        && (this.value += "-");

      // Set focus to the next input
      length === that.mask.length && !that.$element.hasClass("error") && that.next();
    });
  };

  Mask.prototype.next = function () {
    $("[tabindex=" + (parseInt(this.$element.attr("tabindex")) + 1) + "]")[0].focus();
  };

  $.fn.mask = function (options) {
    return this.each(function () {
      new Mask(this, options);
    });
  };
}(jQuery));

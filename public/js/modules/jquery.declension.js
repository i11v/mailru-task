;(function ($) {
  "use strict";

  var Declension = function (element, options) {
    this.element = element;
    this.$element = $(element);
    this.$target = $(options.target);
    this.rules = options.rules;

    this.init();
  };

  Declension.prototype.init = function () {
    var that = this;

    that.$target.on("keyup.declension", function () {
      var amount = parseInt(this.value)
        , word = that.rules["0"];

      $.each(that.rules, function (index, value) {
        amount >= index && (word = value);
      });

      that.$element.text(word);
    });
  };

  $.fn.declension = function (options) {
    return this.each(function () {
      new Declension(this, options);
    });
  };
}(jQuery));

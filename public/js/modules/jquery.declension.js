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

      if ((amount % 100 < 11) || (amount % 100 > 19)) {
        $.each(that.rules, function (index, value) {
          (amount % 10 >= index) && (word = value);
        });
      }

      that.$element.text(word);
    });
  };

  $.fn.declension = function (options) {
    return this.each(function () {
      new Declension(this, options);
    });
  };
}(jQuery));

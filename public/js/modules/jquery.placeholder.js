;(function (document, $) {
  "use strict";

  var isPlaceholderSupported = "placeholder" in document.createElement("input");

  var Placeholder = function (element) {
    this.element = element;
    this.$element = $(element);
    this.clear = true;
    this.init();
  };

  Placeholder.prototype.init = function () {
    var that = this;

    that.setPlaceholder();

    that.$element.on("focus.placeholder", function () {
      that.clear && that.clearInput();
    });
    that.$element.on("blur.placeholder", function () {
      !this.value.length ? that.setPlaceholder() : that.clear = false;
    });
  };

  Placeholder.prototype.clearInput = function () {
    var $element = this.$element;

    $element.val("");
    $element.removeClass("placeholder-support");
  };

  Placeholder.prototype.setPlaceholder = function () {
    var $element = this.$element;

    this.clear = true;
    $element.val($element.attr("placeholder"));
    $element.addClass("placeholder-support");
  };

  if (!isPlaceholderSupported) {
    $.fn.placeholder = function () {
      return this.each(function () {
        new Placeholder(this);
      });
    };
  } else {
    $.fn.placeholder = function () {
      return this;
    };
  }
}(document, jQuery));

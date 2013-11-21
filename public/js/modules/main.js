(function (window, document, $) {
  "use strict";

  $(".js-mask").mask();

  $(document).on("submit", ".js-pay-form", function (e) {
    e.preventDefault();
  });
}(window, document, jQuery));

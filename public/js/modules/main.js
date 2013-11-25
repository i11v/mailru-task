;(function (window, document, $) {
  "use strict";

  var $document = $(document)

  /**
   * Checks input data by input pattern
   * @param  {Object}  $input Input element jQuery wrapped
   * @return {boolean}        Check result
   */
  var checkPattern = function ($input) {
    return (new RegExp($input.attr("pattern"))).test($input.val());
  };

  /**
   * Checks money input by pattern and compare with 1
   * @param  {Object}  $input Input element jQuery wrapped
   * @return {boolean}        Check result
   */
  var checkMoney = function ($input) {
    return (parseInt($input.val()) >= 1) && checkPattern($input);
  };

  /**
   * Checks field by given function
   * @param {Function} fn Input check function
   */
  var checkField = function (fn) {
    var $this = $(this);

    fn($this)
      ? $this.removeClass("error").addClass("correct")
      : $this.removeClass("correct").addClass("error");
  };

  /**
   * Send form data to server
   * @param {Object} e Send event
   */
  var sendData = function (e) {
    var formData = {
      tel: $(".js-country-code").text() + $(".js-phone-code").val() + $(".js-phone-number").val().replace(/\-/g, ""),
      amount: $(".js-money-amount").val()
    };

    e.preventDefault();

    console.log(formData);
  };

  // Enable IE placeholder support
  $("input[type='text']").placeholder();

  // Set mask to phone input field
  $(".js-phone-code, .js-phone-number").mask();

  // Subscribe to events
  $document.on("submit", ".js-pay-form", sendData);

  $document.on("blur", ".js-check", function () {
    checkField.call(this, checkPattern);
  });

  $document.on("focus", ".js-check", function () {
    $(this).removeClass("error correct");
  });

  $document.on("keyup", ".js-form-unlock", function () {
    checkField.call(this, checkMoney);
  });

  $document.on("keyup", ".js-check", function () {
    if (checkPattern($(this)) && ($(".js-check").length === $(".correct").length)) {
      $(".js-form-lock").removeClass("button-send_disabled").removeAttr("disabled");
    } else {
      $(".js-form-lock").addClass("button-send_disabled").attr("disabled", "disabled");
    }
  });
}(window, document, jQuery));

// BANNER SLIDER

$(".slider-banner-content, .share-slider, .features-slider").slick({
  arrows: false,
  dots: true,
  infinity: true,
  slidesToShow: 1,
  slidesToScroll: 1,
});

// ADD SHADOW TO NAV ON

$(document).ready(function () {
  // Check scroll position on page load
  checkScroll();

  // Check scroll position on scroll
  $(window).scroll(function () {
    checkScroll();
  });

  function checkScroll() {
    let navbar = $(".navbar");
    let isTop = navbar.offset().top === 0;

    // Add or remove shadow class based on scroll position
    if (!isTop) {
      navbar.addClass("shadow");
    } else {
      navbar.removeClass("shadow");
    }
  }
});

// GALLARY SET LIKE

$(document).ready(function () {
  $(".heart-icon").on("click", function () {
    let container = $(this).closest(".gallery-images-content-item");
    let likeCount = parseInt(container.find(".likes .number").text(), 10);
    let isLiked = $(this).hasClass("fa-solid");

    if (isLiked) {
      container.find(".likes .number").text(likeCount - 1);
    } else {
      container.find(".likes .number").text(likeCount + 1);
    }
    $(this).toggleClass("fa-regular fa-solid");
  });
});

// REGISTRATION FORM VALIDATION

$(document).ready(function () {

  const placeholderValues = savePlaceholderValues();

  // Form submit
  $("#subscribe_form").on("submit", function (event) {
    clearValidationStyles();

    // Check all field together
    let isFormValid = true;

    if (!validateEmail()) {
      isFormValid = false;
    }

    if (!isFormValid) {
      toastr.error("Форма не надіслена! Не коректні дані!");
      event.preventDefault();
      return;
    }

    toastr.success("Форма успішно надіслена!");
    clearForm();

    // Uncomment the line below to submit the form or remove event.preventDefault();
    // $(this).unbind('submit').submit();
    event.preventDefault();
  });

  // Function to save placeholder values in an array
  function savePlaceholderValues() {
    let placeholderValues = [];

    $("#subscribe_form input[type=text], #subscribe_form input[type=email]"
    ).each(function () {
      placeholderValues.push($(this).attr("placeholder"));
    });

    return placeholderValues;
  }

  // Function to set placeholder values based on the provided array
  function setPlaceholderValues(placeholderValues) {
    $(
      "#subscribe_form input[type=text], #subscribe_form input[type=email]"
    ).each(function (index) {
      $(this).attr("placeholder", placeholderValues[index]);
    });
  }

  function clearForm() {
    $("#subscribe_form")[0].reset();
    setPlaceholderValues(placeholderValues);
  }

  function validateEmail() {
    const emailField = $("#field_email");
    const emailValue = emailField.val().trim();

    if (emailField === "") {
      setValidationError(phoneField, "Введіть адресу електронної пошти.");
      toastr.error("Введіть адресу електронної пошти!");
      return false;
    }

    if (!isValidEmail(emailValue)) {
      setValidationError(
        emailField,
        "Введіть правильну адресу електронної пошти."
      );
      toastr.error("Введіть правильну адресу електронної пошти!");
      return false;
    }

    return true;
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function setValidationError(element, message) {
    element.attr("placeholder", message).val(""); // Clear the value
    element.addClass("error");
  }

  function clearValidationStyles() {
    $("input, textarea").removeClass("error").attr("placeholder", "");
  }
});
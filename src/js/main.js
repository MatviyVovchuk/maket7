// BANNER SLIDER

$(".slider-banner-content").slick({
  arrows: false,
  dots: true,
  infinity: true,
  slidesToShow: 1,
  slidesToScroll: 1,
});

// ADD SHADOW TO NAV ON

$(document).ready(function() {
  // Check scroll position on page load
  checkScroll();

  // Check scroll position on scroll
  $(window).scroll(function() {
    checkScroll();
  });

  function checkScroll() {
    var navbar = $('.navbar');
    var isTop = navbar.offset().top === 0;

    // Add or remove shadow class based on scroll position
    if (!isTop) {
      navbar.addClass('shadow');
    } else {
      navbar.removeClass('shadow');
    }
  }
});

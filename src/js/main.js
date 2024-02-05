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

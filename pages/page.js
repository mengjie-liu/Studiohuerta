$(document).ready(function () {
  $(".links")
    .mouseenter(function () {
      $(this).css({
        "text-decoration": "underline",
        "text-underline-offset": "0.5rem",
      });
    })
    .mouseleave(function () {
      $(this).css({
        "text-decoration": "none",
      });
    });
});

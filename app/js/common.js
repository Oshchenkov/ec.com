$(document).ready(function(){

	// OWL Carousel options

  $(".owl-carousel").owlCarousel({
  	"items": 							1,
  	"nav": 								true,
  	"loop": 							true,
  	"dots": 							false,
  	"navContainerClass": "owl-nav",
  	 "autoplay": 					true,
  	 "autoplayTimeout": 		4500
  });

  // Active input in contact form

  $(".learnMore-form__content-input input").focus(function(){
  	$( this ).parent().addClass("active");
  	$( this ).focusout(function(){
	  	$( this ).parent().removeClass("active");
	  });
  });

  // Scroll to element and focus

/*  $("[data-scroll-to]").click(function() {
	  var $this = $(this),
	      $toElement      = $this.attr('data-scroll-to'),
	      $focusElement   = $this.attr('data-scroll-focus'),
	      $offset         = $this.attr('data-scroll-offset') * 1 || 0,
	      $speed          = $this.attr('data-scroll-speed') * 1 || 500;

	  $('html, body').animate({
	    scrollTop: $($toElement).offset().top + $offset
	  }, $speed);
	  
	  if ($focusElement) $($focusElement).focus();
	});*/

  $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

  //

});
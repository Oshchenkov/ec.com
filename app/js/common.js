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


  $(' a[href*="#"]')
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
      
      headerHeight = $(".main-headerBg").height(); // Get fixed header height

      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - headerHeight
        }, 1000 );
        //return false;
      }
    }
  });

  // Mobile btn
  $(".main-headerLogo-mobile-burgerBtn").click(function(e){
    e.preventDefault();
    $(".main-headerMenu").toggleClass("on");
    $(document).mouseup(function(e) 
      {
          var container = $(".main-header");

          // if the target of the click isn't the container nor a descendant of the container
          if (!container.is(e.target) && container.has(e.target).length === 0 )
          {
            $(".main-headerMenu").removeClass("on");
          }
      });
    $(".main-headerMenu__nav").mouseup(function(){
      $(".main-headerMenu").removeClass("on");
    });
  });

  // Fixed main menu on scroll

  $(window).scroll(function(){
    fixedHeader();
  });
  fixedHeader();
  

  function fixedHeader(){
    if ($(window).scrollTop() >= 36) {
       $(".main-headerBg").addClass("fixed-header");
       $(".main").addClass("fixed-header");
    }
    else {
       $(".main-headerBg").removeClass("fixed-header");
       $(".main").removeClass("fixed-header");
    }
  }

});
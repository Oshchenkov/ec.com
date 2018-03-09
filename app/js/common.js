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


  fieldActiveOnFocus( ".learnMore-form__content-input input" );
  fieldActiveOnFocus( ".loginForm__input input" );

  function fieldActiveOnFocus ( inputSelector ){
    $( inputSelector ).focus(function(){
      $( this ).parent().addClass("active");
      $( this ).focusout(function(){
        $( this ).parent().removeClass("active");
      });
    });
  }

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
    if ($(window).scrollTop() >= 36) { // 36px height of top header
       $(".main-headerBg").addClass("fixed-header");
       $(".main").addClass("fixed-header");
    }
    else {
       $(".main-headerBg").removeClass("fixed-header");
       $(".main").removeClass("fixed-header");
    }
  }

  // About page drop info

  $('html').click(function(e) {
    //if clicked element is not your element and parents aren't your div
    if (e.target.id != '.leaderShipBlock' && $(e.target).parents('.leaderShipSection__container').length == 0) {
      //do stuff
      $(".leaderShipSection").removeClass("active");
      $(".leaderShipBlock").css( "marginBottom", "0" ).removeClass("active");
      $(".leaderShipBlock-infoContainerBg").fadeOut();
    }
  });

  leadeShipInfo_Open( ".leaderShipBlock__link" );
  leadeShipInfo_Close(".leaderShipBlock-infoContainer__close");

  function leadeShipInfo_Open ( leadeShipInfo_linkSelector ){
    $ ( leadeShipInfo_linkSelector ).click(function( event ){
      event.preventDefault();
    });
    $( leadeShipInfo_linkSelector ).click(function(){

      var $this = $( this );
      var dropBlock_height = $this.next().height();

      if (!( $this.parent(".leaderShipBlock").hasClass("active") )){
        $(".leaderShipSection").addClass("active");

        $(".leaderShipBlock.active").toggleClass("active")
          .css( "marginBottom", "0" )
          .children(".leaderShipBlock-infoContainerBg").fadeOut();
        $this.parents(".leaderShipBlock").toggleClass("active")
          .css( "marginBottom", dropBlock_height+"px" )
          .children(".leaderShipBlock-infoContainerBg").fadeIn();
      }
    });
  }

  function leadeShipInfo_Close ( leadeShipInfo_closeLinkSelector ){
    $ ( leadeShipInfo_closeLinkSelector ).click(function( event ){
      event.preventDefault();
    });
    $( leadeShipInfo_closeLinkSelector ).click(function(){
      var $this = $( this );

      $this.closest(".leaderShipBlock-infoContainerBg").fadeOut();
      $this.closest(".leaderShipBlock").css( "marginBottom", "0" );
      $(".leaderShipSection").removeClass("active");
      $this.closest(".leaderShipBlock").removeClass("active");
    });
  }

});
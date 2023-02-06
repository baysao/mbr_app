
  /*------------------------------------------------------------------------------*/
  /* One Page setting
  /*------------------------------------------------------------------------------*/  
    jQuery( document ).ready(function($) { 

    if( jQuery('body').hasClass('cmt-one-page-site') ){
    var sections = jQuery('.cmt-row, #cmt-header-slider'),
    nav          = jQuery('.site-header-menu, div.menu'),
    nav_height   = jQuery('#site-navigation').data('sticky-height')-1;
    
        
        jQuery(window).on('scroll', function () {
                if( jQuery('body').scrollTop() < 5 ){
                    nav.find('a').parent().removeClass('active');  
                }                          
                var cur_pos = jQuery(this).scrollTop(); 
                sections.each(function() {
                    var top = jQuery(this).offset().top - (nav_height+1),
                    bottom = top + jQuery(this).outerHeight(); 
                    if (cur_pos >= top && cur_pos <= bottom) {                        
                        if( typeof jQuery(this) != 'undefined' && typeof jQuery(this).attr('id')!='undefined' && jQuery(this).attr('id')!='' ){
                            var mainThis = jQuery(this);                            
                            nav.find('a').removeClass('active');                       
                            jQuery(this).addClass('active');
                            var arr = mainThis.attr('id');                          
                            
                            // Applying active class
                            nav.find('a').parent().removeClass('active');
                            nav.find('a').each(function(){
                                var menuAttr = jQuery(this).attr('href').split('#')[1];                     
                                if( menuAttr == arr ){
                                    jQuery(this).parent().addClass('active');
                                }
                            })
                        }
                    }
                });
            //}
        });
        
        nav.find('a').on('click', function () {
            var $el = jQuery(this), 
            id = $el.attr('href');
            var arr=id.split('#')[1];     
            jQuery('html, body').animate({
                scrollTop: jQuery('#'+ arr).offset().top - nav_height
            }, 500);  
            return false;
        });
        
    }
    
} ); // END of  document.ready
 
/*------------------------------------------------------------------------------*/
/* Preloader
/*------------------------------------------------------------------------------*/
   // makes sure the whole site is loaded
    $(window).on("load", function () {
        $(".loader-blob").fadeOut();
        $("#preloader").delay(300).fadeOut('slow',function(){
        $(this).remove();
      }); 

    });


/*------------------------------------------------------------------------------*/
/* Fixed-header
/*------------------------------------------------------------------------------*/

$(window).scroll(function(){
    if ( matchMedia( 'only screen and (min-width: 1200px)' ).matches ) 
    {
        if ($(window).scrollTop() >= 30 ) {
            $('.cmt-stickable-header').addClass('fixed-header');
            $('.cmt-stickable-header').addClass('visible-title');
        }
        else {

            $('.cmt-stickable-header').removeClass('fixed-header');
            $('cmt-stickable-header').removeClass('visible-title');
            }
    }
});


/*------------------------------------------------------------------------------*/
/* Menu
/*------------------------------------------------------------------------------*/

    $('ul li:has(ul)').addClass('has-submenu');
    $('ul li ul').addClass('sub-menu');


    $("ul.dropdown li").on({

        mouseover: function(){
           $(this).addClass("hover");
        },  
        mouseout: function(){
           $(this).removeClass("hover");
        }, 

    });
    
    var $menu = $('#menu'), $menulink = $('#menu-toggle-form'), $menuTrigger = $('.has-submenu > a');
    $menulink.on('click',function (e) {

        $menulink.toggleClass('active');
        $menu.toggleClass('active');
    });

    $menuTrigger.on('click',function (e) {
        e.preventDefault();
        var t = $(this);
        t.toggleClass('active').next('ul').toggleClass('active');
    });

    $('ul li:has(ul)');
    $(document).ready(function() {
    var e = '<div class="cmt_floting_customsett">'+
                '<a href="https://support.cymolthemes.com/" class="tmtheme_fbar_icons"><i class="fa fa-headphones"></i><span>Support</span></a>'+
                '<a href="https://www.cymolthemes.com/" class="tmtheme_fbar_icons"><i class="themifyicon themifyicon ti-pencil"></i><span>Customization</span></a>'+
                '<a href="https://1.envato.market/ZPjVQ" class="tmtheme_fbar_icons"><i class="themifyicon ti-shopping-cart"></i><span class="buy_link">Buy<span></span></span></a>'+
                '<div class="clearfix"></div>'+
            '</div>';

    $('body').append(e);
}); 

/*------------------------------------------------------------------------------*/
/* Page slide
/*------------------------------------------------------------------------------*/

    $(".page-slide").owlCarousel({  
        loop: true,
        autoplay: true,
        items: 1,
        nav: false,
        dots: false,
        smartSpeed: 100,
        autoplayHoverPause: true,
        animateOut: 'slideOutUp',
        animateIn: 'slideInUp'
    });


/*------------------------------------------------------------------------------*/
/* Back to top
/*------------------------------------------------------------------------------*/

// ===== Scroll to Top ==== 
jQuery('#totop').hide();
jQuery(window).scroll(function() {
    "use strict";
    if (jQuery(this).scrollTop() >= 100) {        // If page is scrolled more than 50px
        jQuery('#totop').fadeIn(200);    // Fade in the arrow
        jQuery('#totop').addClass('top-visible');
    } else {
        jQuery('#totop').fadeOut(200);   // Else fade out the arrow
        jQuery('#totop').removeClass('top-visible');
    }
});
jQuery('#totop').click(function() {      // When arrow is clicked
    jQuery('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
    }, 500);
    return false;
});
  
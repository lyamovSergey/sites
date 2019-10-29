$(window).on('load', function() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('body').addClass('ios');
    } else {
        $('body').addClass('web');
    };
    $('body').removeClass('loaded');
});
/* viewport width */
function viewport() {
    var e = window,
        a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width: e[a + 'Width'], height: e[a + 'Height'] }
};
/* viewport width */
$(function() {
    /* placeholder*/
    $('input, textarea').each(function() {
        var placeholder = $(this).attr('placeholder');
        $(this).focus(function() { $(this).attr('placeholder', ''); });
        $(this).focusout(function() {
            $(this).attr('placeholder', placeholder);
        });
    });
    /* placeholder*/

    $('.button-nav').click(function() {
        $(this).toggleClass('active'),
            $('.main-nav-list').slideToggle();
        return false;
    });

    /* components */

    /*
	
    if($('.styled').length) {
    	$('.styled').styler();
    };
    if($('.fancybox').length) {
    	$('.fancybox').fancybox({
    		margin  : 10,
    		padding  : 10
    	});
    };
    if($('.slick-slider').length) {
    	$('.slick-slider').slick({
    		dots: true,
    		infinite: false,
    		speed: 300,
    		slidesToShow: 4,
    		slidesToScroll: 4,
    		responsive: [
    			{
    			  breakpoint: 1024,
    			  settings: {
    				slidesToShow: 3,
    				slidesToScroll: 3,
    				infinite: true,
    				dots: true
    			  }
    			},
    			{
    			  breakpoint: 600,
    			  settings: "unslick"
    			}				
    		]
    	});
    };
    if($('.scroll').length) {
    	$(".scroll").mCustomScrollbar({
    		axis:"x",
    		theme:"dark-thin",
    		autoExpandScrollbar:true,
    		advanced:{autoExpandHorizontalScroll:true}
    	});
    };
	
    */

    /* components */



});

var handler = function() {

    var height_footer = $('footer').height();
    var height_header = $('header').height();
    //$('.content').css({'padding-bottom':height_footer+40, 'padding-top':height_header+40});


    var viewport_wid = viewport().width;
    var viewport_height = viewport().height;

    if (viewport_wid <= 991) {

    }

}
$(window).bind('load', handler);
$(window).bind('resize', handler);



$(function() {

    //slider slick
    $('.products__slider').slick({
        infinite: false,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        row: 1,
        appendDots: $('.product-slider__arrows-wrapper'),
        appendArrows: $('.product-slider__arrows-wrapper'),
        prevArrow: '<div class="prev">&lsaquo;</div>',
        nextArrow: '<div class="next">&rsaquo;</div>',
        responsive: [{
                breakpoint: 861,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 641,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    //accordeon in aside
    $(".aside-menu__item").on("click", function(e) {
        $(this).toggleClass("show-submenu");
        $(this).siblings().removeClass("show-submenu");
    })

    $(".menu-item__submenu li").on("click", function(e) {
        e.stopPropagation();
        $(this).addClass("active")
            .siblings()
            .removeClass("active");
    })


    $("#filterSubmit").on("click", function(e) {
        e.stopPropagation();
    })

    //scrollBar custom
    $(".menu-item__submenu").mCustomScrollbar({
        autoHideScrollbar: false,
        alwaysShowScrollbar: 2,
        autoExpandScrollbar: false
    });

    //mobile menu
    $(".mobile-menu-link").on("click", function() {
        $(this).siblings('aside').toggleClass("mobile-show");
        if ($(this).siblings('aside').hasClass("mobile-show")) {
            $(this).html('&#10006').css({ color: 'red' });
        } else {
            $(this).text("Меню").css({ color: '#999999' });
        }

    })

})
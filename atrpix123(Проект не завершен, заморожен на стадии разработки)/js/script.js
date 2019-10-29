$(function() {
    //main scroll
    $("html").niceScroll({
        cursorcolor: "#448EF6",
        railpadding: { top: 0, right: -10, left: 0, bottom: 0 }
    });

    //burger anim
    $(".navbar-toggler").on('click', function() {
        $(this).toggleClass("hideCollapse");
    })
    //main slider
    $("#main-sliderIndicators").carousel({
        interval: 5000000
    });
    //sort-links
    $(".sort-link a").on("click", function(e) {
        e.preventDefault();
        $(this).addClass("active").siblings().removeClass("active");
    })
    //clients block
    $(".clients-slider").owlCarousel({
        items: 3,
        margin: 20,
        dots: false,
        stagePadding: 150,
        startPosition: 1
    });

    //scroll text in clients block
    $(".arrow").on("click", function() {

        $(this).closest(".owl-item")
            .find(".crousel-item")
            .toggleClass("textTop")
            .toggleClass("textHide");



        $(this).closest(".owl-item")
            .siblings()
            .find(".crousel-item")
            .removeClass("textTop")
            .addClass("textHide");



        var that = this;
        var scrollShadow = $(this).closest(".owl-item").find(".scroll-text .scroll-shadow");
        var scrollText = $(this).closest(".owl-item").find(".scroll-text");
        var scrollTextP = $(this).closest(".owl-item").find(".scroll-text p");
        var fontSize = $(this).closest(".owl-item").find(".scroll-text p").css('line-height');
        var lineHeight = Math.floor(parseInt(fontSize.replace('px', '')));
        var scrolled = scrollText.scrollTop();
        var contentHeight = $(this).closest(".owl-item").find(".scroll-text p").height();
        var TextWrapperHeight = $(this).closest(".owl-item").find(".scroll-text").height();
        scrollShadow.fadeOut();


        if (TextWrapperHeight < contentHeight) {
            var nice = $(scrollText).niceScroll({
                cursorcolor: "#ACACAC",
                railpadding: { top: 0, right: -10, left: 0, bottom: 0 }
            });
        }
        scrollText.animate({
            scrollTop: scrolled += lineHeight
        })
        $(scrollText).on("scroll", function() {
            if (this.scrollTop == this.scrollHeight - this.clientHeight) {
                $(that).addClass("line");
            }

            if ($(this).scrollTop() == 0) {
                $(that).removeClass("line");
                $(this).getNiceScroll().remove();
                scrollShadow.fadeIn();
            }
        })
        $(this).closest(".owl-item").siblings().removeClass("textTop");
        $(this).closest(".owl-item").siblings().find(".arrow").removeClass("line");
        $(this).closest(".owl-item").siblings().find(".textHide").find(".scroll-text").animate({
            scrollTop: 0
        });
    });

    $(document).on("click", ".line", function() {
        $(this).closest(".owl-item")
            .siblings()
            .find(".crousel-item")
            .removeClass("textTop")
            .addClass("textHide");
        var scrollText = $(this).closest(".owl-item").find(".scroll-text");
        scrollText.animate({
            scrollTop: 0
        })
    });

    //scroll text in last banner
    $(".more-arrow").on("click", function() {
        var that = this;
        var scrollShadow = $(this).closest(".left-col").find(".scroll-text .scroll-shadow");
        var scrollText = $(this).closest(".left-col").find(".scroll-text");
        var text = $(this).closest(".left-col").find(".scroll-text p");
        var fontSize = text.css('line-height');
        var lineHeight = Math.floor(parseInt(fontSize.replace('px', '')));
        var scrolled = scrollText.scrollTop();
        scrollShadow.fadeOut();
        var nice = $(scrollText).niceScroll({
            cursorcolor: "#ACACAC",
            railpadding: { top: 0, right: -10, left: 0, bottom: 0 }
        });
        scrollText.animate({
            scrollTop: scrolled += lineHeight
        })

        $(scrollText).on("scroll", function() {
            if (this.scrollTop == this.scrollHeight - this.clientHeight) {
                $(that).addClass("more-line");
            }

            if ($(this).scrollTop() == 0) {
                $(that).removeClass("more-line");
                $(this).getNiceScroll().remove();
                scrollShadow.fadeIn();
            }
        })

    })

    $(document).on("click", ".more-line", function() {

        var scrollText = $(this).closest(".left-col").find(".scroll-text");
        scrollText.animate({
            scrollTop: 0
        })
    });

    //anchor
    $("#anchor").on("click", function(e) {
        e.preventDefault();
        var id = $(this).attr('href');
        var top = $(id).offset().top;
        $('body,html').animate({ scrollTop: top }, 1000);

    })

    function checkOffset() {
        if ($('#anchor').offset().top + $('#anchor').height() >= $('footer').offset().top - 10) {
            $('#anchor').css({
                'position': 'absolute',
                "top": $('footer').offset().top - 100 + "px"
            });
        }

        if ($(document).scrollTop() + window.innerHeight < $('footer').offset().top) {
            $('#anchor').css({
                'position': 'fixed',
                "top": 90 + "vh"
            });
        }
    }
    $(document).scroll(function() {
        checkOffset();

        if ($('#anchor').offset().top < $("#main-slider").height() || $(window).scrollTop() == 0) {
            $('#anchor').css({ "opacity": "0" });
        } else {
            $('#anchor').css({ "opacity": '1' });
        }

    });

    //shop main slider
    $("#shopMain-slider").carousel({
        wrap: false
    });



    $("#shopMain-slider").on("slid.bs.carousel", function() {
        var activeSlide = $(this).find('.carousel-item.active');
        var title = $(activeSlide).find("h1").text();
        var discription = $(activeSlide).find("p").text();
        var link = $(activeSlide).find("a").attr("href");

        $(".slider-text-wrapper .title-block h1").hide();
        $(".slider-text-wrapper .title-block h1").delay(500).fadeIn();
        $(".slider-text-wrapper .title-block h1").text(title);


        $(".slider-text-wrapper .discription-block p").hide();
        $(".slider-text-wrapper .discription-block p").delay(500).fadeIn();
        $(".slider-text-wrapper .discription-block p").text(discription);


        $(".slider-text-wrapper .link-block a").attr("href", link);

        var carouselItems = $("#shop-slider .carousel-item");
        var length = carouselItems.length;
        if ($(carouselItems[0]).hasClass("active")) {
            $(".carousel-control-prev").addClass("inactive");
        } else {
            $(".carousel-control-prev").removeClass("inactive");
        }


        if ($(carouselItems[length - 1]).hasClass("active")) {
            $(".carousel-control-next").addClass("inactive");
        } else {
            $(".carousel-control-next").removeClass("inactive");
        }

    })

    //accordeon
    $(".accordeon-btn").on("click", function(e) {
        e.preventDefault();
    })
    $(".panel").on("show.bs.collapse", function() {
        $(this).addClass("active");

    })
    $(".panel").on("hide.bs.collapse", function() {
        $(this).removeClass("active");
    })

    //scroll in filter page
    if ($(".shopFilter").length > 0) {
        var photoLength = $("#shop-second.shopFilter .right-col .right-col__item").length;
        if (photoLength > 6) {
            $("#shop-second.shopFilter .right-col").niceScroll({
                cursorcolor: "#448EF6",
                railpadding: { top: 0, right: -15, left: 0, bottom: 0 },
                mousescrollstep: 80,
                autohidemode: false
            });
            $("#shop-second.shopFilter .right-col").on("scroll", function() {
                if ($(this).scrollTop() != 0) {
                    $(this).find(".mask-block").hide();
                } else {
                    $(this).find(".mask-block").fadeIn();
                }
            })
        } else {
            $("#shop-second.shopFilter .right-col .mask-block").hide();
            $("#shop-second.shopFilter").css("padding-bottom", "120px");
        }
    }

    // product page left slider
    $('.slider1').bxSlider({
        pagerCustom: '.slider-nav',
        infiniteLoop: false,
        hideControlOnEnd: false,
    });


    $('.right-slider__first').bxSlider({
        pager: false,
        onSlideBefore: function(newIndex){
            
            var text = $(newIndex[0]).find(".hide-discription p");
            var img = $(".slider1 .cristall img");

            for( var i = 0; i < img.length; i++){
                $(img[i]).attr("src",  $(text[i]).text());
            }
        }
    });

    // product page right slider
    $('.right-slider__second').bxSlider({
        pager: false,
        onSlideBefore: function(newIndex){
            
            var text = $(newIndex[0]).find(".hide-discription p");
            var img = $(".slider1 .cristall");

            for( var i = 0; i < img.length; i++){
                $(img[i]).css("background-image", "url(" + $(text[i]).text() + ")");
            }
        }
    });

    // product page cash
    $(".size__item").on("click", function(){
        $(this)
        .addClass("active")
        .siblings()
        .removeClass("active");
        var cost = $(this).attr("data-cost");
        $(".cash").text(cost);
    })

    // product page carousel
    $(".slider-carousel").owlCarousel({
        items: 4,
        margin: 20,
        dots: false,
        stagePadding: 150,
        startPosition: 1
       
    });

    //favorites heart
    $(".favorites").on("click", function(){
        $(this).toggleClass("redHeart");
    })
})
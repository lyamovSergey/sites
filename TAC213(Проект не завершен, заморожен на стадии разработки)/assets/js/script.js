(function($) {
    $.fn.countTo = function(options) {
        // merge the default plugin settings with the custom options
        options = $.extend({}, $.fn.countTo.defaults, options || {});

        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(options.speed / options.refreshInterval),
            increment = (options.to - options.from) / loops;

        return $(this).each(function() {
            var _this = this,
                loopCount = 0,
                value = options.from,
                interval = setInterval(updateTimer, options.refreshInterval);

            function updateTimer() {
                value += increment;
                loopCount++;
                var val = value.toFixed(options.decimals).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                $(_this).html(val);

                if (typeof(options.onUpdate) == 'function') {
                    options.onUpdate.call(_this, value);
                }

                if (loopCount >= loops) {
                    clearInterval(interval);
                    value = options.to;

                    if (typeof(options.onComplete) == 'function') {
                        options.onComplete.call(_this, value);
                    }
                }
            }
        });
    };
    $.fn.countTo.defaults = {
        from: 0, // the number the element should start at
        to: 100, // the number the element should end at
        speed: 1000, // how long it should take to count between the target numbers
        refreshInterval: 100, // how often the element should be updated
        decimals: 0, // the number of decimal places to show
        onUpdate: null, // callback method for every time the element is updated,
        onComplete: null, // callback method for when the element finishes updating
    };

})(jQuery);

$(document).ready(function() {

    var countersRun = false;

    function runCounter(selector) {
        if (countersRun == false) {
            var counters = $(selector);
            for (var i = 0; i < counters.length; i++) {
                var to = $(counters[i]).data('to');
                if (Number.isInteger(to)) {
                    $(counters[i]).countTo({
                        from: $(counters[i]).data('from'),
                        to: to,
                        speed: $(counters[i]).data('speed'),
                        decimals: 0,
                        refreshInterval: $(counters[i]).data('interval'),
                        onComplete: function(value) {
                            console.debug(this);
                        }
                    });
                } else {
                    $(counters[i]).countTo({
                        from: $(counters[i]).data('from'),
                        to: to,
                        speed: $(counters[i]).data('speed'),
                        decimals: 1,
                        refreshInterval: $(counters[i]).data('interval'),
                        onComplete: function(value) {
                            console.debug(this);
                        }
                    });
                }

            }
            countersRun = true;
        }
    }

    $('#toolsplaybtn').click(function() {
        $('.hidden_tool_block').toggleClass('hide_btn');
        $(this).toggleClass('active');
        $('.toolBtn').toggleClass('screenBtnHide');
    });

    $(window).scroll(function() {
        if ($('.changescreen').length && $('.lifemarket').length) {
            if ($('.changescreen').offset().top >= $('.lifemarket').offset().top - 300) {
                $('.changescreen .nextscreentitle').fadeOut();
            } else if ($('.changescreen').offset().top <= $('.lifemarket').offset().top + 300) {
                $('.changescreen .nextscreentitle').fadeIn();
            }
        }
        if ($('.main-stats').length) {
            if ($(window).scrollTop() >= $('.main-stats').offset().top - 400) {
                runCounter('.counter');
            }
        }
    });

    $(".svg-color #Path_308").css({ fill: "BDBDBD" });
    $(".svg-color #Path_200").css({ fill: "BDBDBD" });
    $(".svg-color #Path_238").css({ fill: "BDBDBD" });

    $(".svg-color")
        .mouseover(function() {
            $(this).find("#Path_308").removeAttr('style');
            $(this).find("#Path_200").removeAttr('style');
            $(this).find("#Path_238").removeAttr('style');
        })
        .mouseout(function() {
            $(this).find("#Path_308").css({ fill: "#BDBDBD" });
            $(this).find("#Path_200").css({ fill: "#BDBDBD" });
            $(this).find("#Path_238").css({ fill: "#BDBDBD" });
        });

    function validateEmail($email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test($email);
    }

    function errorForm(item) {
        $(item).addClass('error');
        $(item).addClass('ahashakeheartache');
        setTimeout(function(item) {
            $(item).removeClass('ahashakeheartache');
        }, 200, item);
    }


    $('.standart_input').change(function() {
        if ($(this).attr('type') == 'email') {
            if ($(this).val().length < 3) {
                errorForm(this);
            } else {
                $(this).removeClass('error');
                if (!validateEmail($(this).val())) {
                    errorForm(this);
                } else {
                    $(this).removeClass('error');
                }
            }
        } else if ($(this).attr('type') == 'text') {
            if ($(this).attr('name') == 'name' && $(this).val().length < 2) {
                errorForm(this);
            } else {
                $(this).removeClass('error');
            }
        } else if ($(this).attr('type') == 'tel') {
            if ($(this).val().length < 9) {
                errorForm(this);
            } else {
                $(this).removeClass('error');
            }
        }
    });

    $('.emailsub-form textarea').change(function() {
        if ($(this).val().length < 5) {
            errorForm(this);
        } else {
            $(this).removeClass('error');
        }
    });

    $('#emailsub-push').click(function() {
        var inputs = $(this).find('input');
        $(inputs).each(function(index) {
            console.log(index + ": " + $(this).text());
        });
    });

    $(".phone_mask").mask("389 99 999 9999");

    // start about page

    /*$('#carouselTrust').on('slide.bs.carousel', function () {
        setTimeout(function (slider) {
            console.log($(this).find('.active'));
        }, 100, this);
        countersRun = true;
        runCounter($(this).find('.counter'));
    })*/

    $('.guarantees_item').click(function() {
        $('#guaratnees_video').attr('src', $(this).data('videourl'));
    });

    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 40,
        responsiveClass: true,
        slideBy: 1,
        nav: true,
        mouseDrag: false,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 3,
                nav: true
            },
            1000: {
                items: 7,
                nav: true,
                loop: true
            }
        }
    });

    function resetSize(slider) {
        var slides = $(slider).find('.owl-item');
        $(slides).find('.person_image').removeClass('team_small');
        $(slides).find('.person_image').removeClass('team_standart');
        $(slides).find('.person_image').removeClass('team_medium');
        $(slides).find('.person_image').removeClass('team_big');
    }

    function teamSetSize(slider) {
        resetSize(slider);
        var active = $(slider).find('.owl-item.active');
        $(active[0]).find('.person_image').addClass('team_small');
        $(active[6]).find('.person_image').addClass('team_small');

        $(active[1]).find('.person_image').addClass('team_standart');
        $(active[5]).find('.person_image').addClass('team_standart');

        $(active[2]).find('.person_image').addClass('team_medium');
        $(active[4]).find('.person_image').addClass('team_medium');

        $(active[3]).find('.person_image').addClass('team_big');
    }

    $('.owl-carousel .owl-item.active').click(function() {
        var active = $('.owl-carousel .owl-item.active');

        for (var i = 0; i < active.length; i++) {
            if ($(active)[i] == this) {
                $('.owl-carousel').trigger('to.owl.carousel', [i + 1, 300]);
                console.log(i);
            }
        }

    });

    teamSetSize($('.owl-carousel'));

    $('.owl-carousel').on('changed.owl.carousel', function(event) {
        setTimeout(teamSetSize, 100, $('.owl-carousel'));
    });

});

// new carousel
$(document).ready(function() {
    $('.carouselNew').carousel({
        numVisible: 7,
        dist: -40,
        padding: 400,
        onCycleTo: function() {
            var activeSlideImg = $(".carouselNew-item.active").find("img").attr("src");
            var activeSlideTitle = $(".carouselNew-item.active").find(".hide-title").text();
            var activeSlideDisc = $(".carouselNew-item.active").find(".hide-discription").text();
            var activeSlideSubTitle = $(".carouselNew-item.active").find(".hide-sub_title").text();
            $(".team_img").attr("src", activeSlideImg);
            $(".team_name").text(activeSlideTitle);
            $(".sub-title").text(activeSlideSubTitle);
            $(".teamText").text(activeSlideDisc);

        }
    });
});

$(function() {
    $(".search-button").on("click", function(e) {
        e.preventDefault();
        $(".search-field-wrapper .search-field").toggleClass("show");
        $(this).toggleClass("hide").siblings(".search-button").toggleClass("hide");

    })

    //popup
    $('#myModal').modal({
        show: false
    })


    $(document).on("click", "#client", function(e) {
        e.preventDefault();
        $(".popup").load("signClient.html", function() {});
    })

    $(document).on("click", "#consult", function(e) {
        e.preventDefault();
        $(".popup").load("registrConsult.html", function() {});
    })

    $('#myModal').on('hidden.bs.modal', function(event) {
        $(".popup").load("sign.html", function() {});
    });


    //registration page
    $("#companyName").change(function() {
        if ($(this).val() == 4) {
            $(".hideInput").fadeIn();
        } else {
            $(".hideInput").fadeOut();
        }
    })


    //form valid
    if ($("#consultRegForm").length > 0) {
        $("#phone").mask("+38(999) 999-99-99");
        $("#passport").mask("aa 999999");
        $("#consultRegForm").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                agentNum: {
                    required: true,
                    minlength: 5
                },
                identifical: {
                    required: true,
                    minlength: 10
                }
            },
            messages: {
                name: {
                    required: "Поле 'Имя' обязательно к заполнению",
                    minlength: "Введите не менее 2-х символов в поле 'Имя'"
                },
                email: {
                    required: "Поле 'Email' обязательно к заполнению",
                    email: "Необходим формат адреса email"
                },

                companyName: "Поле 'Назва кампанії' обязательно к заполнению",
                agentNum: {
                    required: "Поле 'Номер агента' обязательно к заполнению",
                    minlength: "Введите не менее 5 символов в поле 'Номер агента'"
                },
                passport: "Поле 'Серия паспорта' обязательно к заполнению",
                date: "Поле 'Дата' обязательно к заполнению",
                identifical: {
                    required: "Поле 'Ідентифікаційний код' обязательно к заполнению",
                    minlength: "Введите не менее 10-х символов в поле 'Ідентифікаційний код'"
                },
                phone: "Поле 'Мобільний телефон' обязательно к заполнению",
                capchaAnsw: "Поле обязательно к заполнению",
                companyNameOther: "Поле 'Назва кампанії' обязательно к заполнению"

            }
        });
    }
    //blog burger
    $("#isotope-header .burger").on("click", function() {
        $(this).toggleClass("cross");
        $(".tags-block__wrapper").fadeToggle(100);
    });
    $(".tag").on("click", function() {
        $(this).toggleClass("active");
    })


    //isotope
    var $container = $('.isotope');
    $container.isotope({ 
        itemSelector: '.isotope-item',
        layoutMode: 'masonry'
    });

    $('#filters .tag').click(function() {
        var filter = [];
        var tags = $('#filters .tag');

        tags.each(function(){
            if($(this).hasClass("active")){
                var data = $(this).attr('data-filter');
                filter.push(data);
            }
        })
        
        var selector = filter.join(",");
        $container.isotope({ itemSelector: '.isotope-item', filter: selector });
        return false;
    });

})
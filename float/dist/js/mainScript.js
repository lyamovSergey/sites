$(function() {
    //preloader

    var preloader = $('#preloader'), // селектор прелоадера
        imagesCount = $('img').length, // количество изображений
        dBody = $('body'), //обращаемся к body
        percent = 100 / imagesCount, // количество % на одну картинку
        progress = 0, // точка отсчета
        imgSum = 5, // количество картинок
        loadedImg = 0; // счетчик загрузки картинок

    if (imagesCount >= imgSum && imagesCount > 0) {
        

        for (var i = 0; i < imagesCount; i++) { // создаем клоны изображений
            var img_copy = new Image();
            img_copy.src = document.images[i].src;
            img_copy.onload = img_load;
            img_copy.onerror = img_load;
        }

        function img_load() {
            progress += percent;
            $(preloader).find('p').text(progress.toFixed());
            loadedImg++;
            if (progress >= 100 || loadedImg == imagesCount) {
                preloader.delay(400).fadeOut('slow');
                dBody.css('overflow', '');
            }
        }
    } else {
        preloader.remove();
    }










    //scroll animations start

    var vh = window.innerHeight;
    var ctrl = new ScrollMagic.Controller();


    if ($(window).width() > 768) {
        //section one
        new ScrollMagic.Scene({
                triggerElement: '#one',
                triggerHook: 'onLeave'
            })
            .setPin('#one')
            .addTo(ctrl)

        //section two



        new ScrollMagic.Scene({ //sticky heading
                triggerElement: '#two',
                triggerHook: 'onLeave',
            })
            .setPin(".sticky-block1")
            .addTo(ctrl);

        new ScrollMagic.Scene({ //sticky aside
                triggerElement: '#two',
                triggerHook: 'onLeave',
            })
            .setPin(".sticky-block2")
            .addTo(ctrl);

        new ScrollMagic.Scene({
                triggerElement: '#three',
                triggerHook: 'onLeave'
            })
            .setPin('#three')
            .addTo(ctrl);


        new ScrollMagic.Scene({
                triggerElement: '#four',
                triggerHook: 'onLeave'
            })
            .setPin('#four')
            .addTo(ctrl);

        // $('section').each(function() {

        //     var that = this;
        //     new ScrollMagic.Scene({
        //             duration: '50%',
        //             offset: vh / 1.5,
        //             triggerHook: 0,
        //             triggerElement: this
        //         })
        //         .on("progress", function(e) {
        //             $(that).find('.mask-block').css('opacity', e.progress);
        //         })
        //         .addTo(ctrl);
        // })

        new ScrollMagic.Scene({
                duration: '50%',
                offset: vh / 1.5,
                triggerHook: 0,
                triggerElement: '#one'
            })
            .on("progress", function(e) {
                $('#one').find('.mask-block').css('opacity', e.progress);
            })
            .addTo(ctrl);

        new ScrollMagic.Scene({
                duration: '50%',
                offset: vh / 1.5,
                triggerHook: 0,
                triggerElement: '#three'
            })
            .on("progress", function(e) {
                $('#three').find('.mask-block').css('opacity', e.progress);
            })
            .addTo(ctrl);

        if ($(window).width() < 1358 && $(window).width() > 1024) {
            new ScrollMagic.Scene({
                    duration: '50%',
                    offset: vh / 1,
                    triggerHook: 0,
                    triggerElement: '#two'
                })
                .on("progress", function(e) {
                    $('#two').find('.mask-block').css('opacity', e.progress);
                })
                .addTo(ctrl);
        } else {
            new ScrollMagic.Scene({
                    duration: '50%',
                    offset: vh / 1.5,
                    triggerHook: 0,
                    triggerElement: '#two'
                })
                .on("progress", function(e) {
                    $('#two').find('.mask-block').css('opacity', e.progress);
                })
                .addTo(ctrl);
        }


    }




    //transform main img  start




    let $img = $('.img-block');
    if ($(window).width() > 768) {
        var transformY;

        function move(x, y, cursor) {
            // центр img
            let xcenter = $img.offset().left + $img.width() / 2;
            let ycenter = $img.offset().top + $img.height() / 2;


            // координаты мыши относительно центра img
            let otnX = x - xcenter;
            let otnY = y - ycenter;

            // вычисляем % - на каком расстоянии мышь от середины до края, центр = 0%
            let raznX = otnX / $img.width() * 100 * 2;
            let raznY = otnY / $img.height() * 100 * 2;

            // на сколько градусов нужно повернуть (100% = 6deg)
            let trX = raznY / 100 * 6 * -1;
            let trY = raznX / 100 * 10;

            // окруление
            trX = Math.round(trX * 1000) / 1000;
            trY = Math.round(trY * 1000) / 1000;

            // в css
            $img.css('transform', 'rotateY(' + trY + 'deg) rotateX(' + trX + 'deg) rotateZ(0deg) scale(1.05)');


            var cursorWidth = $('#cursor-block').width();
            var cursorHeight = $('#cursor-block').height();


            //cursor shadow

            if (raznY < 0) {
                transformY = (raznY + 1000) * 100 / 100000 - 0.5;

                $(cursor).css({
                    'transform': 'scale(' + transformY + ', ' + transformY + ')',
                });
            } else if (raznY > 0) {
                transformY = (1000 - raznY) * 100 / 100000 - 0.5;
                $(cursor).css({
                    'transform': 'scale(' + transformY + ', ' + transformY + ')',
                });

            }



            $(cursor).css({
                'left': x - cursorWidth / 2 + 'px',
                'top': y - cursorHeight / 2 + 'px'
            })
        }


        $("#one").mousemove(function(e) {
            var cursor = $('#cursor-block');
            move(e.pageX, e.pageY, cursor);
        });

    }

    //transform main img end

    //counter

    var num = 1000030021;
    var str = '';
    var interval = setInterval(function() {
        num += 1;
        str = String(num);
        $(".counter").text(str.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 '));
    }, 100)


    //tabs

    $('.three__tab').on('click', function() {
        $(this).addClass('active').siblings().removeClass('active');
        var contentNumber = $(this).data('content');
        $('#content' + contentNumber)
            .addClass('show')
            .siblings()
            .removeClass('show');

        $('.bg-elemets-wrapper').css('animation', 'none');

        setTimeout(function() {
            $('.bg-elemets-wrapper').css('animation', 'animation3 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)');
        }, 10);


    })


    //third move bg
    var contentBlock = $('.three__right-col');

    function moveBg(x, y, cursor) {
        // центр img
        let xcenter = contentBlock.offset().left + $img.width() / 2;
        let ycenter = contentBlock.offset().top + $img.height() / 2;


        // координаты мыши относительно центра img
        let otnX = x - xcenter;
        let otnY = y - ycenter;

        // вычисляем % - на каком расстоянии мышь от середины до края, центр = 0%
        let raznX = otnX / contentBlock.width() * 100 * 2;
        let raznY = otnY / contentBlock.height() * 100 * 2;

        // на сколько градусов нужно повернуть (100% = 6deg)
        let trX = raznY / 100 * 6 * -1;
        let trY = raznX / 100 * 10;

        // окруление
        trX = Math.round(trX * 1000) / 1000;
        trY = Math.round(trY * 1000) / 1000;

        // в css
        $('.bg-elemets-wrapper').css('transform', 'rotate(' + trY + 'deg)');


    }
    $('#three').mousemove(function(e) {
        moveBg(e.pageX, e.pageY);
    });


    //slider

    $('.single-item').slick({
        infinite: false,
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        rows: 1,
        prevArrow: '<button class = "myPrev cursorBig" data-cursor="prev"> prev </button>',
        nextArrow: '<button class = "myNext cursorBig" data-cursor="next"> next </button>',
        responsive: [{
                breakpoint: 641,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 481,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 381,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });









    //cursor style

    var cursor = $('#cursor');





    $('.hoverLink').hover(function() {
        $('#cursor').addClass('whiteCursor');
    }, function() {
        $('#cursor').removeClass('whiteCursor');
    })

    $('.hoverElement').hover(function() {
        $('#cursor').addClass('whiteCursor');
    }, function() {
        $('#cursor').removeClass('whiteCursor');
    })
    $('.cursorBig').hover(function() {
        var data = $(this).data("cursor");
        $(cursor)
            .removeClass('whiteCursor')
            .addClass('show')
            .text(data);
    }, function() {
        $(cursor)
            .removeClass('show')
            .text('');
    })

    $(document).mousemove(function(e) {
        var cursorWidt = $(cursor).width();
        $(cursor).css({
            'left': e.pageX - cursorWidt / 2 + 'px',
            'top': e.pageY - cursorWidt / 2 + 'px'
        })

    })





})
$(function() {
    //mask phone
    $("#phoneNumber").mask("+38(999) 999 9999");
    //validate form
    $("#feedbackForm").validate({
        rules: {
            name: {
                required: true,
                minlength: 3
            },
            phone: {
                required: true
            }
        },
        messages: {
            name: {
                required: "Поле 'Имя' обязательно к заполнению",
                minlength: "Введите не менее 3-х символов в поле 'Имя'"
            },
            phone: {
                required: "Поле 'Телефон' обязательно к заполнению",
            }
        }
    });
    //burger
    $(".burger").on("click", function(){
        $(this).toggleClass("cross");
        $(".mobile-menu").toggleClass("show");
    })
})
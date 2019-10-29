$(function(){
   if($(window).width() < 768){
   	$(".wow").removeClass('wow');
   }
   new WOW().init({
   	mobile: false
   });


   $(".burger").on("click", function(){
   	$(".mobile-menu").toggleClass('show');
   	$(this).toggleClass('cross');
   })

   $("select").select2();
   

})


$(function(){
    $('.navbar-gray').removeClass('active').addClass('active');

    $('.navbar-white .navbar-left a').on('click', function(){
       $('.navbar-white .navbar-left li').removeClass('active');
       $(this).parent().addClass('active');
   });
});
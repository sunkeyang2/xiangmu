$(function(){
$('.denglu>ul').on('click','li',function(){
    console.log($(this).index())
    $(this)
    .addClass('active')
    .siblings()
    .removeClass('active')
    .parent()
    .next()
    .find('li')
    .removeClass('active')
    .eq($(this).index())
    .addClass('active')

    
    
    
}    
)})
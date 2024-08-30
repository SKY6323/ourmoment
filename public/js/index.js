$(function(){
    $('.index').animate({opacity:'1'}, 2000)
})

//이미지 뜬 후 intro로 이동
setTimeout(function(){
    window.location.href='intro.html'
}, 3000)

//화면 너비가 1024px 이상이면 바로 main으로 이동
$(function(){
    var screenWidth = $(window).width();

    if(screenWidth >= 1024){
        window.location.href='main.html'
    }
})
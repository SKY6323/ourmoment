//메뉴 열기
$('.btn_menu').on('click', function(){
    $('.menu_area').addClass('on')
    $('.menu_area').animate({
        right: '0'
    }, 500)
})

//메뉴 닫기
$('.btn_Mback').on('click', function(){
    setTimeout(function(){
        $('.menu_area').removeClass('on')
    $('.menu_bg').removeClass('on')
    },500)
    $('.menu_bg').animate({
        opacity: '0'
    })
    $('.menu_area').animate({
        right: '-100%'
    }, 500)
})

//로고 클릭 시 main 이동
$('.title_area > .title').on('click', function(){
    window.location.href='main.html'
})

//로그인 버튼 클릭 시 이동
$('.login_location').on('click', function() {
    window.location.href='login.html'
  })

//파일 선택 시 span 내용이 파일명으로 바뀌기
$('.image').on('change',function(){
    var fileName = $(this).val();
    $('.image_upload > span').text(fileName)
})

//로그인
$('#btnLogin').on('click', function(){
    let loginEmail = $('#email').val();
    let loginPwd = $('#pwd').val();


    firebase.auth().signInWithEmailAndPassword(loginEmail, loginPwd).then((result)=>{
        //console.log(result.user)
        //로그인 정보 저장
        localStorage.setItem('user', JSON.stringify(result.user));

        //로그인 이후 창 이동
        window.location.href='main.html'
    })
})

//유저정보 확인
let localUser = localStorage.getItem('user');

//유저 이름 기입
if(localUser){
    let displayName = JSON.parse(localUser).displayName;
    $('.displayName').text(displayName)
    $('.displayName').addClass('on')

    let profileImg = JSON.parse(localUser).photoURL;
    $('.profileImg').addClass('on')
    $('.profileImg > img').attr('src', profileImg)
    console.log(profileImg)
}

//유저 확인이 안되면 나의 페이지 막기
$('.myPage').on('click',function(e){
    e.preventDefault();

    if(localUser == null){
        alert('사용자 정보가 없습니다.\n로그인 또는 회원가입 후 이용해주세요.')
        window.location.href = 'login.html'
    }else{
    window.location.href = 'myMain.html'
}
})

//로그아웃
$('#btnLogout').on('click',function(){
    localStorage.removeItem('user');
    alert('로그아웃 되었습니다.');
    window.location.href ='main.html'
})
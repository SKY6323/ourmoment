//구글 인증 기능 추가
var provider = new firebase.auth.GoogleAuthProvider();

//구글 로그인
$('#loginGoogle').on('click', function(){
    firebase.auth().signInWithPopup(provider).then(function(result){
        var user = result.user;
        window.location.href = 'main.html'

    }).catch(function(error){
        console.log('실패사유는', error)
    })
})
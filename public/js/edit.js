const db = firebase.firestore()
const storage = firebase.storage()

let queryString = new URLSearchParams(window.location.search);
let momentId = queryString.get('id')

db.collection('moment').doc(momentId).get().then((result)=>{
    $('#title').val(result.data().title);
    $('#content').val(result.data().content);
})

//순간 수정
$('#send').on('click',function(){
    let chageMoment = {
        title: $('#title').val(),
        content: $('#content').val()
    }

    db.collection('moment').doc(momentId).update(chageMoment).then(()=>{
        alert('순간을 수정했습니다.')
        window.location.href = 'main.html'
    }).catch((error)=>{
        console.log('문서 업데이트 중 에러 발생:', error)
    })
})

$('#back').on('click', function(){
    window.location.href='main.html'
})
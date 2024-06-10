const db = firebase.firestore();
const storage = firebase.storage();

$('#send').on('click', function(){
    let file = document.querySelector('#image').files[0];
    let storageRef = storage.ref(); //스토리지 주소
    let storagePath = storageRef.child('image/' + file.name);// 이미지 경로
    let uploadImg = storagePath.put(file);//업로드 파일

    uploadImg.on('state_changed',
        null,
        (error)=>{
            alert('오류가 발생했습니다.\n오류 코드:'. error)
        },
        ()=>{
            uploadImg.snapshot.ref.getDownloadURL().then((url)=>{
                let localUser = localStorage.getItem('user');

                if(localUser){
                    let user = JSON.parse(localUser)

                    let uploadlist={
                        title: $('#title').val(),
                        content: $('#content').val(),
                        date: new Date(),
                        image: url,
                        uid: user.uid,
                        displayName: user.displayName
                    }

                    db.collection('moment').add(uploadlist).then((result)=>{
                        alert('순간을 남겼습니다.📌');
                        window.location.href='main.html'
                    }).catch((error)=>{
                        alert('오류가 발생했습니다.\n오류 코드:'. error)
                    })
                }else{
                    alert('사용자 정보가 없습니다.\n로그인 또는 회원가입 후 이용해주세요.')
                    window.location.href = 'login.html'
                }
            })
        }
    )}
)
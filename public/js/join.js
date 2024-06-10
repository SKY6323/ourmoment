const auth = firebase.auth();
const storage = firebase.storage();

// 사용자 프로필 사진 URL 업데이트 함수
function updateProfileInfo(photoURL, displayName) {
    auth.currentUser.updateProfile({
        photoURL: photoURL,
        displayName: displayName
    }).then(() => {
        // 프로필 정보 업데이트 성공
        console.log('프로필 정보가 업데이트되었습니다.');
    }).catch((error) => {
        // 업데이트 실패
        console.error('프로필 정보 업데이트 중 오류 발생:', error);
    });
}

// 프로필 사진 업로드 함수
$('#btnJoin').on('click', function() {
    let userName = $('#new_name').val();
    let userEmail = $('#new_email').val();
    let userPwd = $('#new_pwd').val();
    let file = document.querySelector('#new_img').files[0];
    
    // Firebase Authentication에 사용자 생성
    auth.createUserWithEmailAndPassword(userEmail, userPwd)
    .then((userCredential) => {
        // 사용자 생성 성공
        const user = userCredential.user;
        const userId = user.uid;
        
        // 프로필 사진을 Firebase Storage에 업로드
        const storageRef = storage.ref();
        const profileImagesRef = storageRef.child('profile_images/' + userId + '/' + file.name);
        profileImagesRef.put(file)
        .then((snapshot) => {
            // 업로드 완료 후 프로필 사진의 다운로드 URL 가져오기
            profileImagesRef.getDownloadURL()
            .then((url) => {
                // 다운로드 URL을 사용하여 사용자의 photoURL, 이름 업데이트
                updateProfileInfo(url, userName);
                alert('회원가입 및 프로필 사진 업로드가 완료되었습니다.');
                window.location.href='login.html'
            })
            .catch((error) => {
                console.error('프로필 사진의 다운로드 URL을 가져오는 중 오류 발생:', error);
            });
        })
        .catch((error) => {
            console.error('프로필 사진을 업로드하는 중 오류 발생:', error);
        });
    })
    .catch((error) => {
        // 사용자 생성 실패
        console.error('회원가입 중 오류 발생:', error);
    });
});
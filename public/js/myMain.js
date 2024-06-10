const db = firebase.firestore();
const storage = firebase.storage()

db.collection('moment').get().then((result)=>{
    result.forEach((doc)=>{
        if(localUser){
        let localUser = localStorage.getItem('user');
        let user = JSON.parse(localUser)
        let docId = doc.id

        if(user.displayName == doc.data().displayName){
            let list = `
        <div class="list">
            <a href="/detail.html?id=${docId}">
                <div class="cont_img" style="background-image: url('${doc.data().image}');"></div>
            </a>
        </div>
        `

        $('.list_area').append(list)
        }
    }else{
        alert('사용자 정보가 없습니다.\n로그인 또는 회원가입 후 이용해주세요.')
        window.location.href = 'login.html'
    }
    })
})
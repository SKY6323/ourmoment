const db = firebase.firestore()
const storage = firebase.storage()

let queryString = new URLSearchParams(window.location.search);
let momentId = queryString.get('id')

db.collection('moment').doc(queryString.get('id')).get().then((result)=> {
    console.log(result.data())

    let localUser = localStorage.getItem('user');
    let user = JSON.parse(localUser)

    const timestamp = result.data().date;
    const date = timestamp.toDate();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth()+1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const userName = result.data().displayName;

    //let localUser = localStorage.getItem('user');

    let detailList = `
    <div class="Dtitle_area">
        <div class="img_area">
            <div class="cont_img" style="background-image: url('${result.data().image}');"></div>
        </div>

        <div class="text_area">
            <div class="cont">
                <div class="top">
                <h3 class="title">${result.data().title}</h3>
                <div class="like"><img src="image/css/btn_like.png" alt=""></div>
                </div>

                <div class="bottom">
                <p class="content">${result.data().content}</p>
                <p class="user">남긴이: ${userName}</p>
                <p class="data">${year}.${month}.${day}</p>
                </div>
            </div>
        </div> 
    `

    $('.detail_cont').append(detailList)

    //삭제 모달 띄우기
    $('.btnDeleteOn').on('click', function(){
        if(user == null ||userName !== user.displayName ){
            alert('글 작성자가 아닙니다.')
        }else if(userName == user.displayName){
            $('.detail_modal').addClass('on')
            $('.detail_modal .modal').animate({
                opacity: '1'
            })
        }else{
            alert('글 작성자가 아닙니다.')
        }
    })
            
    //수정하기
    $('.btnModify').on('click',function(){
        if(user == null ||userName !== user.displayName ){
            alert('글 작성자가 아닙니다.')
        }else if(userName == user.displayName){
            window.location.href = '/edit.html?id='+queryString.get('id')
        }else{
            alert('글 작성자가 아닙니다.')
        }
    })

    //좋아요 버튼
    $('.like').on('click',function(){
        $(this).toggleClass('on')
        var $img = $(this).find('img')

        if($(this).hasClass('on')){
            $img.attr('src', '../image/css/btn_like2.png')
            $img.attr('alt', '좋아요')
        }else{
            $img.attr('src', '../image/css/btn_like.png')
            $img.attr('alt', '좋아요 취소')
        }
    })
})

//뒤로가기
$('.btn_back').on('click', function(){
    window.location.href='main.html'
})

//삭제 버튼(모달=예)
$('.btnDelete').on('click', function(){
    db.collection('moment').doc(momentId).delete().then(()=>{
        alert('기록을 떼어냈습니다.💌')

        $(this).closest('.list').remove();
        window.location.href='main.html'
    }).catch((error)=>{
        alert('오류가 발생했습니다.\n오류 코드:'. error)
    })
})

//삭제 버튼(모달=아니오)
$('.btn_No').on('click',function(){
    $('.detail_modal').removeClass('on')
    $('.detail_modal .modal').animate({
        opacity: '0'
    })
})
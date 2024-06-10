const db = firebase.firestore();

db.collection('moment').get().then((result)=>{
    result.forEach((doc)=>{
        let docId = doc.id
        
        let list = `
        <div class="list">
            <a href="/detail.html?id=${docId}">
                <div class="cont_img" style="background-image: url('${doc.data().image}');"></div>
            </a>
            <div class="title">${doc.data().title}
            <div class="like"><img src="image/css/btn_like.png" alt="좋아요"></div>
            </div>
        </div>
        `

        $('.list_area').append(list)
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
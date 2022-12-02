

let header = document.querySelector('header');


window.addEventListener('scroll',()=>{
    if(window.pageYOffset > 0){
        header.classList.add('active');
    }else {
        header.classList.remove('active');
    }
});






//후기 슬라이드
/*
변수 생성
slideWrapper
slideContainer
slide
prevBtn
nextBtn
currentIndex
timer(이름만 생성)
*/

let slideWrapper = document.querySelector('.slide_wrapper');
let slideContainer = document.querySelector('.slide_container');
let slide = slideContainer.querySelectorAll('li');
let slideCount = slide.length;
let prevBtn = document.querySelector('.controls i:first-child');
let nextBtn = document.querySelector('.controls i:last-child');
let currentIndex = 0;
let timer;
let btnTop = document.querySelector('.go_top');
let qnaWrapper = document.querySelectorAll('.qna_list');

//about.html의 accordian 컨텐츠
//>> accordian은 about.html에만 있으므로 별개의 js파일에 작성해 연결해주거나 html에 직접 작성해도 되지만 다른 방법으로는 한 요소이지만 all로 배열로 가져와서 1개라도 있을 때에만 작동하도록 조건문을 달아서 해주면 해당 요소가 없는 다른 html에서 에러가 나지 않는다

if(qnaWrapper.length>0){
    qnaList = qnaWrapper[0].querySelectorAll('.qna_list li');
    /*
    qnaList를 클릭하면 할일
        모든 qna_list에서 active를 제거하고
        클릭한 그 요소에만 active를 추가
    */
   for(ql of qnaList){
       ql.addEventListener('click',(e)=>{
           for(ql1 of qnaList){
               ql1.classList.remove('active');
            }
            e.currentTarget.classList.add('active');
            console.log(e);
            console.log(qnaList);
            console.log(e.currentTarget);
            
        });
    }
}







//방법1  슬라이드 left값을 이용해 가로배치
/*
슬라이드들 마다 할일
    각 슬라이드의 left값을 0, 100%, 200%, 300%...가 되도록
*/

// slide.forEach((item,idx)=>{
//     item.style.left = `${idx*100}%`;
// })


//방법2  슬라이드는 float:left, 슬라이드의 부모인 slideContainer의 너비를 li들 총 너비만큼

// console.log(slideCount);
slideContainer.style.width = `${slideCount*slideWrapper.offsetWidth}px`;
for(item of slide){
    item.style.width = `${slideWrapper.offsetWidth}px`
}



//슬라이드 이동 함수
/*
gotoSlide 함수 생성, 매개변수 idx가 들어오면
    slideContainer의 left값을 idx=0이면 ->0으로, idx=1이면 ->-100%으로, idx=2이면 ->-200%으로
    idx번호로 currentIndex 갱신
    css-slideContainer transition 0.4s
*/

function gotoSlide(idx){
    if(idx > slideCount-1){
        idx = 0;
    } else if(idx < 0){
        idx = slideCount - 1;
    }
    slideContainer.style.left = `${-idx*100}%`;
    currentIndex = idx;

}

//다음 버튼을 클릭하면 할일
/*
현재 슬라이드 번호에 +1한 숫자를 gotoSlide에 전달
만약에 마지막일 때 다음 버튼을 클릭하면 처음으로 이동
*/

nextBtn.addEventListener('click',()=>{
    // let target = (currentIndex+1)%slideCount;
    // gotoSlide(target);
    gotoSlide(currentIndex+1);

});
prevBtn.addEventListener('click',()=>{
    gotoSlide(currentIndex-1);
});

//자동 슬라이드
/*
4초마다 gotoSlide에 현재번호에 +1 하여 작동하도록
*/
function autoslide(){
    timer = setInterval(()=>{
            gotoSlide(++currentIndex);
        },4000);

}
autoslide();

/*
slideWrapper에 마우스가 들어오면 멈추고, 나가면 다시 자동슬라이드
*/

slideWrapper.addEventListener('mouseenter',()=>{
    clearInterval(timer);
});
slideWrapper.addEventListener('mouseleave',()=>{
    autoslide();
});




//go_top btn

window.addEventListener('scroll',()=>{
    if(window.pageYOffset > 300){
        btnTop.classList.add('active');
    }else{
        btnTop.classList.remove('active');
    }
});

btnTop.addEventListener('click',e=>{
    e.preventDefault();
    scrollTo({top:0,behavior:'smooth'});
});






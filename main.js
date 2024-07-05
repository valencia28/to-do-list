//유저가 값을 입력
// + 버튼 클릭 시 할일이 추가됨
//유저가 delete버튼을 클릭 시 할일 삭제
//check 버튼 누르면 할일 목록에 밑줄이 그어짐
//진행중 끝남 탭을 누르면 언더바가 이동
//끝남탭은 끝난 아이템만, 진행중탭은 진행중 목록만 보여줌
//전체탭은 전체 아이템

let taskInput = document.getElementById("task-input");
let addBtn = document.getElementById("add-btn");
let tabs = document.querySelectorAll(".tabs-area div");
let taskList = [];
let mode='all';
let filterList = [];

addBtn.addEventListener('click', addTask);


for(let i =1; i<tabs.length;i++){
    tabs[i].addEventListener("click", function(event){
        filter(event)});
}



function addTask(){
    //let taskContent = taskInput.value;
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task);
    console.log(taskList);
    render();
    taskInput.value = '';
}

//사용자가 입력한 할일 목록 화면에 그려주기
function render(){
    //1.내가 선택한 탭에 따라서 
    let list=[];
    if(mode === "all"){
        list = taskList;
    }else if(mode === "ongoing" || mode === "done"){
        list=filterList;
    }
    //2.리스트를 다르게 보여줌
    let resultHTML = '';
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="task">
                    <div class="task-done">${list[i].taskContent}</div>
                    <div class="btn-area">
                        <button onclick="toggleComplete('${list[i].id}')" class="task-btn check">
                            <i class="fa-solid fa-rotate-left"></i>
                        </button>
                        <button onclick="deleteTask('${list[i].id}')" class="task-btn delete">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>                    
                </div>`
        }else{
            resultHTML += `<div class="task">
                    <div>${list[i].taskContent}</div>
                    <div class="btn-area">
                        <button onclick="toggleComplete('${list[i].id}')" class="task-btn check">
                            <i class="fa-solid fa-check"></i>
                        </button>
                        <button onclick="deleteTask('${list[i].id}')" class="task-btn delete">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>                    
                </div>`
        }        
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

//사용자가 입력한 목록 객체 내 랜덤 고유한 아이디 번호 생성 함수
function randomIDGenerate(){
    return '_' + Math.random().toString(36).substring(2, 9);
}

function toggleComplete(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    console.log(taskList)
    //render();
    filter({ target: { id: mode } }); // Apply current filter mode
}

function deleteTask(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
    }
    filter({ target: { id: mode } });
    //render();
}


function filter(event){
    mode = event.target.id;
    console.log(mode);
    filterList = [];
    if(mode === "all"){
        //전체 리스트 보여주기
        render();
    }else if(mode === "ongoing"){
        //진행중 아이템 보여주기
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            }
        }
        render();
    }else if(mode === "done"){
        //끝난 아이템 보여주기
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}

//메뉴 탭 밑줄 슬라이딩 애니메이션
let underline = document.getElementById("underline");
let underlineTabs = document.getElementsByClassName("tabs");

Array.from(underlineTabs).forEach(menu=>menu.addEventListener("click",(e)=>underlineIndicator(e)));

function underlineIndicator(e){
    underline.style.left = e.currentTarget.offsetLeft + "px";
    underline.style.width = e.currentTarget.offsetWidth + "px";
    underline.style.top = 
    e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";

}

//엔터키 누를때도 입력하는 함수
let input = document.getElementById("task-input");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("add-btn").click();
  }
});
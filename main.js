//유저가 값을 입력
// + 버튼 클릭 시 할일이 추가됨
//유저가 delete버튼을 클릭 시 할일 삭제
//check 버튼 누르면 할일 목록에 밑줄이 그어짐
//진행중 끝남 탭을 누르면 언더바가 이동
//끝남탭은 끝난 아이템만, 진행중탭은 진행중 목록만 보여줌
//전체탭은 전체 아이템

let taskInput = document.getElementById("task-input");
let addBtn = document.getElementById("add-btn");
let taskList = [];

addBtn.addEventListener('click', addTask);

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
}

//사용자가 입력한 할일 목록 화면에 그려주기
function render(){
    let resultHTML = '';
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].isComplete == true){
            resultHTML += `<div class="task">
                    <div class="task-done">${taskList[i].taskContent}</div>
                    <div class="btn-area">
                        <button onclick="toggleComplete('${taskList[i].id}')" class="task-btn check">
                            <i class="fa-solid fa-rotate-left"></i>
                        </button>
                        <button onclick="deleteTask('${taskList[i].id}')" class="task-btn delete">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>                    
                </div>`
        }else{
            resultHTML += `<div class="task">
                    <div>${taskList[i].taskContent}</div>
                    <div class="btn-area">
                        <button onclick="toggleComplete('${taskList[i].id}')" class="task-btn check">
                            <i class="fa-solid fa-check"></i>
                        </button>
                        <button onclick="deleteTask('${taskList[i].id}')" class="task-btn delete">
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
    render();
}

function deleteTask(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
    }
    render();
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
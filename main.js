//유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가된다
// delete 버튼을 누르면 할일이 삭제된다
// check버튼을 누르면 할일이 끝나면서 밑즐이 그어진다
//1.check 버튼을 클릭하는 순간 truw false
//2. true이면 끝난 것으로 간주하고 밑줄 보여주기
//3. false이면  안끝난것으로 간주하고 그대로

// 진행중 끝난 탭을 누르면, 언더바가 이동한다
// 끝난탭은, 끝난 아이템만, 진행중 탭은 진행중인 탭만 
// 전체탬을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
//console.log(taskInput);
let addButton = document.getElementById("add-button");
//console.log(addButton);
let tabs = document.querySelectorAll(".task-tabs div");
let list = [];
let mode='all'; 
//기본설정을 all로 설정
addButton.addEventListener("click",addTask);

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){
        filter(event);
    })
}
console.log(tabs);


function addTask(){
    //   console.log("clicked");
    //let taskContent = ;
    let task = {
        id:randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete:false,
    }

    
    list.push(task);
    console.log(list);
    render();
}

function render(){
    //1. 내가 선택한 탭에 따라서
    list = [];
    if (mode === "all"){
        list = list;
    }else if (mode ==="ongoing"){
        list = list;
    }
    //2. 리스트를 달리 보여준다
    //all 경우 list를
    //ongoing, done 경우  filterList글 보여준다
    let resultHTML = '';
    for (let i = 0; i < list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')">Check</button>
                    <button onclick="deleteTask('${list[i].id}')">Delete</button>
                </div>         
        </div>`;
        }else{
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')">Check</button>
                    <button onclick="deleteTask('${list[i].id}')">Delete</button>
                </div>         
        </div>`; 
        }
        // resultHTML += `<div class="task">
        //     <div>${list[i].taskContent}</div>
        //         <div>
        //             <button onclick="toggleComplete('${list[i].id}')">Check</button>
        //             <button>Delete</button>
        //         </div>         
        // </div>`;   
    }
    document.getElementById("task-board").innerHTML = resultHTML;
    }

    function toggleComplete(id) {
        //console.log("check 됐음",id);
        for(let i = 0; i<list.length; i++){
            if(list[i].id == id){
                list[i].isComplete = !list[i].isComplete;
                break;
                }
            }
            render();
            console.log(list);
    }
    
    function deleteTask(id){
        //console.log("삭제하다", id);
        for(let i=0; i<list.length; i++) {
            if(list[i].id == id){
                list.splice(i,1);
                break;
            }
        }
        //console.log(list);
        render();
        //값을 삭제하면 render 함수로 ui도 변경해야 한다
    }

    function filter(event){
        //console.log("filter",event.target.id);
        mode = event.target.id
        list = []
        if(mode === "all"){
            //전체 리스트를 보여준다
            render();
        }else if(mode === "ongoing"){
            //진행중이 아이템을 보여준다
            //task.isComplete=false
            for(let i=0; i<list.length; i++){
                if(list[i].isComplete===false){
                    list.push(list[i])
                }
                    
            }
            render();
            console.log("진행중", list);
        }else if(mode === "done"){
            //끝나는 케이스
            //task.isComplete=true
        }
    }
    

    function randomIDGenerate(){
        return '_' + Math.random().toString(36).substr(2, 9);
        //generate random ID javascript에서 가져옴
    }
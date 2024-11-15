const inputItem=document.getElementById('todo-input');
const add=document.getElementById('todo-add-btn');
const items=document.getElementById('todo-items')


function displayTodoItems(todoItem){
    console.log(todoItem); 
        const list=document.createElement('li')
        const checkbox=document.createElement('input')
        checkbox.type='checkbox';
        const para=document.createElement('p')
        const divCon=document.createElement('div')
        checkbox.style.cssText="width:1.5em"
        if(todoItem.ischecked){
            checkbox.checked=true
        }
        else{
            checkbox.checked=false
        }
        divCon.style.cssText="display:flex; gap:1em;"
        divCon.appendChild(checkbox)
        const btn=document.createElement('button')
        para.innerHTML=todoItem.todo;
        btn.innerHTML="Delete";
        console.log(list)
        
        divCon.appendChild(para)
        list.appendChild(divCon)
        list.appendChild(btn)

        list.addEventListener('change',(e)=>{
            e.preventDefault()
            checkBoxControl(list)
        })

        btn.addEventListener('click',(e)=>{
            e.preventDefault()
            deleteTodo(list)
        })
        console.log(list.firstChild.innerHTML)
        btn.style.cssText="padding: 0.3em 1em; border-radius: 1.2em; outline: none; background-color:red; color:white; border:2px solid red;";
        list.setAttribute("class","itemsList")
        items.appendChild(list)
}

window.addEventListener('load',(e)=>{
    JSON.parse(localStorage.getItem("items"))?.map((item)=>{
        displayTodoItems(item)
    })
})

add.addEventListener('click',(e)=>{
    e.preventDefault();
    let todo=inputItem.value.trim();
    if(todo){
        let locItems=JSON.parse(localStorage.getItem("items"))
        console.log(locItems);
        const exists=locItems?.find((item)=>item.todo===todo)
        if(exists){
            window.alert("Already exists")
            inputItem.value=""
            return
        }
        let todoItem={
            todo,
            ischecked:false
        }
        if(locItems){
            locItems.push(todoItem)
            localStorage.setItem("items",JSON.stringify(locItems))
        }
        else{
            let item=[]
            item.push(todoItem)
            localStorage.setItem("items",JSON.stringify(item))
        }
        displayTodoItems(todoItem)
        inputItem.value=""
    }
})

function deleteTodo(list){
    let items=JSON.parse(localStorage.getItem("items"))
    let localIndex=items.findIndex((ele)=>ele.todo===list.querySelector('div > p').innerHTML)
    items.splice(localIndex,1)
    localStorage.setItem("items",JSON.stringify(items))
    list.remove()
}

function checkBoxControl(list){
    console.log(list);
    
    let items=JSON.parse(localStorage.getItem("items"))
    console.log(items);
    
    let localIndex=items.findIndex((ele)=>ele.todo===list.querySelector('div > p').innerHTML)
    console.log(localIndex);
    console.log(items[localIndex]);
    if(localIndex!==-1){
        items[localIndex].ischecked=!items[localIndex].ischecked;
    }

    localStorage.setItem("items",JSON.stringify(items))
}


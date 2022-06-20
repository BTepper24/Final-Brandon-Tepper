
// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");



// Class names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";



// Variables
let LIST, id;



// gets the item from local storage
let data = localStorage.getItem("TODO");



// this checks if data is not empty
if(data){
   LIST = JSON.parse(data);
   id = LIST.length; // set the id to the last one in the list
   loadList(LIST); // load the list to the user interface
}else{
   // if the data isn't empty
   LIST = [];
   id = 0;
}



// this loads items to the user's interface
function loadList(array){
   array.forEach(function(item){
       addToDo(item.name, item.id, item.done, item.trash);
   });
}



// this clears the local storage
clear.addEventListener("click", function(){
   localStorage.clear();
   location.reload();
});



// Show today's date
const options = {weekday: "long", month:"short", day:"numeric"};
const today = new Date();



dateElement.innerHTML = today.toLocaleDateString("en-US", options);



// add to do function



function addToDo(toDo, id, done, trash){



   if(trash){ return; }



   const DONE = done ? CHECK : UNCHECK;
   const LINE = done ? LINE_THROUGH : "";



   const item = `<li class="item">
                   <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                   <p class="text ${LINE}">${toDo}</p>
                   <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                 </li>`;



   const position = "beforeend";



   list.insertAdjacentHTML(position, item);
}



// add an item to the list user the enter key
document.addEventListener("keyup",function(even){
   if(event.keyCode == 13){
       const toDo = input.value;



       // if the input isn't empty
       if(toDo){
           addToDo(toDo, id, false, false);



           LIST.push({
               name : toDo,
               id : id,
               done : false,
               trash : false
           });



           // this code adds to the local storage
           localStorage.setItem("TODO", JSON.stringify(LIST));



           id++;
       }
       input.value = "";
   }
});

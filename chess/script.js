function setup(){ let i=0;
const blackMajorPieces = ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"];


for(i=1;i<=16;i++){
let piece=document.getElementById('c'+i);
const span=document.createElement('span');
   let t=i;
if (i>8){
span.className="bp"
span.id="b"+t;

span.innerText="♟";
piece.appendChild(span);
}
else{
    
span.innerText=blackMajorPieces[i-1];
span.className="bp"
span.id="b"+t;
piece.appendChild(span);
}

}


//for white
for(i=49;i<=64;i++){
let piece=document.getElementById('c'+i);
const span=document.createElement('span');
   let t=i;
if (i<=56){
span.className="wp"
span.id="w"+t;
span.onclick = function () { pawn(this.id.slice(1)); };
span.innerText="♟";
piece.appendChild(span);
}
else{
    
span.innerText= blackMajorPieces[i-57];
span.className="wp";
span.id="w"+t;
piece.appendChild(span);
}

}

}
 let arr=new Array(8);
  arr = new Array(8).fill(0);

function pawn(id){
    let t = parseInt(id);
 
  
     let old = document.getElementsByClassName("psw");
     while (old.length > 0) {
    old[0].remove();  
  }
  let allBlackPieces = document.getElementsByClassName("bp");
  for (let i = 0; i < allBlackPieces.length; i++) {
    allBlackPieces[i].style.color = "black";
  }
//to check if any piece can be captured
let col = (t - 1) % 8;

if (col > 0) { // has a left diagonal
  let leftDiag = t - 9;
  let testcell = document.getElementById('c' + leftDiag);
  if (
    testcell &&
    testcell.childElementCount > 0 &&
    testcell.firstElementChild.classList.contains("bp")
  ) {
    testcell.firstElementChild.style.color = "red";
  }
}

if (col < 7) { // has a right diagonal
  let rightDiag = t - 7;
  let testcell = document.getElementById('c' + rightDiag);
  if (
    testcell &&
    testcell.childElementCount > 0 &&
    testcell.firstElementChild.classList.contains("bp")
  ) {
    testcell.firstElementChild.style.color = "red";
    testcell.firstElementChild.onclick= function () { pawnreplace(rightDiag,this.id.slice(1)); };
  }
}

//to check if their are any pieces ahead
  let v1=t-8;
let testcell=document.getElementById('c'+v1);
if(testcell.childElementCount>0){
    return;
}



  if(arr[id-49]==0){
    for(let i=1;i<=2;i++){
   let v=t-8*i;
let cell= document.getElementById('c'+v);
if (!cell) continue; 
const span=document.createElement('span');
span.className="psw";
span.id="psw"+v;
span.onclick = function () { pawnmove(this.id.slice(3),t); };
span.innerText = "⚪";
cell.appendChild(span);
    }
  }
  else{
    let i=1;
   let v=t-8*i;
let cell= document.getElementById('c'+v);

const span=document.createElement('span');
span.className="psw";
span.id="psw"+v;
span.onclick = function () { pawnmove(this.id.slice(3),t); };
span.innerText = "⚪";
cell.appendChild(span);
  
}

}


function pawnreplace(replace, initial) {
  let start = parseInt(initial);
  let move = parseInt(replace);

  let startPiece = document.getElementById('w' + start);
  let endCell = document.getElementById('b' + move);

 
  if (endCell.firstElementChild) {
    endCell.removeChild(endCell.firstElementChild);
  }

  endCell.append(startPiece);
  startPiece.id = 'w' + move;
}

function pawnmove(id,initial){
let start = parseInt(initial); 
let move = parseInt(id);
arr[id-49]++;
  let old = document.getElementsByClassName("psw");
     while (old.length > 0) {
    old[0].remove();  
  }
  let startCell=document.getElementById('w'+start);
let endCell=document.getElementById('c'+move);
endCell.append(startCell);
startCell.id = 'w' + (move);
}
let MajorPieces = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];


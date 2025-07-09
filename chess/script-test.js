function setup() {
  const blackMajorPieces = ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"];
  const MajorPieces = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];

 
  for(let i = 1; i <= 16; i++) {
    let pieceCell = document.getElementById('c' + i);
    const span = document.createElement('span');
    
    if (i > 8) {
      span.className = "bp";
      span.id = `b${i}_pawn`;
      span.innerText = "♟";
      span.onclick = function () { bpawn(this.id); };
    } else {
      span.className = "bp";
      span.id = `b${i}_${MajorPieces[i - 1]}`;
span.onclick = function () { identify(this.id); };
      span.innerText = blackMajorPieces[i - 1];
    }
    pieceCell.appendChild(span);
  }

  for(let i = 49; i <= 64; i++) {
    let pieceCell = document.getElementById('c' + i);
    const span = document.createElement('span');
    
    if (i <= 56) {
      span.className = "wp";
      span.id = `w${i}_pawn`;
      span.innerText = "♟";
      span.onclick = function () { pawn(this.id); };
    } else {
      span.className = "wp";
      span.id = `w${i}_${MajorPieces[i - 57]}`;
      span.innerText = blackMajorPieces[i - 57];
      span.onclick = function () { identify(this.id); };
    }
    pieceCell.appendChild(span);
  }
}
//for black pawn
let barr = new Array(8).fill(0);
function bpawn(id){
  let p = id.split("_")[0];  
  let t = parseInt(p.slice(1));  
let type = document.getElementById('c'+t);
console.log("hello");
 if (barr[t-9] === -1) return;

  let oldw = document.getElementsByClassName("psw");
  while (oldw.length > 0) {
    oldw[0].remove();
  }
 let oldb = document.getElementsByClassName("bsw");
  while (oldb.length > 0) {
    oldb[0].remove();
  }
  // Reset black pieces colors to black
  let allBlackPieces = document.getElementsByClassName("bp");
  for (let i = 0; i < allBlackPieces.length; i++) {
    allBlackPieces[i].style.color = "black";
  }
  let allWhitePieces = document.getElementsByClassName("wp");
  for (let i = 0; i < allWhitePieces.length; i++) {
    allWhitePieces[i].style.color = "white";
  }

  
  let col = (t - 1) % 8;
  console.log(col);

  if (col > 0) { 
    let leftDiag = t + 7;
    let testcell = document.getElementById('c' + leftDiag);
    if (
      testcell &&
      testcell.childElementCount > 0 &&
      testcell.firstElementChild.classList.contains("wp")
    ) {
      testcell.firstElementChild.style.color = "red";
      testcell.firstElementChild.onclick = function () { bpawnreplace(leftDiag, t); };
    }
    
  }

  if (col < 7) { 
    let rightDiag = t + 9;
    let testcell = document.getElementById('c' + rightDiag);
    if (
      testcell &&
      testcell.childElementCount > 0 &&
      testcell.firstElementChild.classList.contains("wp")
    ) {
      testcell.firstElementChild.style.color = "red";
      testcell.firstElementChild.onclick = function () { bpawnreplace(rightDiag, t); };
    }
  }

  // Check if square ahead is empty
  if (barr[t - 9] >1) {
  let forwardCellIndex = t + 8;
  let forwardCell = document.getElementById('c' + forwardCellIndex);
  if (forwardCell && forwardCell.childElementCount > 0) {
    return;
  }
  }
  else{
    for(let c=0;c<2;c++){

  let forwardCellIndex = t + 8;
  let forwardCell = document.getElementById('c' + forwardCellIndex);
  if (forwardCell && forwardCell.childElementCount > 0) {
    return;
  }
  }
}

 if (barr[t - 9] === 0) {
    for (let i = 1; i <= 2; i++) {
      let v = t + 8 * i;
      let cell = document.getElementById('c' + v);
       if (!cell || cell.childElementCount > 0) break;
      if (!cell) continue;
      const span = document.createElement('span');
      span.className = "bsw";
      span.id = "bsw" + v;
      span.onclick = function () { bpawnmove(v, t); };
      span.innerText = "⚫";
      cell.appendChild(span);
    }
  } else { 
    let v = t + 8;
    let cell = document.getElementById('c' + v);
     
    if (cell) {
      const span = document.createElement('span');
      span.className = "bsw";
      span.id = "bsw" + v;
      span.onclick = function () { bpawnmove(v, t); };
      span.innerText = "⚫";
      cell.appendChild(span);
    }
  } 


  }
 
 
function bpawnmove(move, initial){

  let start = parseInt(initial);
  let end = parseInt(move);

  barr[start - 9]++;

  // Remove old move indicators
  let old = document.getElementsByClassName("psw");
  while (old.length > 0) {
    old[0].remove();
  }
  let oldb = document.getElementsByClassName("bsw");
  while (oldb.length > 0) {
    oldb[0].remove();
  }
   let allWhitePieces = document.getElementsByClassName("wp");
  for (let i = 0; i < allWhitePieces.length; i++) {
    allWhitePieces[i].style.color = "white";
  }
   for (let i = 0; i < allWhitePieces.length; i++) {
  let piece = allWhitePieces[i];
  let id = piece.id;

  if (id.endsWith("_pawn")) {
    piece.onclick = function () { pawn(this.id); };
  } else {
    piece.onclick = function () { identify(this.id); };
  }
}
   

  // Move piece span from old to new cell
  let startPiece = document.getElementById(`b${start}_pawn`);
  let endCell = document.getElementById('c' + end);
  
  if (!startPiece || !endCell) return; 

  endCell.appendChild(startPiece);
  
  startPiece.id = `b${end}_pawn`;

}
function bpawnreplace(replace, initial) {
  let start = parseInt(initial);
  let move = parseInt(replace);
let old = document.getElementsByClassName("psw");
  while (old.length > 0) {
    old[0].remove();
  }
  let oldb = document.getElementsByClassName("bsw");
  while (oldb.length > 0) {
    oldb[0].remove();
  }


  // Reset black pieces 


  let startPiece = document.getElementById(`b${start}_pawn`);
  let endCell = document.getElementById('c' + move);
  let fix="nothing";
if(move>=56&&move<=64){
let choose = prompt("what do you want to choose:\n1.knight\n2.rook\n3.bishop\n4.queen");
  fix=choose;
  if(choose==="knight"){
startPiece.innerText="♞";
startPiece.onclick=function(){identify(this.id);};

}
if(choose==="rook"){
  startPiece.innerText="♜";
  startPiece.onclick=function(){identify(this.id);};
}
if(choose==="bishop"){
  startPiece.innerText="♝";
startPiece.onclick=function(){identify(this.id);};
}
if(choose==="queen"){
  startPiece.innerText="♛";
  startPiece.onclick=function(){identify(this.id);};
}

}
  if (!startPiece || !endCell) return; 
  
  if (endCell.firstElementChild) {
    endCell.removeChild(endCell.firstElementChild);
  }
if (fix !== "nothing") {
  barr[start - 9] = -1; // Mark this piece as promoted
}

  endCell.appendChild(startPiece);
  if(fix!="nothing"){
  startPiece.id = `b${move}_${fix}`;
}
else{
  startPiece.id = `b${move}_pawn`;
}
 
}


let arr = new Array(8).fill(0);

function pawn(id) {


    if (!id.endsWith("_pawn")) return;
  let p = id.split("_")[0];  
  let t = parseInt(p.slice(1));  
let type = document.getElementById('c'+t);
if (arr[t - 49] === -1) return;
let oldb = document.getElementsByClassName("bsw");
  while (oldb.length > 0) {
    oldb[0].remove();
  }
  // Remove old move indicators
  let old = document.getElementsByClassName("psw");
  while (old.length > 0) {
    old[0].remove();
  }

  // Reset black pieces colors to black
    let allBlackPieces = document.getElementsByClassName("bp");
for (let i = 0; i < allBlackPieces.length; i++) {
  let piece = allBlackPieces[i];
  let id = piece.id;
  allBlackPieces[i].style.color = "black";

  if (id.endsWith("_pawn")) {
    piece.onclick = function () { bpawn(this.id); };
  } else {
    piece.onclick = function () { identify(this.id); };
  }
}
  

  
  let col = (t - 1) % 8;

  if (col > 0) { 
    let leftDiag = t - 9;
    let testcell = document.getElementById('c' + leftDiag);
    if (
      testcell &&
      testcell.childElementCount > 0 &&
      testcell.firstElementChild.classList.contains("bp")
    ) {
      testcell.firstElementChild.style.color = "red";
      testcell.firstElementChild.onclick = function () { pawnreplace(leftDiag, t); };
    }
  }

  if (col < 7) { 
    let rightDiag = t - 7;
    let testcell = document.getElementById('c' + rightDiag);
    if (
      testcell &&
      testcell.childElementCount > 0 &&
      testcell.firstElementChild.classList.contains("bp")
    ) {
      testcell.firstElementChild.style.color = "red";
      testcell.firstElementChild.onclick = function () { pawnreplace(rightDiag, t); };
    }
  }
 


  // Check if square ahead is empty

    if (arr[t - 49] === 0) {
  for (let i = 1; i <= 2; i++) {
    let v = t - 8 * i;
    let cell = document.getElementById('c' + v);
    if (!cell || cell.childElementCount > 0) break;
    const span = document.createElement('span');
    span.className = "psw";
    span.id = "psw" + v;
    span.onclick = function () { pawnmove(v, t); };
    span.innerText = "⚪";
    cell.appendChild(span);
  }
} else { 
  let v = t - 8;
  let cell = document.getElementById('c' + v);
  if (cell && cell.childElementCount === 0) {
    const span = document.createElement('span');
    span.className = "psw";
    span.id = "psw" + v;
    span.onclick = function () { pawnmove(v, t); };
    span.innerText = "⚪";
    cell.appendChild(span);
  }
}

  }
 



function pawnmove(move, initial) {
  let start = parseInt(initial);
  let end = parseInt(move);
 // Reset black pieces colors to black
     let allBlackPieces = document.getElementsByClassName("bp");
for (let i = 0; i < allBlackPieces.length; i++) {
  let piece = allBlackPieces[i];
  let id = piece.id;
  allBlackPieces[i].style.color = "black";

  if (id.endsWith("_pawn")) {
    piece.onclick = function () { bpawn(this.id); };
  } else {
    piece.onclick = function () { identify(this.id); };
  }
}
  arr[start - 49]++;

  // Remove old move indicators
  let old = document.getElementsByClassName("psw");
  while (old.length > 0) {
    old[0].remove();
  }
  let oldb = document.getElementsByClassName("bsw");
  while (oldb.length > 0) {
    oldb[0].remove();
  }
   
   

  // Move piece span from old to new cell
  let startPiece = document.getElementById(`w${start}_pawn`);
  let endCell = document.getElementById('c' + end);
  
  if (!startPiece || !endCell) return; 

  endCell.appendChild(startPiece);
  
  startPiece.id = `w${end}_pawn`;
 let pre = end;  
 
  
 
}

function pawnreplace(replace, initial) {
  let start = parseInt(initial);
  let move = parseInt(replace);
  
  for(let i=9;i<=16;i++){
let fixer=document.getElementById(`b${i}_pawn`);
if(fixer){
  console.log("okay");
  fixer.onclick=function () { bpawn(this.id); };
}

  }
   //if (!initial.toString().includes("_pawn")) return;
let old = document.getElementsByClassName("psw");
  while (old.length > 0) {
    old[0].remove();
  }

  // Reset black pieces 
 let allBlackPieces = document.getElementsByClassName("bp");
for (let i = 0; i < allBlackPieces.length; i++) {
  let piece = allBlackPieces[i];
  let id = piece.id;
  allBlackPieces[i].style.color = "black";

  if (id.endsWith("_pawn")) {
    piece.onclick = function () { bpawn(this.id); };
  } else {
    piece.onclick = function () { identify(this.id); };
  }
}

  let startPiece = document.getElementById(`w${start}_pawn`);
  let endCell = document.getElementById('c' + move);
  let fix="nothing";

if(move>=1&&move<=8){
let choose = prompt("what do you want to choose:\n1.knight\n2.rook\n3.bishop\n4.queen");
  fix=choose;

  if(choose==="knight"){
startPiece.innerText="♞";
startPiece.onclick=function(){identify(this.id);};

}
if(choose==="rook"){
  startPiece.innerText="♜";
  startPiece.onclick=function(){identify(this.id);};
}
if(choose==="bishop"){
  startPiece.innerText="♝";
startPiece.onclick=function(){identify(this.id);};
}
if(choose==="queen"){
  startPiece.innerText="♛";
  startPiece.onclick=function(){identify(this.id);};
}

}
  if (!startPiece || !endCell) return; 
  
  if (endCell.firstElementChild) {
    endCell.removeChild(endCell.firstElementChild);
  }
  if (fix !== "nothing") {
  arr[start - 49] = -1;  // Mark as non-pawn after promotion
}


  endCell.appendChild(startPiece);
  if(fix!="nothing"){
  startPiece.id = `w${move}_${fix}`;
}
else{
  startPiece.id = `w${move}_pawn`;
}
 
}
function identify(id){


  let o= id.split("_")[0].slice(1);
  console.log(o);
let piece = id.split("_")[1];  

if(piece=="knight"){
  knight(o,piece);
}
else if(piece=="bishop"){
  bishop(o,piece);
}
else if(piece=="rook"){
rook(o,piece);
}
else if(piece=="queen"){
  queen(o,piece);
}
else{
  king(o,piece);
}

}

function king(o, piece) {
  o = parseInt(o);
 for(let i=9;i<=16;i++){
let fixer=document.getElementById(`b${i}_pawn`);
if(fixer){
  console.log("okay");
  fixer.onclick=function () { bpawn(this.id); };
}

  }
  const moves = [-9, -8, -7, -1, 1, 7, 8, 9];

 
  let old = document.getElementsByClassName("psw");
  while (old.length > 0) {
    old[0].remove();
  }

  const row = Math.floor((o - 1) / 8);
  const col = (o - 1) % 8;

  for (let i = 0; i < moves.length; i++) {
    let next = o + moves[i];

    if (next < 1 || next > 64) continue;

    let nextRow = Math.floor((next - 1) / 8);
    let nextCol = (next - 1) % 8;

  
    if (Math.abs(nextRow - row) > 1 || Math.abs(nextCol - col) > 1) continue;

    const cell = document.getElementById('c' + next);
    if (!cell) continue;

    if (cell.childElementCount > 0 && cell.firstElementChild.classList.contains("wp")) {
      continue; 
    }

    if (cell.childElementCount > 0 && cell.firstElementChild.classList.contains("bp")) {
      
      cell.firstElementChild.style.color = "red";
      cell.firstElementChild.onclick = function () {
        whitemove(o, this.id.slice(1), piece);
      };
      continue;
    }

    
    const span = document.createElement("span");
    span.className = "psw";
    span.id = "psw" + next;
    span.innerText = "⚪";
    span.onclick = function () {
      whitemove(o, next, piece);
    };
    cell.appendChild(span);
  }
}




function queen(o, piece) {
   for(let i=9;i<=16;i++){
let fixer=document.getElementById(`b${i}_pawn`);
if(fixer){
  console.log("okay");
  fixer.onclick=function () { bpawn(this.id); };
}

  }
  const directions = [1, -1, 8, -8, -9, -7, 7, 9];
  o = parseInt(o);

  let old = document.getElementsByClassName("psw");
  while (old.length > 0) old[0].remove();

  for (let i = 0; i < directions.length; i++) {
    let step = directions[i];
    let current = o;

    while (true) {
      let next = current + step;

      if (next < 1 || next > 64) break;

      let currentRow = Math.floor((current - 1) / 8);
      let nextRow = Math.floor((next - 1) / 8);

   
      if ((step === 1 || step === -1) && (nextRow !== currentRow)) break;

    
      if ((step === -9 || step === -7 || step === 7 || step === 9) && Math.abs(nextRow - currentRow) !== 1) break;

      const cell = document.getElementById('c' + next);
      if (!cell) break;

      
      if (cell.childElementCount > 0 && cell.firstElementChild.classList.contains("wp")) {
        break;
      }

      
      if (cell.childElementCount > 0 && cell.firstElementChild.classList.contains("bp")) {
        cell.firstElementChild.style.color = "red";
        cell.firstElementChild.onclick = function () {
          whitemove(o, this.id.slice(1), piece);
        };
        break;
      }

     
      const span = document.createElement("span");
      span.className = "psw";
      span.id = "psw" + next;
      span.innerText = "⚪";
      span.onclick = function () {
        whitemove(o, next, piece);
      };
      cell.appendChild(span);

      current = next;
    }
  }
}


//for rook's movement indicator
function rook(o, piece) {
   for(let i=9;i<=16;i++){
let fixer=document.getElementById(`b${i}_pawn`);
if(fixer){
  console.log("okay");
  fixer.onclick=function () { bpawn(this.id); };
}

  }
  const directions = [1, -1, 8, -8];
  o = parseInt(o);

  let old = document.getElementsByClassName("psw");
  while (old.length > 0) old[0].remove();

  for (let i = 0; i < directions.length; i++) {
    let step = directions[i];
    let current = o;

    while (true) {
      let next = current + step;

      if (next < 1 || next > 64) break;

      let currentRow = Math.floor((current - 1) / 8);
      let nextRow = Math.floor((next - 1) / 8);

      
      if ((step === 1 || step === -1) && (nextRow !== currentRow)) break;

      const cell = document.getElementById('c' + next);
      if (!cell) break;

      if (cell.childElementCount > 0 && cell.firstElementChild.classList.contains("wp")) {
        break;
      }


      if (cell.childElementCount > 0 && cell.firstElementChild.classList.contains("bp")) {
        cell.firstElementChild.style.color = "red";
        cell.firstElementChild.onclick = function () {
          whitemove(o, this.id.slice(1), piece);
        };
        break;
      }

      
      const span = document.createElement("span");
      span.className = "psw";
      span.id = "psw" + next;
      span.innerText = "⚪";
      span.onclick = function () {
        whitemove(o, next, piece);
      };
      cell.appendChild(span);

      current = next;
    }
  }
}


function bishop(o, piece) {
   for(let i=9;i<=16;i++){
let fixer=document.getElementById(`b${i}_pawn`);
if(fixer){
  console.log("okay");
  fixer.onclick=function () { bpawn(this.id); };
}

  }
  const directions = [-9, -7, 7, 9];
  o = parseInt(o);


  let old = document.getElementsByClassName("psw");
  while (old.length > 0) old[0].remove();

  for (let i = 0; i < directions.length; i++) {
    let step = directions[i];
    let current = o;

    while (true) {
      let next = current + step;

     
      if (next < 1 || next > 64) break;

     
      let currentRow = Math.floor((current - 1) / 8);
      let nextRow = Math.floor((next - 1) / 8);

     
      if (Math.abs(nextRow - currentRow) !== 1) break;

      const cell = document.getElementById('c' + next);
      if (!cell) break;

      
      if (
        cell.childElementCount > 0 &&
        cell.firstElementChild.classList.contains("wp")
      ) {
        break;
      }

      
      if (
        cell.childElementCount > 0 &&
        cell.firstElementChild.classList.contains("bp")
      ) {
        cell.firstElementChild.style.color = "red";
        cell.firstElementChild.onclick = function () {
          whitemove(o, this.id.slice(1), piece);
        };
        break;
      }

      
      const span = document.createElement("span");
      span.className = "psw";
      span.id = "psw" + next;
      span.innerText = "⚪";
      span.onclick = function () {
        whitemove(o, this.id.slice(3), piece);
      };
      cell.appendChild(span);

      current = next;
    }
  }
}






//for knight
function knight(o, piece) {
   for(let i=9;i<=16;i++){
let fixer=document.getElementById(`b${i}_pawn`);
if(fixer){
  console.log("okay");
  fixer.onclick=function () { bpawn(this.id); };
}

  }
  const moves = [
    [2, 1], [2, -1], [-2, 1], [-2, -1],
    [1, 2], [1, -2], [-1, 2], [-1, -2],
  ];

  const x = Math.floor((o - 1) / 8); 
  const y = (o - 1) % 8;             

  
  let old = document.getElementsByClassName("psw");
  while (old.length > 0) {
    old[0].remove();
  }

  for (let i = 0; i < moves.length; i++) {
    const dx = moves[i][0];
    const dy = moves[i][1];

    const newX = x + dx;
    const newY = y + dy;

    // Validate bounds
    if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
      const v = newX * 8 + newY + 1;
      const cell = document.getElementById('c' + v);
      if (!cell) continue;

      const span = document.createElement('span');
      span.className = "psw";
      span.id = "psw" + v;
      if (
        cell.childElementCount > 0 &&
        cell.firstElementChild.classList.contains("wp")
      ) {
        continue; // skip this move
      }
      else if(cell.childElementCount > 0 &&
        cell.firstElementChild.classList.contains("bp")){
 cell.firstElementChild.style.color = "red";
cell.firstElementChild.onclick = function () { whitemove(o, this.id.slice(1),piece); };
      }
      else{
      span.innerText = "⚪";
      span.onclick = function () {
       whitemove(o, this.id.slice(3),piece);
      };
      cell.appendChild(span);}
    }
  }
  
}


function whitemove(o,v,piece){
let allBlackPieces = document.getElementsByClassName("bp");
for (let i = 0; i < allBlackPieces.length; i++) {
  let piece = allBlackPieces[i];
  let id = piece.id;
  allBlackPieces[i].style.color = "black";

  if (id.endsWith("_pawn")) {
    piece.onclick = function () { bpawn(this.id); };
  } else {
    piece.onclick = function () { identify(this.id); };
  }
}

  
let start = parseInt(o);
  let end = parseInt(v);
 let old = document.getElementsByClassName("psw");
  while (old.length > 0) {
    old[0].remove();
  }
 let startPiece = document.getElementById(`w${start}_${piece}`);
  let endCell = document.getElementById('c' + end);
 if (!startPiece || !endCell) return; 
  
  if (endCell.firstElementChild) {
    endCell.removeChild(endCell.firstElementChild);
  }


  endCell.appendChild(startPiece);
  startPiece.id = `w${end}_${piece}`;
  
  startPiece.onclick = function () {
  identify(`w${end}_${piece}`);
}
 
}

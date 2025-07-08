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
    } else {
      span.className = "bp";
      span.id = `b${i}_${MajorPieces[i - 1]}`;

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

let arr = new Array(8).fill(0);

function pawn(id) {
  let p = id.split("_")[0];  
  let t = parseInt(p.slice(1));  

  // Remove old move indicators
  let old = document.getElementsByClassName("psw");
  while (old.length > 0) {
    old[0].remove();
  }

  // Reset black pieces colors to black
  let allBlackPieces = document.getElementsByClassName("bp");
  for (let i = 0; i < allBlackPieces.length; i++) {
    allBlackPieces[i].style.color = "black";
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
  let forwardCellIndex = t - 8;
  let forwardCell = document.getElementById('c' + forwardCellIndex);
  if (forwardCell && forwardCell.childElementCount > 0) {
    return;
  }

  // If pawn has not moved yet, can move 2 steps
  if (arr[t - 49] === 0) {
    for (let i = 1; i <= 2; i++) {
      let v = t - 8 * i;
      let cell = document.getElementById('c' + v);
      if (!cell) continue;
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
    if (cell) {
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

  arr[start - 49]++;

  // Remove old move indicators
  let old = document.getElementsByClassName("psw");
  while (old.length > 0) {
    old[0].remove();
  }

  // Move piece span from old to new cell
  let startPiece = document.getElementById(`w${start}_pawn`);
  let endCell = document.getElementById('c' + end);

  if (!startPiece || !endCell) return; 

  endCell.appendChild(startPiece);
  startPiece.id = `w${end}_pawn`;
}

function pawnreplace(replace, initial) {
  let start = parseInt(initial);
  let move = parseInt(replace);

  // Reset black pieces 
  let allBlackPieces = document.getElementsByClassName("bp");
  for (let i = 0; i < allBlackPieces.length; i++) {
    allBlackPieces[i].style.color = "black";
  }

  let startPiece = document.getElementById(`w${start}_pawn`);
  let endCell = document.getElementById('c' + move);

  if (!startPiece || !endCell) return; 
  
  if (endCell.firstElementChild) {
    endCell.removeChild(endCell.firstElementChild);
  }


  endCell.appendChild(startPiece);
  startPiece.id = `w${move}_pawn`;
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


}
//for rook's movement indicator
function rook(o, piece) {
  const directions = [1, -1, 8, -8];
  o = parseInt(o);

  // Remove old move indicators
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
    allBlackPieces[i].style.color = "black";
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

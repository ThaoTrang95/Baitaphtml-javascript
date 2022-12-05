const VALUE_EMPTY = 1;
const VALUE_X = 2;
const VALUE_O = 3;
const DEFAULT_CELL_SIZE = 37;

class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.value = VALUE_EMPTY;
    }
    
    getCellHtml() {
        let top = this.x* DEFAULT_CELL_SIZE;
        let left = (this.y-10)* DEFAULT_CELL_SIZE;
        let cellHtml = '<div id="cell-' + this.x + '-' + this.y +'" onclick="play(' + this.x + ',' + this.y + ')" class="cell" style="left:'+ left + 'px; top:' + top +'px;"></div>';
        return cellHtml;
    }
    
    draw() {
        let cellDiv = document.getElementById("cell-" + this.x + "-" + this.y);
        switch (this.value){
            case VALUE_X:
                cellDiv.innerHTML = "X";
                cellDiv.classList.add("X");
                break;

            case VALUE_O:
                cellDiv.innerHTML = "O";
                cellDiv.classList.add("O");
                break;

            default:
                cellDiv.innerHTML = "";
                break;
        }
    }
}

class Board {
    constructor(rows, cols, elementId) {
        this.rows = rows;
        this.cols = cols;
        this.elementId = elementId;
        this.turn = VALUE_O;
        this.cells = [];
        this.isOver = false;
    }
    
    draw() {
        let gameBoardDiv = document.getElementById(this.elementId);
        gameBoardDiv.innerHTML = "";

        for(let i = 0; i < this.rows; i++){
            let row = [];
            this.cells.push(row);
            for(let j = 0; j < this.cols; j++){
                let cell = new Cell(i, j);
                row.push(cell);
                gameBoardDiv.innerHTML += cell.getCellHtml();
            }
        }
    }
   
    play(x, y) {
        
        if(this.isOver) {
            return;
        }

        let cell = this.cells[x][y];
        if(cell.value === VALUE_EMPTY){
            cell.value = this.turn;
            cell.draw();
            this.check(x, y);
            
            if(this.turn === VALUE_O){
                this.turn = VALUE_X;
                } else {
                this.turn = VALUE_O;
                }
        } else {
            alert();
            function alert(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Cell is not empty',
                })
            }
        }
        let imgp = document.getElementById("imgPlayer");
        let name=document.getElementById("name");
        if(this.turn===VALUE_X){
            imgp.style.backgroundImage = "url('Images/Xpng.png')";
            name.innerText="PLAYER WITH X";
        }else if(this.turn===VALUE_O){
            imgp.style.backgroundImage = "url('Images/Opng.png')";
            name.innerText="PLAYER WITH O"
        }
    };
    
    check(x, y) {
        let cell = this.cells[x][y];
        
        //Horizontal
        let count = 1;
        let i = 1;
        while((y + i < this.cols) && this.cells[x][y + i].value ===  cell.value){
            count++;
            i++;
        }

        i = 1;
        while((y - i >= 0) && this.cells[x][y - i].value ===  cell.value){
            count++;
            i++;
        }
        this.endGame(count);
        
        //Vertical
        count = 1;
        i = 1;
        while((x + i < this.rows) &&this.cells[x + i][y].value ===  cell.value){
            count++;
            i++;
        }
        
        i = 1;
        while((x - i >= 0) &&this.cells[x - i][y].value ===  cell.value){
            count++;
            i++;
        }
        this.endGame(count);
        
        //Left diagonal
        count = 1;
        i = 1;
        let j = 1;
        while((y + i < this.cols) && (x + i < this.rows) && this.cells[x + i][y + j].value ===  cell.value){
            count++;
            i++;
            j++;
        }
        
        i = 1;
        j = 1;
        while((x - i >= 0) && (y - j >= 0) && this.cells[x - i][y - j].value ===  cell.value){
            count++;
            i++;
            j++;
        }
        this.endGame(count);
        
        //Right diagonal
        count = 1;
        i = 1;
        j = 1;
        while((y + j < this.cols) && (x - i >= 0) && this.cells[x - i][y + j].value ===  cell.value){
            count++;
            i++;
            j++;
        }
        
        i = 1;
        j = 1;
        while((y - j >= 0) && (x + i < this.rows) &&this.cells[x + i][y - j].value ===  cell.value){
            count++;
            i++;
            j++;
        }
        this.endGame(count);
    };

    endGame(count) {
        if(count >= 5){
            this.isOver = true;
            if(this.turn===VALUE_X){
                alert1()
            } if (this.turn===VALUE_O){
                alert2()
            }
            }
            function alert1(){
                Swal.fire({
                    title: 'Congratulation!!! Player with X win',
                })
            }
            function alert2(){
                Swal.fire({
                    title: 'Congratulation!!! Player with O win',
                })
            }
        }
}

function reset(){
    if(!confirm('Do you want to reset the game')){
        return;
    }
    start();
}

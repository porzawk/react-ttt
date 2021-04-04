export function createWinnerCondition(size) {
    var winArr = [];

    //calculate horizental
    var horizentalArr=[];
    for(let i=0; i<size;i++) {
        horizentalArr = [];
        for(let j=0; j<size; j++) {
            horizentalArr.push((i*size)+j);
        }
        winArr.push(horizentalArr);
    }

    //calculate vertival
    var verticalArr=[];
    for(let i=0; i<size;i++) {
        verticalArr = [];
        for(let j=0; j<size; j++) {
            verticalArr.push(i+j*size);
        }
        winArr.push(verticalArr);
    }
    
    //calculate diagonal
    var diagonalArr=[];
    for(let i=0; i<size; i++) {
        diagonalArr.push(i*(size+1));
    }
    winArr.push(diagonalArr);

    diagonalArr=[]
    for(let i=0; i<size; i++) {
        diagonalArr.push(i*(size-1)+(size-1));
    }
    winArr.push(diagonalArr);

    localStorage.setItem('winCondition', JSON.stringify(winArr))
}

export function calculateWinner(arr,turn,size) {
    let winCondition = JSON.parse(localStorage.getItem('winCondition'));

    let checkDraw = arr.some(item=>{
        return item.value === ""
    })

    let filter = arr.filter(item=> {
        return item.value === turn
    })

    let indexArr = filter.map(item => item.index);
    let count=0, winner="";
    if(indexArr.length >= size) {
        winCondition.map(items=> {
            items.map((item)=>{
                if(indexArr.includes(item)) {
                    count++;
                }
            })
            if(count===size) {
                winner = turn;
                return;
            } else {
                count=0;
            }
        })

        if(!checkDraw && winner==="") {
            return "D";
        } else {
            return winner;
        }
    }
}
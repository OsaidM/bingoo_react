export function isInside(arr, number){

    for(let i = 0; i <arr.length; i++){
        for(let j=0; j< 5; j++){
            if (number == arr[i][j]){
                return true;
            }
        }
    }
    return false;
}

// add the rndm number to the empty arr
export function addToArr(arr){
   
    for(var i =0; i < arr.length; i++){
        while(arr[i].length < 5){
            let number = Math.floor(Math.random() * 25)+1
            if(isInside(arr, number)){
                console.log('its already there');
            }else{
                arr[i].push(number);
            }
            
        }
    }
    
}

// keep calling the add function untill it fills the empty array
// where each rndm number needs to be checked if it's inside or not
// after comparing it with each element already inside the array
export function keepAddingUntillFilled(arr){
    for(var i =0; i < arr.length; i++){
        while(arr[i].length < 5){
            addToArr(arr);
        }
    }
    return [...arr]
}

// this function draws the matrix on the page based on the rndm numbers 
// inside the matrix generated by keepAddingUntillFilled function
export function drawThatMatrix(arr, arrColor){
    var thisRow = '<tr>';
    let counter = 0;
    for(var i = 0; i < arr.length; i++){
        for(var j =0; j<arr[i].length;j++){
            thisRow += '<td style="background-color:'+arrColor[counter]+'";>' + arr[i][j] + '</td>';
            counter +=1;
        }
        thisRow += '</tr>';
        
        console.log(counter)
    }
    document.getElementById('player1').innerHTML = thisRow ;
}

// here every element i click on inside the page it changes that value to -1
// inside the array so i can track players progress and to check 
// the rows and columns and crosses
export function changeToMinus(arr,value){
    for(var i = 0; i < arr.length;i++){
        for(var j =0; j<arr[i].length; j++){
            if(arr[i][j] == value){
                arr[i][j] = -1;
                return -1;
            }
        }
    }
}


// this function to count the rows
export function countRow(arr){
    let rowCount = 0;
    for(var i =0;i < arr.length;i++){
        var counter = 0;
        for(var j=0;j < arr[i].length;j++){
            if(arr[i][j] == -1){
                counter +=1;
            }
        }
        if(counter == 5){
            rowCount += 1;
        }
    }
    return rowCount;
}



export function countColumn(arr){  // this export function still not ready trying to think of a way
                            // to count the columns together @_@, oh god how stupid i am right now because im bad at math :(
                            // update: thanks to instructor SAAD now this function is ready.
    var colCount = 0;
    for(var i =0;i < arr.length;i++){
        var counter = 0;
        for(var j=0;j < arr[i].length;j++){
            if(arr[j][i] == -1){
                counter +=1;
            }
        }
        if(counter == 5){
            colCount += 1;
            counter = 0;
        }
    }
    return colCount;
}

export function countCross(arr){ // this function counts Cross Columns
    let crossCount = 0;
    let counter = 0;
    for(let i =0;i < arr.length;i++){
        if(arr[i][i] == -1){
            counter += 1;
        }
        
        if(counter == 5){
            crossCount += 1;
        }
    }
    
    counter = 0;
    for(let i = arr.length-1, j=0; i >= 0; i--, j++){
        if(arr[j][i] == -1){
            counter += 1;
            console.log('anything',counter);
        }
        if (counter == 5){
            crossCount += 1;
        }
    }

        
    return crossCount;
}



export function openCongratsPage1(){
    window.location = 'win1.html';
}
export function winCondition(arr, bingo){
    let numberOfRows = countRow(arr);
    console.log('number of rows',numberOfRows);
    let numberOfColumns = countColumn(arr);
    console.log('number of columns',numberOfColumns);
    let numberOfCross = countCross(arr)
    let sumOfColumnsRowsCross = numberOfRows + numberOfColumns + numberOfCross;
    for(var i=0;i < sumOfColumnsRowsCross; i++){ //this way does some duplications in the HTML Page
                                                 // i suggest you use array of ones and zeros to solve that 
        if(sumOfColumnsRowsCross < 5){
            bingo[i] = '<s>' + bingo[i] + '</s>';
        }else{
            openCongratsPage1();
            break;
        }
    }

    return bingo;
}

export function startFromRNDMSart(rndmStart, setTurnStatus){
    if(rndmStart == 1){
        console.log('rndmStart: ', rndmStart);
        setTurnStatus(1);
        document.getElementsByClassName('tb2')[0].style.display = '';
        document.getElementsByClassName('tb1')[0].style.display = 'none';
    }else{
        console.log('rndmStart: ',rndmStart);
        setTurnStatus(0);
        document.getElementsByClassName('tb1')[0].style.display = '';
        document.getElementsByClassName('tb2')[0].style.display = 'none';
    }
}


// here i added an event listner to each box inside the table for the hover effect
// on MOUSEOVER and MOUSEOUT events so i can change thier effects
// 
export function addTdListners(boxesList, 
    setBoxesList,
    lastPickedValue, 
    setLastPickedValue,
    boxesCount, 
    setBoxesCount,
    bingo,
    turnStatus,
    setTurnStatus
    ){
    let x = document.getElementsByTagName("td");
    console.log(x[0]);
    
    
    // z[0].addEventListener("mouseout", function(){ document.getElementsByClassName('tb2')[0].style.opacity = ''; });
    for(let i =0; i<x.length;i++){
        x[i].addEventListener("click", function(){
            
            x = changeToMinus(boxesList, this.innerHTML);
            setLastPickedValue(this.innerHTML);
            if(Boolean(this.getAttribute("Picked"))){
                setBoxesCount(boxesCount-1)
            }
            document.getElementsByClassName('lastPickedNumber')[0].innerHTML = lastPickedValue;
            // this.innerHTML = '<s>'+ this.innerHTML +'</s>';
            this.style.opacity = '0.2'
            this.setAttribute('Picked', true);
            console.log(boxesList,'im hereeeee'); 
            let y = winCondition(boxesList, bingo);
            x = document.getElementById('bingo');
            for(let i =0; i < bingo.length; i++){
                x.innerHTML = y
            }
            
            if(boxesCount < 2 && turnStatus == 0){
                
                setBoxesCount(boxesCount+1)
                if(boxesCount == 2){
                    setTurnStatus(1);
                    document.getElementsByClassName('tb2')[0].style.display = '';
                    document.getElementsByClassName('tb1')[0].style.display = 'none';
                    setBoxesCount(0);
                    setLastPickedValue(0);
                }
            }
        },{ once: true });
        x[i].addEventListener("mouseover", function(){ this.style.backgroundColor = this.style.backgroundColor; this.style.boxShadow = '0px 0px 3px 2px black';this.style.borderRadius = '5px'});
        x[i].addEventListener("mouseout", function(){ this.style.backgroundColor = this.style.backgroundColor; this.style.boxShadow = ''; this.style.borderRadius = ''});
    }
}
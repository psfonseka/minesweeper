let arr = new Array(10);
let mines = 0;
for (var i = 0; i < arr.length; i++) {
  arr[i] = new Array(10);
  for(let k = 0; k < arr[i].length; k++) {
      let obj = {value: 0, open: false, flag: false, mine: false};
      arr[i][k] = obj;
  }
}

while (mines < 10) {
    let rRow = Math.floor(Math.random() * 10);
    let rCol = Math.floor(Math.random() * 10);
    if (arr[rRow][rCol].mine === false) {
        arr[rRow][rCol].mine = true;
        if (rRow > 0) {
            arr[rRow-1][rCol].value++;
        } if (rRow < 9) {
            arr[rRow+1][rCol].value++;
        } if (rCol > 0) {
            arr[rRow][rCol-1].value++;
        } if (rCol < 9) {
            arr[rRow][rCol+1].value++;
        } if (rRow > 0 && rCol > 0) {
            arr[rRow-1][rCol-1].value++;
        } if (rRow < 9 && rCol < 9) {
            arr[rRow+1][rCol+1].value++;
        } if (rRow > 0 && rCol < 9) {
            arr[rRow-1][rCol+1].value++;
        } if (rRow < 9 && rCol > 0) {
            arr[rRow+1][rCol-1].value++;
        }
        mines++;
    }
}

export default (state = {result: arr}, action) => {
    switch (action.type) {
     case '2D_ACTION':
      return {
       result: action.payload
      }
     default:
      return state
    }
   }
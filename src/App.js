import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import { simpleAction } from './actions/simpleAction';
import { click2DAction} from './actions/click2DAction';
import { restartAction} from './actions/restartAction';
import { faceAction} from './actions/faceAction';
import { flagsAction} from './actions/flagsAction'
import { timerAction } from './actions/timerAction';
import { timeResetAction} from './actions/timeResetAction';

const mapStateToProps = state => ({
  ...state
 })

 const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction()),
  click2DAction: (item) => dispatch(click2DAction(item)),
  restartAction: () => dispatch(restartAction()),
  faceAction: (face) => dispatch(faceAction(face)),
  flagsAction: (flags) => dispatch(flagsAction(flags)),
  timerAction: (time) => dispatch(timerAction(time)),
  timeResetAction: (time) => dispatch(timeResetAction(time))


 })

class App extends Component {

  simpleAction(event) {
    this.props.simpleAction();
    this.props.restartAction();
    this.props.faceAction("default.jpg");
    this.props.flagsAction(10);
    this.props.timeResetAction(new Date().getTime());
    for (var i = 1; i < 99999; i++) {
      window.clearInterval(i);
    }
  }

  componentDidMount() {

  }

  timer() {
    let timer = this.props.timerAction;
    let props = this.props;
    setInterval(function() {
      let seconds = 0;

      let now = new Date().getTime();
          
      let distance = now - props.timerReducer.old;
          
      seconds = Math.floor((distance % (1000 * 60)) / 1000);
      timer(seconds);
      }, 1000);
  }

  openAdjacents(arr, rRow, rCol) {
    rRow = parseInt(rRow);
    rCol = parseInt(rCol);
    if (rRow > 0) {
      arr[rRow-1][rCol].open = true;
    } if (rRow < 9) {
      arr[rRow+1][rCol].open = true;
    } if (rCol > 0) {
      arr[rRow][rCol-1].open = true;
    } if (rCol < 9) {
      arr[rRow][rCol+1].open = true;
    } if (rRow > 0 && rCol > 0) {
      arr[rRow-1][rCol-1].open = true;
    } if (rRow < 9 && rCol < 9) {
      arr[rRow+1][rCol+1].open = true;
    } if (rRow > 0 && rCol < 9) {
      arr[rRow-1][rCol+1].open = true;
    } if (rRow < 9 && rCol > 0) {
      arr[rRow+1][rCol-1].open = true;
    }
  }

  checkOpens(arr, rRow, rCol) {
    rRow = parseInt(rRow);
    rCol = parseInt(rCol);
    if (rRow > 0) {
      if(!(arr[rRow-1][rCol].open) && arr[rRow-1][rCol].value === 0) {
        arr[rRow-1][rCol].open = true;
        this.checkOpens(arr, rRow-1, rCol);
        this.openAdjacents(arr, rRow-1, rCol);
      }
    } if (rRow < 9) {
      if(!(arr[rRow+1][rCol].open) && arr[rRow+1][rCol].value === 0) {
        arr[rRow+1][rCol].open = true;
        this.checkOpens(arr, rRow+1, rCol);
        this.openAdjacents(arr, rRow+1, rCol);

      }
    } if (rCol > 0) {
      if(!(arr[rRow][rCol-1].open) && arr[rRow][rCol-1].value === 0) {
        arr[rRow][rCol-1].open = true;
        this.checkOpens(arr, rRow, rCol-1);
        this.openAdjacents(arr, rRow, rCol-1);

      }
    } if (rCol < 9) {
      if(!(arr[rRow][rCol+1].open) && arr[rRow][rCol+1].value === 0) {
        arr[rRow][rCol+1].open = true;
        this.checkOpens(arr, rRow, rCol+1);
        this.openAdjacents(arr, rRow, rCol+1);

      }
    }
  }

  checkVictory(arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      for (let k = 0; k < arr[i].length; k++) {
        if (arr[i][k].open) {
          count++;
        }
      }
    }
    if (count === 90) {
      this.props.faceAction("win.jpg");
      for (var i = 1; i < 99999; i++) {
        window.clearInterval(i);
      }
    }
  }

  checkFlags(arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      for (let k = 0; k < arr[i].length; k++) {
        if (arr[i][k].flag) {
          count++;
        }
      }
    }
    this.props.flagsAction(10-count);
  }

  handleClick(event) {
    event.preventDefault();
    console.log("CLICK!");
    if (this.props.faceReducer.result !== "lose.jpg" && this.props.faceReducer.result !== "win.jpg") {
      let row = event.target.getAttribute("row");
      let col = event.target.getAttribute("col");
      let newArr = this.props.twoDReducer.result.slice();
      if (!this.props.timerReducer.running){
        this.timer();
        console.log("HEY!");
      }
      if (event.type === "click") {
        if (newArr[row][col].mine) {
          newArr[row][col].open = true;
          this.props.faceAction("lose.jpg");
          for (var i = 1; i < 99999; i++) {
            window.clearInterval(i);
          }
        } else {
          newArr[row][col].open = true;
          newArr[row][col].flag = false;
          if (newArr[row][col].value === 0) {
            this.checkOpens(newArr, row, col);
            this.openAdjacents(newArr, row, col);
          }
        }
      } else if (event.type === "contextmenu") {
        (newArr[row][col].flag) ? newArr[row][col].flag = false : newArr[row][col].flag = true;
        this.checkFlags(newArr);
      }
      this.props.click2DAction(newArr);
      this.checkVictory(newArr);
    }
  }

  render() {
  return (
    <div className="App">
    <div className="top-container">
      <div className="top-text">{this.props.flagsReducer.result}</div>
      <img onClick={this.simpleAction.bind(this)} className="face-image" src={this.props.faceReducer.result}></img>
      <div className="top-text">{this.props.timerReducer.current}</div>
    </div>
    <div className="container-container">
    <div className="grid-container">
        {this.props.twoDReducer.result.map((row, i) => {
          return (
            row.map((col, k) => {
              if (col.flag === true) {
                return <div onClick={this.handleClick.bind(this)} onContextMenu={this.handleClick.bind(this)} key={i + "," + k} row={i} col={k} className="grid-item"><img row={i} col={k} className="grid-item-image" src="flag.jpeg"></img></div>
              } else if (col.open === false) {
                return <div onClick={this.handleClick.bind(this)} onContextMenu={this.handleClick.bind(this)} key={i + "," + k} row={i} col={k} className="grid-item"><img row={i} col={k} className="grid-item-image" src="Unopened.png"></img></div>
              } else if (col.mine === true) {
                return <div onClick={this.handleClick.bind(this)} onContextMenu={this.handleClick.bind(this)} key={i + "," + k} row={i} col={k} className="grid-item"><img row={i} col={k} className="grid-item-image" src="mine.png"></img></div>
              } else if (col.value === 0) {
                return <div onClick={this.handleClick.bind(this)} onContextMenu={this.handleClick.bind(this)} key={i + "," + k} row={i} col={k} className="grid-item-hide"><br/>{col.value}</div>
              } else {
                return <div onClick={this.handleClick.bind(this)} onContextMenu={this.handleClick.bind(this)} key={i + "," + k} row={i} col={k} className="grid-item"><br/>{col.value}</div>
              }
            })
          )
        })}
      </div>
    </div>
    </div>
  );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick} id={props.id}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={()=>this.props.onClick(i)} id={i}/>;
  }

  render() {

    let boxes=[];
    let c=0;
    for(let i=0;i<3;i++){
      let box_row=[];
      for(let j=0;j<3;j++){
        box_row.push(this.renderSquare(c++));
      }
      boxes.push(box_row);
    }

    return (
      <div>
        {
          boxes.map( box_row => 
            <div className="board-row">
            {box_row}
            </div>
          )
        }
      </div>
    );
  }
}

class Game extends React.Component {

  constructor(props){
    super(props);
    this.state={
      history: [{squares: Array(9).fill(null)}],
      xIsNext: true,
      stepNumber: 0,
      nullcount: 9
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      nullcount: this.state.nullcount-1
    });
  }

  jumpTo(step){
    this.resetColors();
    this.setState({
      stepNumber: step,
      xIsNext: (step%2===0),
      nullcount: 9-step
    });
  }

  resetColors(){
    for(let i=0;i<9;i++){
      document.getElementById(i).style.backgroundColor='#fff';
    }
  }

  render() {
    const history=this.state.history;
    const current = history[this.state.stepNumber];
    const winner=calculateWinner(current.squares);

    const moves=history.map((step,move)=>{
      const desc=move?'Go to move #'+move:'Go to game start';
      return (
        <li key={move}>
          <button onClick={()=>this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if(this.state.nullcount>0){
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    else{
      status = 'It is a draw';
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i=>this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <div>
          <button onClick={
            () => {
              this.resetColors();
              this.setState({
                history: [{squares: Array(9).fill(null)}],
                xIsNext: true,
                stepNumber: 0,
                nullcount: 9
              });
            }
          }>
            Reset Game
          </button>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      let button1 = document.getElementById(a);
      let button2 = document.getElementById(b);
      let button3 = document.getElementById(c);
      button1.style.backgroundColor = button2.style.backgroundColor = button3.style.backgroundColor = 'green';
      return squares[a];
    }
  }
  return null;
}

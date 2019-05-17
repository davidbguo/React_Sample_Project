import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

/*const initialState = {
  squares: Array(9).fill(null),
  isXNext: true,
  winner: null
}*/

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      squares: Array(9).fill(null),
      xIsNext: true,
      winner: null
    };
    this.state = this.initialState;
  }

  reset() {
    this.setState(this.initialState);
  }
  
  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
  }
  
  checkWinner(i) {
    return null;
  }
  
  handleClick(i) {
    if (this.state.squares[i] == null && this.state.winner == null) {
      const squares = this.state.squares.slice();
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      let winner = this.checkWinner(i);

      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
        winner: winner
      });
    }
  }

  render() {
    let status;
    if (this.state.winner != null) {
      status = "Winner: " + this.state.winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status" >{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <button className="reset" onClick={() => this.reset()}>Reset</button>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

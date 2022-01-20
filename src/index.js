import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={this.props.handleTurn.bind(this, this.props.id)}
      >
        {this.props.player}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        player={this.props.tablero[i]}
        id={i}
        handleTurn={this.props.handleTurn}
      />
    );
  }
  
  render() {
    return (
      <div>
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
      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      tablero: ["", "", "", "", "", "", "", "", ""],
      turn: "X",
      winner: "",
    };
  }
  message=()=>{
    if(this.isWinner()) return "El ganador es: " + (this.state.turn === "X" ? "O" : "X");
    else if(this.state.tablero.join("").length===9) return "Empate"
    else return "Siguiente Jugador: " + this.state.turn
  }
  isWinner = () => {
    const tab=this.state.tablero;
    return ((tab[0]===tab[4]&&tab[4]===tab[8]&&tab[8]!=="")||
      (tab[0]===tab[1]&&tab[1]===tab[2]&&tab[2]!=="")||
      (tab[0]===tab[3]&&tab[3]===tab[6]&&tab[6]!=="")||
      (tab[1]===tab[4]&&tab[4]===tab[7]&&tab[7]!=="")||
      (tab[2]===tab[4]&&tab[4]===tab[6]&&tab[6]!=="")||
      (tab[2]===tab[5]&&tab[5]===tab[8]&&tab[8]!=="")||
      (tab[3]===tab[4]&&tab[4]===tab[5]&&tab[5]!=="")||
      (tab[6]===tab[7]&&tab[7]===tab[8]&&tab[8]!=="")
    )};
  handleTurn = (id) => {
    if(!this.isWinner()&&this.state.tablero[id]===""){
      const newTablero = this.state.tablero;
      newTablero[id] = this.state.turn;
      const changeTurn = this.state.turn === "X" ? "O" : "X";
      this.setState({ tablero: newTablero, turn: changeTurn });
    }
  };
  reseteo=()=>{
    this.setState({tablero:["", "", "", "", "", "", "", "", ""],winner:""})
  }
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            tablero={this.state.tablero}
            handleTurn={this.handleTurn}
            turn={this.state.turn}
          />
        </div>
        <div className="game-info">
          <div className="status">{this.message()}</div>
          <button className="reinicio" onClick={this.reseteo}>Reiniciar</button>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

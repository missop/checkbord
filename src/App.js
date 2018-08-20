import React, {Component} from 'react';
import './assets/css/App.css';
// import {addClassOn} from 'base'

// 提取Game顶层组件记录每一步的棋局
class Game extends Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: new Array(9).fill(null)
            }],
            stepNumber: 0,
            winerStep: [],
            xisNext: true
        }
    }

    //子组件传到父组件的事件处理函数
    handleClick(i) {

        // 深浅拷贝：history里面每一项都是对象，如果slice（）之后改变值的话元对象也会改变
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        // 不直接修改state，而是先复制出一个数组再来修改,之前每一项都是一样的，因为这里直接引用了history[i].squares
        const mySquares = history[history.length - 1].squares.slice();
        // 当前有了数据或者有人胜利则不再修改
        if (calculateWinner(mySquares).winner || mySquares[i]) {
            return
        }
        mySquares[i] = this.state.xisNext ? 'X' : 'O';
        //修改state需要使用setState()，每移动一次添加一个数组
        this.setState({
            history: history.concat([{
                squares: mySquares
            }]),
            stepNumber: history.length,
            xisNext: !this.state.xisNext
        })
    }

    jumpTo(index) {
        this.setState({
            stepNumber: index,
            xIsNext: (index % 2) ? false : true,
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares).winner;

        // 把每一步的链接展示在页面上能够返回到每一步
        const moves = history.map((step, move) => {
            const desc = move ? 'Move#' + move : 'Game Start'
            const activeClass = this.state.stepNumber === move ? 'on' : null
            return (
                <li key={move} className={activeClass}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        let state
        if (winner) {

            state = 'Mr.' + winner + ' ,You Win!'
        } else {
            state = 'next player is ' + (this.state.xisNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <p className="players">{state}</p>
                    <Board
                        squares={current.squares}
                        onClick={(i) => {
                            this.handleClick(i)
                        }}/>
                </div>
                <div className="moves-history">
                    <ul>{moves}</ul>
                </div>
            </div>
        );
    }
}

// 第一步、创建APP组件
class Board extends Component {

    renderSquares(i) {
        // onClick中需要写一个函数，而不能直接调用this.handleClick(i)
        return (
            <Square value={this.props.squares[i]}
                    onClick={() => this.props.onClick(i)}
            />
        )
    }

    render() {
        return (
            <div className="square-box">
                <div className="board-row">
                    {this.renderSquares(0)}
                    {this.renderSquares(1)}
                    {this.renderSquares(2)}
                </div>
                <div className="board-row">
                    {this.renderSquares(3)}
                    {this.renderSquares(4)}
                    {this.renderSquares(5)}
                </div>
                <div className="board-row">
                    {this.renderSquares(6)}
                    {this.renderSquares(7)}
                    {this.renderSquares(8)}
                </div>
            </div>
        )
    }
}


//第二部、创建棋盘元素,把点击事件传给父组件
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

//判断胜者
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        let [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return {
                winner: squares[a], line: [a, b, c]
            }
        }
        return {winner: null, line: null}
    }
}

//点击没有效果
export default Game;

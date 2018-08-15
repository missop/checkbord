import React, {Component} from 'react';
import './assets/css/App.css';
/*
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

function calculateWinder(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (var i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }

    }
    return null;
}

/!*<div>
                3.使用class时父组件向子组件传递值时,子组件用this.props.attr获取
                * 如果直接使用函数的话，把props放到参数里面就可以直接用props.attr
                <p>{this.props.value}</p>
            </div>*!/

// 当你遇到需要同时获取多个子组件数据，或者两个组件之间需要相互通讯的情况时，把子组件的 state 数据提升至其共同的父组件当中保存。之后父组件可以通过 props 将状态数据传递到子组件当中。这样应用当中的状态数据就能够更方便地交流共享了。
class App extends Component {
    constructor() {
        super()
        //1.React声明变量在constructor中声明
        //2.改变状态需要使用this.setState(value,'')
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        }
    }

    handleClick(i) {
        const squares = this.state.squares.slice()
        if (calculateWinder(squares) || squares[i]) {
            return
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        })
    }

    renderSquares(i) {
        return <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />
    }

    render() {
        const winner = calculateWinder(this.state.squares)
        let status
        // const status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O')
        if (winner) {
            status = 'Winner' + winner;
        } else {
            status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="App">
                <div className="status">{status}</div>
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
        );
    }
}*/

//第二部、创建棋盘元素,把点击事件传给父组件
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

//判断胜者
function calculateWinner() {

}

// 第一步、创建APP组件
class App extends Component {
    constructor() {
        super();
        this.state = {
            //第三步：难点在于使用一个数组记录值,相当于初始化
            squares: new Array(9).fill(null),
            xisNext: true
        }
    }

    //子组件传到父组件的事件处理函数
    handleClick(i) {
        // 不直接修改state，而是先复制出一个数组再来修改
        const mySquares = this.state.squares.slice();
        // 当前如果已经有数据了则不再改变
        if (mySquares[i]) {
            return
        }
        mySquares[i] = this.state.xisNext ? 'X' : 'O';
        //修改state需要使用setState()
        this.setState({
            squares: mySquares,
            xisNext: !this.state.xisNext
        })
    }

    renderSquares(i) {
        // onClick中需要写一个函数，而不能直接调用this.handleClick(i)
        return (
            <Square value={this.state.squares[i]}
                    onClick={() => this.handleClick(i)}
            />
        )
    }

    render() {
        const state = this.state.xisNext ? 'X' : 'O';
        return (
            <div className="square-box">
                <p className="next">next player is {state}</p>
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

//点击没有效果

export default App;

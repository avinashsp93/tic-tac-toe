import React, { Component } from 'react'
import './TicTacToe.css';

class TicTacToe extends Component {
    winningCoOrdinates = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [3,5,7]
    ]

    constructor(props) {
        super(props);

        this.state = {
            isResult: false,
            xWinCount: 0,
            oWinCount: 0,
            tileClick: 0,
            tilesClickedArray: [],
            xValues: [],
            oValues: []
        };
    }

    updateClickCount = (event) => {
        // Only increase tileclick if it is valid
        if(!this.state.tilesClickedArray.includes(event.target.id)) {
            this.setState({
                tileClick: this.state.tileClick + 1
            });

            // Fill UI
            if(this.state.tileClick % 2 === 0) {
                event.target.innerHTML = 'X';
            }
            else {
                event.target.innerHTML = 'O';
            }
        }

        var newTilesClickedArray = this.state.tilesClickedArray;
        newTilesClickedArray.push(event.target.id);        

        if(this.state.tileClick % 2 === 0) {
            var newXValues = this.state.xValues;
            newXValues.push(parseInt(event.target.id));

            this.setState({
                tilesClickedArray: newTilesClickedArray,
                xValues : newXValues
            });
        }
        else {
            var newOValues = this.state.oValues;
            newOValues.push(parseInt(event.target.id));

            this.setState({
                tilesClickedArray: newTilesClickedArray,
                oValues: newOValues
            });
        }

        this.checkForWinner(event.target.innerHTML);
    }

    checkForWinner = (player) => {

        if(player === 'X') {
            this.winningCoOrdinates.forEach((element) => {
                if(this.state.xValues.includes(element[0]) 
                    && this.state.xValues.includes(element[1]) 
                        && this.state.xValues.includes(element[2])) {
                            this.setState({
                                xWinCount: this.state.xWinCount + 1,
                                isResult: true
                            });
                            setTimeout(() => {
                                alert('Player X Wins');
                                this.clearTiles();
                            }, 100);
                }
            })
        }
        else if(player === 'O') {
            this.winningCoOrdinates.forEach((element) => {
                if(this.state.oValues.includes(element[0]) 
                    && this.state.oValues.includes(element[1]) 
                        && this.state.oValues.includes(element[2])) {
                            this.setState({
                                oWinCount: this.state.oWinCount + 1,
                                isResult: true
                            });
                            setTimeout(() => {
                                alert('Player O Wins');
                                this.clearTiles();
                            }, 100);
                }
            })
        }

        setTimeout(() => {
            console.log(this.state.tileClick);
            if(this.state.tileClick === 9 && this.state.isResult === false) {
                setTimeout(() => {
                    alert("It's a draw!");
                    this.clearTiles();
                }, 100);
            }
        },100);
    }

    clearTiles = () => {
        let tileElements = document.getElementsByClassName('tile');
        for(let i = 0; i < tileElements.length; i++) {
            tileElements[i].innerHTML = '&nbsp;'
        }

        this.setState({
            tileClick: 0,
            tilesClickedArray: [],
            xValues: [],
            oValues: [],
            isResult: false
        });
    }

    render() {
        return (
            <div className="container">
                <h1>Simple Tic Tac Toe</h1>
                <div>
                    <div id="1" className="tile tile-left tile-top" onClick={this.updateClickCount}>&nbsp;</div>
                    <div id="2" className="tile tile-top" onClick={this.updateClickCount}>&nbsp;</div>
                    <div id="3" className="tile tile-right tile-top" onClick={this.updateClickCount}>&nbsp;</div>

                    <div className="horizontal-line"></div>

                    <div id="4" className="tile tile-left" onClick={this.updateClickCount}>&nbsp;</div>
                    <div id="5" className="tile" onClick={this.updateClickCount}>&nbsp;</div>
                    <div id="6" className="tile tile-right" onClick={this.updateClickCount}>&nbsp;</div>

                    <div className="horizontal-line"></div>
                    
                    <div id="7" className="tile tile-left tile-bottom" onClick={this.updateClickCount}>&nbsp;</div>
                    <div id="8" className="tile tile-bottom" onClick={this.updateClickCount}>&nbsp;</div>
                    <div id="9" className="tile tile-right tile-bottom" onClick={this.updateClickCount}>&nbsp;</div>
                </div>
                <div className="win-section">
                    <h2>Player X Wins: {this.state.xWinCount}</h2>
                    <h2>Player O Wins: {this.state.oWinCount}</h2>
                </div>
            </div>
        )
    }
}

export default TicTacToe
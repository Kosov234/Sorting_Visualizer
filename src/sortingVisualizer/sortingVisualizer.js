import React, { Component } from 'react';
import './sortingVisualizer.css';
import {getMergeSortAnimations,getBubbleSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';

const ANIMATION_SPEED_MS = 2;
const NUMBER_OF_ARRAY_BARS = 320;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';


export default class sortingVisualizer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 700));
    }
    this.setState({ array });
  }

  mergeSort(){
    console.log(this.state.array);
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }


  bubbleSort(){
    const animations = getBubbleSortAnimations(this.state.array);
    console.log(animations);
    for(let i = 0; i < animations.length; i++){
      const arrayBars = document.getElementsByClassName('array-bar');
      
        const [barOneIdx, barTwoIdx] = animations[i];
        console.log(animations[i]);
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          if(i % 2 === 0){
            barOneStyle.backgroundColor = SECONDARY_COLOR;
            barTwoStyle.backgroundColor = SECONDARY_COLOR;
            console.log("Bar One Index: " + barOneIdx);
            console.log("Bar Two Index: " + barTwoIdx + "--------");
          }
          else{
            const bufferHeight = barOneStyle.height;
            barOneStyle.height = barTwoStyle.height;
            barTwoStyle.height = bufferHeight;
            barOneStyle.backgroundColor = PRIMARY_COLOR;
            barTwoStyle.backgroundColor = PRIMARY_COLOR;
            console.log("Bar One Index: " + barOneIdx);
            console.log("Bar Two Index: " + barTwoIdx + "--------");
          }
        },i * ANIMATION_SPEED_MS)
    }
  }

  render() {
    const { array } = this.state;

    return (
      <div className='array-container'>
        {array.map((value, idx) => (
          <div
            className='array-bar'
            key={idx}
            style={{ height: `${value}px` }}
          ></div>
        ))}
        <br></br>
        <button onClick={() => this.resetArray()}>Reset Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

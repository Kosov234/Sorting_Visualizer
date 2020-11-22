import React, { Component } from 'react';
import './sortingVisualizer.css';
import {getMergeSortAnimations,getBubbleSortAnimations,getInsertionSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';

const ANIMATION_SPEED_MS = 2;
const NUMBER_OF_ARRAY_BARS = 320;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';


export default class sortingVisualizer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      width : (window.innerWidth - 200)/4
    };
  }

  componentDidMount() {
    this.resetArray();
    alert(this.state.width);
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < this.state.width; i++) {
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

  insertionSort(){
    const animations = getInsertionSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    for(let i = 0;i < animations.length;i++){
      let firstBar = arrayBars[animations[i].value[0]];
      let secondBar = arrayBars[animations[i].value[1]];
      switch(animations[i].name){
        case "compare":
          setTimeout(() =>{
            firstBar.style.backgroundColor =SECONDARY_COLOR;
            secondBar.style.backgroundColor = SECONDARY_COLOR;
          },i*ANIMATION_SPEED_MS);

          break;
        case "re-assign":
          setTimeout(() => {
            let bufferHeight = firstBar.style.height;
            firstBar.style.height = secondBar.style.height;
            secondBar.style.height = bufferHeight;
            firstBar.style.backgroundColor = PRIMARY_COLOR;
            secondBar.style.backgroundColor = PRIMARY_COLOR;
          },i*ANIMATION_SPEED_MS);
          break;
        case "lastStep":
          setTimeout(() => {
            firstBar.style.height = animations[i].value[1];
            
            firstBar.style.backgroundColor = PRIMARY_COLOR;
          },i * ANIMATION_SPEED_MS);
          break;
        default:
          break;
      }
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
        <button onClick={() => this.insertionSort()}>Insertion Sort</button>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

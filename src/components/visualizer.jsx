import React from "react";

import { bubbleSort } from "./algorithms/bubbleSort.js";
import { insertionSort } from "./algorithms/insertionSort.js";
import { selectionSort } from "./algorithms/selectionSort.js";
import { mergeSort } from "./algorithms/mergeSort.js";
import { quickSort } from "./algorithms/quickSort.js";
import { heapSort } from "./algorithms/heapSort.js";

import Navbar from "./navbar";
import Frame from "./frame";

import pause from "./helper/pause";
import generator from "./helper/generator";
import {
  ALGORITHM,
  SPEED,
  SIZE,
  SWAP,
  CURRENT,
  NORMAL,
  DONE,
} from "./helper/constants";
import { getKeysCopy } from "./helper/keys.js";

class Visualizer extends React.Component {
  state = {
    list: [],
    size: 10,
    speed: 1,
    algorithm: 1,
    running: false,
  };

  componentDidMount() {
    this.generateList();
  }

  componentDidUpdate() {
    this.onChange();
    this.generateList();
  }

  render() {
    return (
      <React.Fragment>
        <Navbar
          start={this.start}
          response={this.response}
          newList={this.generateList}
          onChange={this.onChange}
        />
        <Frame list={this.state.list} />
      </React.Fragment>
    );
  }

  onChange = (value, option) => {
    if (option === ALGORITHM && !this.state.running) {
      this.setState({ algorithm: Number(value) });
    } else if (option === SPEED) {
      this.setState({ speed: Number(value) });
    } else if (option === SIZE && !this.state.running) {
      this.setState({ size: Number(value) });
      this.generateList();
    }
  };

  generateList = (value = 0) => {
    if (
      (this.state.list.length !== this.state.size && !this.state.running) ||
      Number(value) === 1
    ) {
      let list = generator(this.state.size);
      this.setState({ list: list });
    }
  };

  start = async () => {
    this.lock(true);
    let moves = await this.getMoves(this.state.algorithm);
    await this.visualizeMoves(moves);
    await this.done();
    this.lock(false);
  };

  getMoves = async (Name) => {
    let moves = [];
    let array = await getKeysCopy(this.state.list, this.state.size);
    if (Name === 1) {
      moves = await bubbleSort(array, array.length);
    }
    if (Name === 2) {
      moves = await selectionSort(array, array.length);
    }
    if (Name === 3) {
      moves = await insertionSort(array, array.length);
    }
    if (Name === 4) {
      moves = await mergeSort(array, array.length);
    }
    if (Name === 5) {
      moves = await quickSort(array, array.length);
    }
    if (Name === 6) {
      moves = await heapSort(array, array.length);
    }
    return moves;
  };

  visualizeMoves = async (moves) => {
    if (moves.length === 0) {
      return;
    }
    if (moves[0].length === 4) {
      await this.visualizeMovesInRange(moves);
    } else {
      await this.visualizeMovesBySwapping(moves);
    }
  };

  visualizeMovesInRange = async (Moves) => {
    let prevRange = [];
    while (Moves.length > 0 && Moves[0].length === 4) {
      if (prevRange !== Moves[0][3]) {
        await this.updateElementClass(prevRange, NORMAL);
        prevRange = Moves[0][3];
        await this.updateElementClass(Moves[0][3], CURRENT);
      }
      await this.updateElementValue([Moves[0][0], Moves[0][1]]);
      Moves.shift();
    }
    await this.visualizeMoves(Moves);
  };

  visualizeMovesBySwapping = async (Moves) => {
    while (Moves.length > 0) {
      let currMove = Moves[0];
      if (currMove.length !== 3) {
        await this.visualizeMoves(Moves);
        return;
      } else {
        let indexes = [currMove[0], currMove[1]];
        await this.updateElementClass(indexes, CURRENT);
        if (currMove[2] === SWAP) {
          await this.updateList(indexes);
        }
        await this.updateElementClass(indexes, NORMAL);
      }
      Moves.shift();
    }
  };

  updateList = async (indexes) => {
    let array = [...this.state.list];
    let stored = array[indexes[0]].key;
    array[indexes[0]].key = array[indexes[1]].key;
    array[indexes[1]].key = stored;
    await this.updateStateChanges(array);
  };

  updateElementValue = async (indexes) => {
    let array = [...this.state.list];
    array[indexes[0]].key = indexes[1];
    await this.updateStateChanges(array);
  };

  updateElementClass = async (indexes, classType) => {
    let array = [...this.state.list];
    for (let i = 0; i < indexes.length; ++i) {
      array[indexes[i]].classType = classType;
    }
    await this.updateStateChanges(array);
  };

  updateStateChanges = async (newList) => {
    this.setState({ list: newList });
    await pause(this.state.speed);
  };

  lock = (status) => {
    this.setState({ running: Boolean(status) });
  };

  done = async () => {
    let indexes = [];
    for (let i = 0; i < this.state.size; ++i) {
      indexes.push(i);
    }
    await this.updateElementClass(indexes, DONE);
  };

  response = () => {
    let Navbar = document.querySelector(".navbar");
    if (Navbar.className === "navbar") Navbar.className += " responsive";
    else Navbar.className = "navbar";
  };
}

export default Visualizer;

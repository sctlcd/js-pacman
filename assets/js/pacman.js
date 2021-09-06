import { squares } from './board.js'

// create Pacman template
export class Pacman {
    constructor(className, startIndex, speed) {
        this.className = className;
        this.startIndex = startIndex;
        this.speed = speed;
        this.currentIndex = startIndex;
    };
};

// rotate Pacman in the direction of his move
export function rotateDiv(pos, deg) {
    squares[pos].style.transform = `rotate(${deg}deg)`;
};
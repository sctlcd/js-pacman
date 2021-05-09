const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');
const width = 28; // 28 x 28 = 784 squares
let score = 0;

/*
layout of grid and what is in the squares
0 - pac-dots
1 - wall
2 - ghost-lair
3 - power-pellet
4 - empty
*/
const layout = [
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
  4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
  1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
  1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
  1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
  1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
  1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
  1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
  1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];

const squares = [];

// draw the grid and render it
function createBoard() {
  for (let i = 0; i < layout.length; i++) {
    const square = document.createElement('div');
    grid.appendChild(square);
    squares.push(square);

    // add layout to the board
    if (layout[i] === 0) {
      squares[i].classList.add('pac-dot');
    } else if (layout[i] === 1) {
      squares[i].classList.add('wall');
    } else if (layout[i] === 2) {
      squares[i].classList.add('ghost-lair');
    } else if (layout[i] === 3) {
      squares[i].classList.add('power-pellet');
    }
  }
};

function rotateDiv(pos, deg) {
  squares[pos].style.transform = `rotate(${deg}deg)`;
};

createBoard();

// Create Pacman template
class Pacman {
  constructor(className, startIndex, speed) {
    this.className = className;
    this.startIndex = startIndex;
    this.speed = speed;
    this.currentIndex = startIndex;
  };
};

pacman = new Pacman('pac-man', 490, 300);

// Draw pacman onto the grid
squares[pacman.currentIndex].classList.add(pacman.className);

// move pac-man
function movePacman(e) {
  squares[pacman.currentIndex].classList.remove('pac-man');

  /*
   key | code | movement | rotation(degree)
   left arrow | 37 | -1 | 180
   up arrow | 38 | -width | 270
   right arrow | 39 | +1 | 0
   down arrow | 40 | +width | 90
   */
  switch (e.keyCode) {
    case 37:
      if (pacman.currentIndex % width !== 0 &&
        !squares[pacman.currentIndex - 1].classList.contains('wall') &&
        !squares[pacman.currentIndex - 1].classList.contains('ghost-lair')) {
        pacman.currentIndex -= 1;
        rotateDiv(pacman.currentIndex, 180);
      }

      // check if pacman is in the left exist
      if ((pacman.currentIndex - 1) === 363) {
        pacman.currentIndex = 391;
      }
      break;
    case 38:
      if (pacman.currentIndex - width >= 0 &&
        !squares[pacman.currentIndex - width].classList.contains('wall') &&
        !squares[pacman.currentIndex - width].classList.contains('ghost-lair')) {
        pacman.currentIndex -= width;
        rotateDiv(pacman.currentIndex, 270);
      }
      break;
    case 39:
      if (pacman.currentIndex % width < width - 1 &&
        !squares[pacman.currentIndex + 1].classList.contains('wall') &&
        !squares[pacman.currentIndex + 1].classList.contains('ghost-lair')) {
        pacman.currentIndex += 1;
        rotateDiv(pacman.currentIndex, 0);
      }

      // check if pacman is in the right exit
      if ((pacman.currentIndex + 1) === 392) {
        pacman.currentIndex = 364;
      }
      break;
    case 40:
      if (pacman.currentIndex + width < width * width &&
        !squares[pacman.currentIndex + width].classList.contains('wall') &&
        !squares[pacman.currentIndex + width].classList.contains('ghost-lair')) {
        pacman.currentIndex += width;
        rotateDiv(pacman.currentIndex, 90);
      }
      break;
  }

  squares[pacman.currentIndex].classList.add('pac-man');

  pacDotEaten();
};

// event listener on keyup event
document.addEventListener('keyup', movePacman);

// What happens when Pac-man eats a pac-dot
function pacDotEaten() {
  if (squares[pacman.currentIndex].classList.contains('pac-dot')) {
    score++;
    scoreDisplay.innerHTML = score;
    squares[pacman.currentIndex].classList.remove('pac-dot');
  }
};

// Create Ghost template
class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className;
    this.startIndex = startIndex;
    this.speed = speed;
    this.currentIndex = startIndex;
    this.timerId = NaN;
  };
};

ghosts = [
  new Ghost('blinky', 348, 250),
  new Ghost('pinky', 376, 400),
  new Ghost('inky', 351, 300),
  new Ghost('clyde', 379, 500)
]

// Draw my ghost onto the grid
ghosts.forEach(ghost => {
  squares[ghost.currentIndex].classList.add(ghost.className);
  squares[ghost.currentIndex].classList.add('ghost');
});

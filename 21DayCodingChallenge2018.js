const GRID = [
  ["", "", "", "^", "", "", "", "", "", ""],
  ["", "", "v", "", "~", "", "", "", "", ""],
  ["", "v", "", "", "^", "^", "", "", "", ""],
  ["", "", "", "", "^", "^", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "v", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "^", "~", "~", "", "", "", "^", "", ""],
  ["", "^", "", "~", "~", "", "", "", "", ""],
  ["", "^", "", "", "~", "~", "", "", "", ""],
];

function countRows() {
  return GRID.length;
}

function countColumns() {
  return GRID[0].length;
}

function gridSize() {
  return `${countColumns()} x ${countRows()}`;
}

function totalCells() {
  return countColumns() * countRows();
}

function convertColumn(coordinate) {
return coordinate.toUpperCase(0).charCodeAt(0) - 65;
}

function convertRow(coordinate) {
  return coordinate.substr(1, 2) - 1;
}

function lightCell(coordinate) {
  let row = convertRow(coordinate);
  let column = convertColumn(coordinate);
  if (row > 9 || column > 9) {
    return false;
  } else {
  return GRID[row][column];
  }
}

function isRock(coordinate) {
  return (lightCell(coordinate) === '^');  
}

function isCurrent(coordinate) {
  return (lightCell(coordinate) === '~');
}

function isShip(coordinate) {
  return (lightCell(coordinate) === 'v');
}

function lightRow(number) {
  return GRID[number - 1];
}

function lightColumn(coordinate) {
  let col = [];
  for (let i = 0; i < GRID.length; i++) {
    col.push(GRID[i][convertColumn(coordinate)]);
  }
  return col;
}

function allRocks() {
  let rocks = [];
  for (let row = 0; row < countRows(); row++) {
    for (let col = 0; col < countColumns(); col++) {
      if (GRID[row][col] === '^' ) {
        rocks.push(String.fromCharCode(col + 65) + (row +1));
      }
    }
  }
  return rocks;
}

function allCurrents() {
  let currents = [];
  for (let row = 0; row < countRows(); row++) {
    for (let col = 0; col < countColumns(); col++) {
      if (GRID[row][col] === '~') {
        currents.push(String.fromCharCode(col + 65) + (row +1));
      }
    }
  }
  return currents;
}

function allShips() {
  let ships = [];
  for (let row = 0; row < countRows(); row++) {
    for (let col = 0; col < countColumns(); col++) {
      if (GRID[row][col] === 'v') {
        ships.push(String.fromCharCode(col + 65) + (row +1));
      }
    }
  }
  return ships;
}

function firstRock() {
  return allRocks()[0];
}

function firstCurrent() {
  return allCurrents()[0];
}

function shipReport() {
  let sorted = allShips().sort((a, b) => { return a - b;});
  let smallest = sorted[0];                      
  let largest = sorted[sorted.length - 1];
  let arr = [ smallest , largest ];
  return arr;
}

function howDangerous(coordinate) {
  let a = lightCell(coordinate);
  switch (a) {
    case '^':
      return 100;
    case '~':
      return 50;
    default: 
      return 0;
    }
}

function percentageReport() {
  let report =[];
  function totalCells() {
    return countRows() * countColumns();
  }
  function rockPercentage() {
    return (allRocks().length / totalCells())*100;
  }
  function currentPercentage() {
    return (allCurrents().length / totalCells())*100;
  }
  report.push(rockPercentage().toFixed(2));
  report.push(currentPercentage().toFixed(2));
  return report;
}  


function howDangerousValue(value){
  if (value === "^"){
    return 100;
  } else if (value === "~"){
    return 50;
  } else {
    return 0; 
  }
}

function safetyReport() {
  return GRID.map( row => {
    return row.map( column => {
      return howDangerousValue(column);
    });
  });
}

function calcDistance(coord1, coord2) {
  let x1 = convertColumn(coord1);
  let x2 = convertColumn(coord2);
  let y1 = convertRow(coord1);
  let y2 = convertRow(coord2);
  return +Math.sqrt((Math.pow((y2 - y1), 2)) + (Math.pow((x2 - x1), 2))).toFixed(2);
}
import { deepCopy } from ".";
import { CELL_STATES, getCSSName } from "../constants";

const valueEq = (cell, state) => {
  return cell.value === state
}

const applyRule = (grid, i, j, rows, cols) => {
  const deadNeighbors = countCells(grid, i, j, rows, cols, CELL_STATES.dead)
  const landNeighbors = countCells(grid, i, j, rows, cols, CELL_STATES.land)

  if (valueEq(grid[i][j], CELL_STATES.land)) {    
    if (landNeighbors <= 2) {
      return CELL_STATES.dead
    }

    if (deadNeighbors > 3) {
      return CELL_STATES.dead
    }

    if (landNeighbors > 4) {
      return CELL_STATES.land
    }
  }

  if (valueEq(grid[i][j], CELL_STATES.dead)) {
    if (landNeighbors > 3) {
      return CELL_STATES.land
    }

    if (deadNeighbors > 3) {
      return CELL_STATES.dead
    }
  }

  return grid[i][j].value
}

const applyVegetation = (grid, i, j, rows, cols) => {
  if (grid[i][j].value === CELL_STATES.grass) {
    debugger
  }

  if (grid[i][j].value === CELL_STATES.dead) {
    return CELL_STATES.dead
  }

  const deadNeighbors = countCells(grid, i, j, rows, cols, CELL_STATES.dead, 2)
  const landNeighbors = countCells(grid, i, j, rows, cols, CELL_STATES.land)
  const grassNeighbors = countCells(grid, i, j, rows, cols, CELL_STATES.grass)
  const treeNeighbors = countCells(grid, i, j, rows, cols, CELL_STATES.tree)

  if (grid[i][j].value === CELL_STATES.grass && deadNeighbors === 0) {
    return CELL_STATES.land
  }

  if (treeNeighbors >= 1 && landNeighbors >= 2) {
    return CELL_STATES.dead
  }

  if (deadNeighbors <= 2 && landNeighbors > 4) {
    return CELL_STATES.grass
  }

  if ((landNeighbors + grassNeighbors) > 3) {
    return CELL_STATES.land
  }

  if (grassNeighbors > 2) {
    return CELL_STATES.tree
  }

  // return grid[i][j].value
  return CELL_STATES.land
}

const countCells = (grid, row, col, rows, cols, state) => {
  // r = 1, vecindad = Moore
  let count = 0

  if (row - 1 >= 0) {
    if (grid[row - 1][col]?.value === state) {
      count++
    }
  }

  
  if (row-1 >= 0 && col-1 >= 0) {
    if (grid[row-1][col-1]?.value === state) {
      count++
    }
  }

  if (row-1 >= 0 && col+1 < cols) {
    if (grid[row-1][col+1]?.value === state) {
      count++
    }
  }

  if (col-1 >= 0) {
    if (grid[row][col-1]?.value === state) {
      count++
    }
  }

  if (col+1 < cols) {
    if (grid[row][col+1]?.value === state) {
      count++
    }
  }

  if (row+1 < rows) {
    if (grid[row+1][col]?.value === state) {
      count++
    }
  }

  if (row+1 < rows && col-1 >= 0) {
    if (grid[row+1][col-1]?.value === state) {
      count++
    }
  }

  if (row+1 < rows && col+1 < cols) {
    if (grid[row+1][col+1]?.value === state) {
      count++
    }
  }

  return count
}

export const transition = (grid, rows, cols) => {
  const newGrid = deepCopy(grid)

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const value = applyRule(grid, i, j, rows, cols)
      newGrid[i][j] = {
        value,
        style: getCSSName(value)
      }
    }
  }

  // Apply styles
  // for (let i = 0; i < rows; i++) {
  //   for (let j = 0; j < cols; j++) {
  //     const value = applyVegetation(newGrid, i, j, rows, cols)
  //     newGrid[i][j] = {
  //       value,
  //       style: getCSSName(value)
  //     }
  //   }
  // }

  return newGrid
}
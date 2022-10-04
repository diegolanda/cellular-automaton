import { CELL_STATES, getCSSName } from '../constants';
import { deepCopy } from './'

export const makeNoise = (grid, rows, cols) => {
  const newGrid = deepCopy(grid)

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const isAlive = Math.round(Math.random());
      if (isAlive === 1) {
        newGrid[i][j] = {
          value: CELL_STATES.land,
          style: getCSSName(CELL_STATES.land),
        }
      } else {
        newGrid[i][j] = {
          value: CELL_STATES.dead,
          style: getCSSName(CELL_STATES.dead),
        }
      }
    }
  }

  return newGrid
}

import { useState } from 'react'
import { CELL_STATES, getCSSName } from '../constants'
import { transition } from '../utils/transition';

const DEFAULT_ROWS = 48;
const DEFAULT_COLS = 150;


export const useGrids = (rows = DEFAULT_ROWS, cols = DEFAULT_COLS) => {
  // Initialize Grids
  const initialGrid = Array(rows)
  for (let i = 0; i < rows; i++) {
    initialGrid[i] = new Array(cols)
    for (let j = 0; j < cols; j++) {
      initialGrid[i][j] = {
        value: CELL_STATES.dead,
        style: getCSSName(CELL_STATES.dead),
      }
    }
  }

  const [grid, setGrid] = useState(initialGrid)

  const updateGrid = (newGrid) => {
    setGrid(newGrid)
  }

  const actions = {
    renderTable: () => renderTable(grid, rows, cols),
    updateGrid,
    nextState: () => {
      const newGrid = transition(grid, rows, cols)
      updateGrid(newGrid)
    }
  }

  const data = {
    grid,
    rows,
    cols
  }

  return [data, actions]
}

const renderTable = (grid, rows, cols) => {
  const rowComponents = []

  for (let i = 0; i < rows; i++) {
    const tr = []

    for (let j = 0; j < cols; j++) {
      const td = <td key={`${i}_${j}`} id={`${i}_${j}`} className={grid[i][j].style} />

      // TODO ADD CLICK HANDLERS

      tr.push(td)
    }
    
    const row = <tr key={`row_${i}`}>{tr}</tr>

    rowComponents.push(row)
  }

  const table = <table><tbody>{rowComponents}</tbody></table>

  return table
}

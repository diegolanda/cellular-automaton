export const CELL_STATES = {
  dead: 0,
  land: 1,
  grass: 2,
  tree: 3,
}

export const styles = {
  0: 'dead',
  1: 'land',
  2: 'grass',
  3: 'tree',
}

const CSS_PREFIX = 'cell_'

export const getCSSName = (cell) => {
  if (cell === 2) {
    debugger
  }
  if (styles[cell] === undefined) {
    return `${CSS_PREFIX}undefined`
  }

  return `${CSS_PREFIX}${styles[cell]}`
}

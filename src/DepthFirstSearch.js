export class DepthFirstSearch {
  constructor() {

    const stack = []
    stack.push(grid.cellAt(0, 0))
    // stack.push(environment.getInitialState())
  }

  execute() {
    while (stack.length > 0 && !goalFound) {
        
      const currCell = stack.pop()
    
      if (currCell.i === goalCell.i && currCell.j === goalCell.j) {
          goalFound = true
          console.log('end')
          return
      }
      
      currCell.frameFillColor = 'blue'
      currCell.baseFillColor = 'red'
      const neighbors = []
      
      // top
      if (grid.cellAt(currCell.i - 1, currCell.j)?.visited === false && currCell.borders.top === false) {
          neighbors.push(grid.cellAt(currCell.i - 1, currCell.j))
      }
    
      // left
      if (grid.cellAt(currCell.i, currCell.j - 1)?.visited === false && currCell.borders.left === false) {
          neighbors.push(grid.cellAt(currCell.i, currCell.j - 1))
      }
    
      // bottom
      if (grid.cellAt(currCell.i + 1, currCell.j)?.visited === false && currCell.borders.bottom === false) {
          neighbors.push(grid.cellAt(currCell.i + 1, currCell.j))
      }
    
      // right
      if (grid.cellAt(currCell.i, currCell.j + 1)?.visited === false && currCell.borders.right === false) {
          neighbors.push(grid.cellAt(currCell.i, currCell.j + 1))
      }
      
      if (neighbors.length > 0) {
          stack.push(currCell)
      }
    
      const chosenCell = neighbors[Math.floor(Math.random() * neighbors.length)]
    
      if (chosenCell) {
          chosenCell.visited = true
          stack.push(chosenCell)
      }
    }
  }

  update() {

  }
}


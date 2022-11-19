import { Grid } from './Grid'
import { Cell } from './Cell'
import { SearchAlgorithm } from './SearchAlgorithm'

export class DepthFirstSearch implements SearchAlgorithm {
  grid: Grid
  stack: Cell[]
  goalFound: boolean
  goalCell: Cell

  constructor(grid: Grid) {
    this.grid = grid
    this.stack = []
    this.goalFound = false
    this.goalCell = grid.cellAt(10, 10)!
    this.goalCell.baseFillColor = 'green'
    this.stack.push(grid.cellAt(5, 0)!)
  }

  execute() {
    while (this.stack.length > 0 && !this.goalFound) {
        
      const currCell = this.stack.pop()!
    
      if (currCell.i === this.goalCell.i && currCell.j === this.goalCell.j) {
          this.goalFound = true
          console.log('end')
          return
      }
      
      currCell.frameFillColor = 'blue'
      currCell.baseFillColor = 'red'
      const neighbors = []
      
      // top
      if (this.grid.cellAt(currCell.i - 1, currCell.j)?.visited === false && currCell.borders.top === false) {
          neighbors.push(this.grid.cellAt(currCell.i - 1, currCell.j))
      }
    
      // left
      if (this.grid.cellAt(currCell.i, currCell.j - 1)?.visited === false && currCell.borders.left === false) {
          neighbors.push(this.grid.cellAt(currCell.i, currCell.j - 1))
      }
    
      // bottom
      if (this.grid.cellAt(currCell.i + 1, currCell.j)?.visited === false && currCell.borders.bottom === false) {
          neighbors.push(this.grid.cellAt(currCell.i + 1, currCell.j))
      }
    
      // right
      if (this.grid.cellAt(currCell.i, currCell.j + 1)?.visited === false && currCell.borders.right === false) {
          neighbors.push(this.grid.cellAt(currCell.i, currCell.j + 1))
      }
      
      if (neighbors.length > 0) {
          this.stack.push(currCell)
      }
    
      const chosenCell = neighbors[Math.floor(Math.random() * neighbors.length)]
    
      if (chosenCell) {
          chosenCell.visited = true
          this.stack.push(chosenCell)
      }
    }
  }

  update() {
    if (this.stack.length > 0 && !this.goalFound) {
        
      const currCell = this.stack.pop()!
      console.log(this.stack)
    
      if (currCell.i === this.goalCell.i && currCell.j === this.goalCell.j) {
          this.goalFound = true
          console.log('end')
          return
      }
      
      currCell.frameFillColor = 'blue'
      currCell.baseFillColor = 'red'
      const neighbors = []
      
      // top
      if (this.grid.cellAt(currCell.i - 1, currCell.j)?.visited === false && currCell.borders.top === false) {
          neighbors.push(this.grid.cellAt(currCell.i - 1, currCell.j))
      }
    
      // left
      if (this.grid.cellAt(currCell.i, currCell.j - 1)?.visited === false && currCell.borders.left === false) {
          neighbors.push(this.grid.cellAt(currCell.i, currCell.j - 1))
      }
    
      // bottom
      if (this.grid.cellAt(currCell.i + 1, currCell.j)?.visited === false && currCell.borders.bottom === false) {
          neighbors.push(this.grid.cellAt(currCell.i + 1, currCell.j))
      }
    
      // right
      if (this.grid.cellAt(currCell.i, currCell.j + 1)?.visited === false && currCell.borders.right === false) {
          neighbors.push(this.grid.cellAt(currCell.i, currCell.j + 1))
      }
      
      if (neighbors.length > 0) {
          this.stack.push(currCell)
      } else {
        currCell.baseFillColor = 'darkred'
      }
    
      const chosenCell = neighbors[Math.floor(Math.random() * neighbors.length)]
    
      if (chosenCell) {
          chosenCell.visited = true
          this.stack.push(chosenCell)
      }
    }
  }
}


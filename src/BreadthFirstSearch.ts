import { Grid } from './Grid'
import { Cell } from './Cell'
import { SearchAlgorithm } from './SearchAlgorithm'

export class BreadthFirstSearch implements SearchAlgorithm {
  grid: Grid
  queue: Cell[]
  goalFound: boolean
  goalCell: Cell

  constructor(grid: Grid) {
    this.grid = grid
    this.queue = []
    this.goalFound = false
    this.goalCell = grid.cellAt(15, 15)!
    this.goalCell.baseFillColor = 'green'
    this.queue.push(grid.cellAt(5, 0)!)
  }

  execute() {
    while (this.queue.length > 0 && !this.goalFound) {
        
      const currCell = this.queue.shift()!
      if (!currCell.visited)
        currCell.visited = true
    
      if (currCell.i === this.goalCell.i && currCell.j === this.goalCell.j) {
          this.goalFound = true
          console.log('end')
          return
      }
      
      currCell.frameFillColor = 'blue'
      currCell.baseFillColor = 'red'
      const neighbors: Cell[] = []
      
      // top
      if (this.grid.cellAt(currCell.i - 1, currCell.j)?.visited === false && currCell.borders.top === false) {
          neighbors.push(this.grid.cellAt(currCell.i - 1, currCell.j)!)
      }
    
      // left
      if (this.grid.cellAt(currCell.i, currCell.j - 1)?.visited === false && currCell.borders.left === false) {
          neighbors.push(this.grid.cellAt(currCell.i, currCell.j - 1)!)
      }
    
      // bottom
      if (this.grid.cellAt(currCell.i + 1, currCell.j)?.visited === false && currCell.borders.bottom === false) {
          neighbors.push(this.grid.cellAt(currCell.i + 1, currCell.j)!)
      }
    
      // right
      if (this.grid.cellAt(currCell.i, currCell.j + 1)?.visited === false && currCell.borders.right === false) {
          neighbors.push(this.grid.cellAt(currCell.i, currCell.j + 1)!)
      }
      
      neighbors.forEach(cell => {
        if (!cell.visited) {
          this.queue.push(cell)
        }
      })
    }
  }

  update() {
    if (this.queue.length > 0 && !this.goalFound) {
        
      const currCell = this.queue.shift()!

      if (!currCell.visited)
        currCell.visited = true
      
      if (currCell.i === this.goalCell.i && currCell.j === this.goalCell.j) {
          this.goalFound = true
          console.log('end')
          return
      }
      
      currCell.frameFillColor = 'blue'
      currCell.baseFillColor = 'red'
      const neighbors: Cell[] = []
      
      // top
      if (this.grid.cellAt(currCell.i - 1, currCell.j)?.visited === false && currCell.borders.top === false) {
          neighbors.push(this.grid.cellAt(currCell.i - 1, currCell.j)!)
      }
    
      // left
      if (this.grid.cellAt(currCell.i, currCell.j - 1)?.visited === false && currCell.borders.left === false) {
          neighbors.push(this.grid.cellAt(currCell.i, currCell.j - 1)!)
      }
    
      // bottom
      if (this.grid.cellAt(currCell.i + 1, currCell.j)?.visited === false && currCell.borders.bottom === false) {
          neighbors.push(this.grid.cellAt(currCell.i + 1, currCell.j)!)
      }
    
      // right
      if (this.grid.cellAt(currCell.i, currCell.j + 1)?.visited === false && currCell.borders.right === false) {
          neighbors.push(this.grid.cellAt(currCell.i, currCell.j + 1)!)
      }
      
      neighbors.forEach(cell => {
        if (!cell.visited) {
          this.queue.push(cell)
        }
      })
    }
  }
}


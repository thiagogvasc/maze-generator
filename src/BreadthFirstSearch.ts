import { Grid } from './Grid'
import { Cell } from './Cell'
import { SearchAlgorithm } from './SearchAlgorithm'

export class BreadthFirstSearch implements SearchAlgorithm {
  grid: Grid
  queue: Cell[]
  goalFound: boolean
  goalCell: Cell
  _finished: boolean

  constructor(grid: Grid, initialNode: Cell, goalNode: Cell) {
    this.grid = grid
    this.queue = []
    this.goalFound = false
    this.goalCell = goalNode
    this.goalCell.baseFillColor = 'green'
    this.queue.push(initialNode)
    this._finished = false
  }

  finished() {
    return this._finished
  }

  execute() {
    while (this.queue.length > 0 && !this.goalFound) {
        
      const currCell = this.queue.shift()!
      if (!currCell.visited)
        currCell.visited = true
    
      if (currCell.i === this.goalCell.i && currCell.j === this.goalCell.j) {
          this.goalFound = true
          this._finished = true
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
          this._finished = true
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


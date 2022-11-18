import { Grid } from './Grid'
import { Cell } from './Cell'

export class MazeGenerator {
  constructor() {}

  generateMaze(grid: Grid) {
      const stack: Array<Cell> = []
      const initialCell: Cell = grid.cellAt(0, 0)!
      initialCell && stack.push(initialCell)

      while (stack.length > 0) {
      
          const currCell = stack.pop()!
          const neighbors = []
          
          // top
          if (grid.cellAt(currCell.i - 1, currCell.j)?.visited === false) {
              neighbors.push(grid.cellAt(currCell.i - 1, currCell.j))
          }
  
          // left
          if (grid.cellAt(currCell.i, currCell.j - 1)?.visited === false) {
              neighbors.push(grid.cellAt(currCell.i, currCell.j - 1))
          }
  
          // bottom
          if (grid.cellAt(currCell.i + 1, currCell.j)?.visited === false) {
              neighbors.push(grid.cellAt(currCell.i + 1, currCell.j))
          }
  
          // right
          if (grid.cellAt(currCell.i, currCell.j + 1)?.visited === false) {
              neighbors.push(grid.cellAt(currCell.i, currCell.j + 1))
          }
          
          if (neighbors.length > 0) {
              stack.push(currCell)
          }
  
          const chosenCell = neighbors[Math.floor(Math.random()*neighbors.length)]
  
          if (chosenCell) {
              //chosenCell.fillColor = 'blue'
              chosenCell.visited = true
              stack.push(chosenCell)
              
              if (chosenCell.i > currCell.i) {
                  chosenCell.borders.top = false
                  currCell.borders.bottom = false

              } else if (chosenCell.i < currCell.i) {
                  chosenCell.borders.bottom = false
                  currCell.borders.top = false

              } else if (chosenCell.j > currCell.j) {
                  chosenCell.borders.left = false
                  currCell.borders.right = false
                  
              } else { // else if (chosenCell.j < currCell.j) {
                  chosenCell.borders.right = false
                  currCell.borders.left = false
              }
          }
      }
  }
}
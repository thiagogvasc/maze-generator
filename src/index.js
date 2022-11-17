import { Grid } from './Grid.js'
import { MazeGenerator } from './MazeGenerator.js'


const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.backgroundColor = '#d3d3d3'


const ctx = canvas.getContext('2d')




// State
const grid = new Grid(10, 10, 300, 300, 25, 25)
const mazeGenerator = new MazeGenerator()
mazeGenerator.generateMaze(grid)

const stack = []
stack.push(grid.cellAt(0, 0))

const goalCell = grid.cellAt(10, 10)
goalCell.baseFillColor = 'green'

grid.cells.forEach(row => row.forEach(cell => cell.visited = false))
let goalFound = false



// Loop
function mainLoop() {
    grid.draw(ctx)
    grid.update()


    if (stack.length > 0 && !goalFound) {
        
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



function launch() {
    //requestAnimationFrame(launch)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    mainLoop()
}
//launch()

setInterval(launch, 10)
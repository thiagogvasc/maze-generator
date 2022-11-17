const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.backgroundColor = '#d3d3d3'


const ctx = canvas.getContext('2d')




class Cell {
    constructor(i, j, x, y, width, height) {
        this.i = i
        this.j = j
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.borders = {
            top: true,
            left: true,
            bottom: true,
            right: true
        }

        this.visited = false

        //this.fillColor = 'transparent'
        this.strokeColor = 'black'

        this.frameFillColor = 'transparent'
        this.baseFillColor = 'transparent'
    }

    draw(ctx) {
        ctx.beginPath()
        
        const { top, left, bottom, right } = this.borders
        if (top) {
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(this.x + this.width, this.y)
        }

        if (left) {
            ctx.moveTo(this.x, this.y) 
            ctx.lineTo(this.x, this.y + this.height)
        }

        if (bottom) {
            ctx.moveTo(this.x, this.y + this.height) 
            ctx.lineTo(this.x + this.width, this.y + this.height)
        }

        if (right) {
            ctx.moveTo(this.x + this.width, this.y) 
            ctx.lineTo(this.x + this.width, this.y + this.height)
        }

        ctx.strokeStyle = this.strokeColor
        ctx.fillStyle = this.frameFillColor
        ctx.stroke()

        ctx.beginPath()
        ctx.rect(this.x, this.y, this.width, this.height)
        ctx.fill()
        this.frameFillColor = this.baseFillColor
    }

    update() {
        
    }
}

class Grid {
    constructor(x, y, width, height, rows, cols) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.rows = rows
        this.cols = cols
        this.cells = []

        for (let i = 0; i < rows; i++) {
            const row = []
            for (let j = 0; j < cols; j++) {
                const cellWidth = this.width / cols
                const cellHeight = this.height / rows
                const cell = new Cell(i, j, this.x + j * cellWidth, this.y + i * cellHeight, cellWidth, cellHeight)
                row.push(cell)
            }
            this.cells.push(row)
        }
    }

    cellAt(i, j) {
        if (i < 0 || j < 0 || i >= this.cols || j >= this.rows) return undefined
        return this.cells[i][j]
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.width, this.height)
        ctx.stroke()
        this.cells.forEach(row => row.forEach(cell => cell.draw(ctx)))
    }

    update() {

    }
}


class MazeGenerator {
    constructor() {}

    generateMaze(grid) {
        const stack = []
        stack.push(grid.cellAt(0, 0))

        while (stack.length > 0) {
        
            const currCell = stack.pop()
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
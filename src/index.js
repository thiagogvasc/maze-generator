console.log('hello world')

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

        this.fillColor = 'transparent'
        this.strokeColor = 'black'
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
        ctx.closePath()

        ctx.strokeStyle = this.strokeColor
        ctx.fillStyle = this.fillColor
        ctx.stroke()

        ctx.beginPath()
        ctx.rect(this.x, this.y, this.width, this.height)
        ctx.fill()
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
        //ctx.strokeStyle = 'red'
        ctx.stroke()
        this.cells.forEach(row => row.forEach(cell => cell.draw(ctx)))
    }

    update() {

    }
}

// State
const grid = new Grid(10,10, 300, 300, 20, 20)
const stack = []
stack.push(grid.cellAt(0, 0))

// Loop
function mainLoop() {
    
    grid.draw(ctx)
    grid.update()

    if (stack.length > 0) {
        
        const currCell = stack.pop()
       // currCell.fillColor = 'red'
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
        console.log(neighbors)
        if (neighbors.length > 0) {
            stack.push(currCell)
        }

        const chosenCell = neighbors[Math.floor(Math.random()*neighbors.length)]
        if (chosenCell) {
            chosenCell.fillColor = 'blue'
            chosenCell.visited = true
            stack.push(chosenCell)
            
            console.log({chosenCell, currCell})
            if (chosenCell.i > currCell.i) {
                chosenCell.borders.top = false
                currCell.borders.bottom = false
            }

            if (chosenCell.i < currCell.i) {
                chosenCell.borders.bottom = false
                currCell.borders.top = false
            }

            if (chosenCell.j > currCell.j) {
                chosenCell.borders.left = false
                currCell.borders.right = false
            }

            if (chosenCell.j < currCell.j) {
                chosenCell.borders.right = false
                currCell.borders.left = false
            }
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
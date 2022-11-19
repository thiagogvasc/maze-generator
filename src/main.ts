import './style.css'
import { Grid } from './Grid'
import { MazeGenerator } from './MazeGenerator'
import { BreadthFirstSearch } from './BreadthFirstSearch'
import { SearchAlgorithm } from './SearchAlgorithm'
import { DepthFirstSearch } from './DepthFirstSearch'
import { Timer } from './Timer'


const canvas: HTMLCanvasElement = document.querySelector('canvas')!
canvas.width = 500
canvas.height = 500
canvas.style.backgroundColor = '#d3d3d3'
const ctx = canvas.getContext('2d')!

// State
const grid = new Grid(0, 0, canvas.width, canvas.height, 20, 20)
const mazeGenerator = new MazeGenerator()
mazeGenerator.generateMaze(grid)

const runButtonElem = document.getElementById('run') as HTMLButtonElement
let algorithm: SearchAlgorithm | null = new DepthFirstSearch(grid)
grid.cells.forEach(row => row.forEach(cell => cell.visited = false))

let runAlgorithm = false

// Timing and FPS
let fps = 0
const fpsElem = document.getElementById('fps')
setInterval(() => fpsElem!.innerText = `FPS: ${fps}`, 100)
const timer = new Timer()
timer.update()


// Button events
const generateMazeButtonElem = document.getElementById('generate-maze') as HTMLButtonElement
generateMazeButtonElem.onclick = () => {
    grid.cells.forEach(row => row.forEach(cell => {
        cell.visited = false
        cell.borders = {
            top: true,
            left: true,
            bottom: true,
            right: true
        }
        cell.baseFillColor = 'transparent'
        cell.frameFillColor = 'transparent'
    }))
    mazeGenerator.generateMaze(grid)
    runAlgorithm = false
}

runButtonElem.onclick = () => {
    const algorithmsSelectElem = document.getElementById('algorithms') as HTMLSelectElement
    const selectedAlgorithm = algorithmsSelectElem.value
    
    // Reset cell visited and borders state
    grid.cells.forEach(row => row.forEach(cell => {
        cell.visited = false
        cell.baseFillColor = 'transparent'
        cell.frameFillColor = 'transparent'
    }))

    if (selectedAlgorithm === 'dfs') {
        algorithm = new DepthFirstSearch(grid)
    } else if (selectedAlgorithm === 'bfs') {
        algorithm = new BreadthFirstSearch(grid)
    }
    console.log(algorithm)
    runAlgorithm = true
}


function loop() {
    timer.update()
    fps = Math.floor(1 / (timer.elapsedTime/1000))

    requestAnimationFrame(loop)

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    grid.draw(ctx)
    console.log(runAlgorithm)
    runAlgorithm && algorithm?.update()
}
loop()

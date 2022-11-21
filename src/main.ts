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

const initialNodeXInputElem = document.getElementById('initial-node-x') as HTMLInputElement
const initialNodeXMsgElem = document.getElementById('initial-node-x-msg') as HTMLSpanElement

const initialNodeYInputElem = document.getElementById('initial-node-y') as HTMLInputElement
const initialNodeYMsgElem = document.getElementById('initial-node-y-msg') as HTMLSpanElement

const goalNodeXInputElem = document.getElementById('goal-node-x') as HTMLInputElement
const goalNodeXMsgElem = document.getElementById('goal-node-x-msg') as HTMLSpanElement

const goalNodeYInputElem = document.getElementById('goal-node-y') as HTMLInputElement
const goalNodeYMsgElem = document.getElementById('goal-node-y-msg') as HTMLSpanElement

// State
const grid = new Grid(0, 0, canvas.width, canvas.height, 21, 21)
initialNodeXInputElem.value = '0'
initialNodeYInputElem.value = '0'
goalNodeXInputElem.value = `${grid.cols - 1}`
goalNodeYInputElem.value = `${grid.rows - 1}`
let initialNode = grid.cellAt(parseInt(initialNodeXInputElem.value), parseInt(initialNodeYInputElem.value))!
let goalNode = grid.cellAt(grid.rows - 1, grid.cols - 1)!
const mazeGenerator = new MazeGenerator()
mazeGenerator.generateMaze(grid)

const runButtonElem = document.getElementById('run') as HTMLButtonElement
let algorithm: SearchAlgorithm | null = new DepthFirstSearch(grid, initialNode!, goalNode!)
grid.cells.forEach(row => row.forEach(cell => cell.visited = false))

let runAlgorithm = false

// Timing and FPS
let fps = 0
const fpsElem = document.getElementById('fps')
setInterval(() => fpsElem!.innerText = `FPS: ${fps}`, 100)
const timer = new Timer()
timer.update()

function resetGrid() {
    grid.cells.forEach(row => row.forEach(cell => {
        cell.visited = false
        cell.frameFillColor = 'transparent'
        cell.baseFillColor = 'transparent'
    }))
}

initialNodeXInputElem.onkeyup = () => {
    const value = initialNodeXInputElem.value
    if (isNaN(value as any)) {
        console.log('not a number')
        initialNodeXMsgElem.style.color = 'red'
        initialNodeXMsgElem.innerText = 'Value must be a number'
        initialNodeXInputElem.value = '0'
    } else { // valid input
        initialNodeXMsgElem.innerText = ''
        initialNodeXInputElem.value = value
        if (grid.cellAt(parseInt(initialNodeXInputElem.value), parseInt(initialNodeYInputElem.value))!) {
            initialNode.baseFillColor = 'transparent'
            initialNode = grid.cellAt(parseInt(initialNodeXInputElem.value), parseInt(initialNodeYInputElem.value))!
            initialNode.baseFillColor = 'blue'
        }
        
    }
}
initialNodeYInputElem.onkeyup = () => {
    const value = initialNodeYInputElem.value
    if (isNaN(value as any)) {
        console.log('not a number')
        initialNodeYMsgElem.style.color = 'red'
        initialNodeYMsgElem.innerText = 'Value must be a number'
        initialNodeYInputElem.value = '0'
    } else { // valid input
        initialNodeYMsgElem.innerText = ''
        initialNodeYInputElem.value = value
        if (grid.cellAt(parseInt(initialNodeXInputElem.value), parseInt(initialNodeYInputElem.value))!) {
            initialNode.baseFillColor = 'transparent'
            initialNode = grid.cellAt(parseInt(initialNodeXInputElem.value), parseInt(initialNodeYInputElem.value))!
            initialNode.baseFillColor = 'blue'
        }
    }
}

goalNodeXInputElem.onkeyup = () => {
    const value = goalNodeXInputElem.value
    if (isNaN(value as any)) {
        console.log('not a number')
        goalNodeXMsgElem.style.color = 'red'
        goalNodeXMsgElem.innerText = 'Value must be a number'
        goalNodeXInputElem.value = '0'
    } else { // valid input
        goalNodeXMsgElem.innerText = ''
        goalNodeXInputElem.value = value
        if (grid.cellAt(parseInt(goalNodeXInputElem.value), parseInt(goalNodeYInputElem.value))!) {
            goalNode.baseFillColor = 'transparent'
            goalNode = grid.cellAt(parseInt(goalNodeXInputElem.value), parseInt(goalNodeYInputElem.value))!
            goalNode.baseFillColor = 'green'
        }
    }
}
goalNodeYInputElem.onkeyup = () => {
    const value = goalNodeYInputElem.value
    if (isNaN(value as any)) {
        console.log('not a number')
        goalNodeYMsgElem.style.color = 'red'
        goalNodeYMsgElem.innerText = 'Value must be a number'
        goalNodeYInputElem.value = '0'
    } else { // valid input
        goalNodeYMsgElem.innerText = ''
        goalNodeYInputElem.value = value
        if (grid.cellAt(parseInt(goalNodeXInputElem.value), parseInt(goalNodeYInputElem.value))!) {
            goalNode.baseFillColor = 'transparent'
            goalNode = grid.cellAt(parseInt(goalNodeXInputElem.value), parseInt(goalNodeYInputElem.value))!
            goalNode.baseFillColor = 'green'
        }
    }
}

const stopButtonElem = document.getElementById('stop') as HTMLButtonElement
const clearButtonElem = document.getElementById('clear') as HTMLButtonElement
stopButtonElem.onclick = () => {
    runAlgorithm = false
}

clearButtonElem.onclick = () => {
    runAlgorithm = false
    resetGrid()
    initialNode.baseFillColor = 'blue'
    goalNode.baseFillColor = 'green'
}

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
        algorithm = new DepthFirstSearch(grid, initialNode, goalNode)
    } else if (selectedAlgorithm === 'bfs') {
        algorithm = new BreadthFirstSearch(grid, initialNode, goalNode)
    }
    console.log(algorithm)
    runAlgorithm = true
}


function loop() {
    timer.update()
    fps = Math.floor(1 / (timer.elapsedTime/1000))
    
    initialNodeXInputElem.disabled = !algorithm?.finished()! && runAlgorithm
    initialNodeYInputElem.disabled = !algorithm?.finished()! && runAlgorithm
    goalNodeXInputElem.disabled = !algorithm?.finished()! && runAlgorithm
    goalNodeYInputElem.disabled = !algorithm?.finished()! && runAlgorithm
    
    
    requestAnimationFrame(loop)

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    grid.draw(ctx)
    console.log(runAlgorithm)
    console.log({finished: !algorithm?.finished()})
    if (runAlgorithm && !algorithm?.finished()) {

        algorithm?.update()
    } 
}
loop()

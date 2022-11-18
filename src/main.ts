import './style.css'
import { Grid } from './Grid'
//import { Cell } from './Cell'
import { MazeGenerator } from './MazeGenerator'
//import { DepthFirstSearch } from './DepthFirstSearch'
import { BreadthFirstSearch } from './BreadthFirstSearch'


const canvas: HTMLCanvasElement = document.querySelector('canvas')!
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.backgroundColor = '#d3d3d3'


const ctx = canvas.getContext('2d')!




// State
const grid = new Grid(10, 10, 500, 500, 20, 20)
//console.log(grid.cells)
const mazeGenerator = new MazeGenerator()
mazeGenerator.generateMaze(grid)



grid.cells.forEach(row => row.forEach(cell => cell.visited = false))

let dfs = new BreadthFirstSearch(grid)
dfs.execute()
console.log(dfs)

let fps = 0
const fpsElem = document.getElementById('fps')
fpsElem!.innerText = `FPS: ${fps}`

let startTime = Date.now()
let currentTime = startTime
let elapsedTime = currentTime - startTime

setInterval(() => fpsElem!.innerText = `FPS: ${fps}`, 100)

grid.draw(ctx)
function launch() {
    currentTime = Date.now()
    elapsedTime = currentTime - startTime
    startTime = currentTime
    fps = Math.floor(1 / (elapsedTime/1000))


    requestAnimationFrame(launch)

    
    grid.draw(ctx)
    grid.update()
}
launch()

import { Cell } from './Cell'

export class Grid {
	x: number
	y: number
	width: number
	height: number
	rows: number
	cols: number

	cells: Cell[][]

  constructor(x: number, y: number, width: number, height: number, rows: number, cols: number) {
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.rows = rows
		this.cols = cols
		this.cells = []
		

		for (let i = 0; i < rows; i++) {
			const row: Array<Cell> = []
			for (let j = 0; j < cols; j++) {
				const cellWidth = this.width / cols
				const cellHeight = this.height / rows
				const cell = new Cell(i, j, this.x + j * cellWidth, this.y + i * cellHeight, cellWidth, cellHeight)
				row.push(cell)
			}
			this.cells.push(row)
		}
  }

  cellAt(i: number, j: number) {
		if (i < 0 || j < 0 || i >= this.cols || j >= this.rows) return undefined

		return this.cells[i][j]
  }

  draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath()
		ctx.rect(this.x, this.y, this.width, this.height)
		ctx.stroke()
		this.cells.forEach(row => row.forEach(cell => cell.draw(ctx)))
  }

  update() {

  }
}
export class Cell {
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
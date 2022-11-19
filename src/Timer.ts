export class Timer {
  startTime: number = 0
  currentTime: number = 0
  elapsedTime: number = 0

  constructor() {}

  update() {
      this.currentTime = Date.now()
      this.elapsedTime = this.currentTime - this.startTime
      this.startTime = this.currentTime
  }
}
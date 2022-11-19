import { Grid } from './Grid'

export interface SearchAlgorithm {
  update(): void
  execute(grid: Grid): void
}
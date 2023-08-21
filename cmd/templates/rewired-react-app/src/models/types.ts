export type PickSome<T, K extends keyof T> = {
  [P in keyof Pick<T, K>]?: T[P]
}

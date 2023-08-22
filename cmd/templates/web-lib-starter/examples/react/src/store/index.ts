import { useSyncExternalStore } from 'react'
import { ObservableStore } from './observer'

export type CounterState = {
  count: number
}

const counterStore = new ObservableStore<CounterState>({ count: 0 })

export function useCounterStore() {
  return useSyncExternalStore(counterStore.subscribe.bind(counterStore), counterStore.getState.bind(counterStore))
}

export function useCounterDispatch() {
  return counterStore.setState.bind(counterStore)
}

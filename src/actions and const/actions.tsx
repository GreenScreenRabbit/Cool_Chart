import {
    COUNT_YEAR, SET_INITIAL_AMOUNT, SET_INTEREST_ACCRUALS, SET_PERIODICITY, SET_REPLENISHMENT
} from './const'

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never

type GetActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>

export const actions = {
    setCounterYear: (year: string) => ({ type: COUNT_YEAR, year } as const),
    setInitialAmount: (amount: string) => ({ type: SET_INITIAL_AMOUNT, amount } as const),
    setReplenishment: (replenishment: string) => ({ type: SET_REPLENISHMENT, replenishment } as const),
    setPeriodicity: (periodicity: string) => ({ type: SET_PERIODICITY, periodicity } as const),
    setInterestAccruals: (interestAccruals: string) => ({ type: SET_INTEREST_ACCRUALS, interestAccruals  } as const),
}

export type ActionsTypes = GetActionsTypes<typeof actions>
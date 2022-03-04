import { combineReducers } from "redux";
import { actions, ActionsTypes } from "./actions and const/actions";
import {
    COUNT_YEAR,
    SET_INITIAL_AMOUNT,
    SET_INTEREST_ACCRUALS,
    SET_PERIODICITY,
    SET_REPLENISHMENT,
} from "./actions and const/const";

type InitialStateType = {
    countYear: string;

    initialAmount: string;
    replenishment: string;
    periodicity: string;
    interestAccruals: string;
};

const initialState: InitialStateType = {
    countYear: "",
    initialAmount: "",
    replenishment: "",
    periodicity: "EVERY YEAR",
    interestAccruals: "",
};

const stateReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case COUNT_YEAR: {
            return { ...state, countYear: action.year };
        }
        case SET_INITIAL_AMOUNT: {
            return { ...state, initialAmount: action.amount };
        }
        case SET_REPLENISHMENT: {
            return { ...state, replenishment: action.replenishment };
        }
        case SET_PERIODICITY: {
            return { ...state, periodicity: action.periodicity };
        }
        case SET_INTEREST_ACCRUALS: {
            return { ...state, interestAccruals: action.interestAccruals };
        }

        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    generalState: stateReducer,
});

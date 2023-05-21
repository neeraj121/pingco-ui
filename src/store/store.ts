import {
    configureStore,
    ThunkAction,
    Action,
    combineReducers,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "./auth/auth.reducer";
import numberBlocksReducer from "./numberBlocks/numberBlocks.reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    numberBlocks: numberBlocksReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        const middlewares = getDefaultMiddleware({});
        if (process.env.NODE_ENV === "development") {
            return middlewares.concat(logger);
        }
        return middlewares;
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

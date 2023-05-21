import {
    configureStore,
    ThunkAction,
    Action,
    combineReducers,
} from "@reduxjs/toolkit";
import authReducer from "./auth/auth.reducer";
import logger from "redux-logger";

const rootReducer = combineReducers({
    auth: authReducer,
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

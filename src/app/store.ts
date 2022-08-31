import { AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { appReducer } from './app-reducer';

const rootReducer = combineReducers({
  app: appReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootStateType = ReturnType<typeof rootReducer>

export type DispatchType = ThunkDispatch<RootStateType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<DispatchType>();
export type ThunkType<ReturnType = Promise<any> | void> = ThunkAction<ReturnType, RootStateType, unknown, AnyAction>
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

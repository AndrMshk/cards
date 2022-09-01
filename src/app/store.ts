import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { appReducer } from './app-reducer';
import { authReducer } from '../components/auth/auth-reducer';
import { profileReducer } from '../components/profile/profile-reducer';
import { DispatchType, RootStateType } from './types';
import { cardsReducer } from '../components/cards/cards-reducer';
import { packsReducer } from '../components/packs/packs-reducer';

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  packs: packsReducer,
  cards: cardsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export const useAppDispatch = () => useDispatch<DispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { appReducer } from './app-reducer';
import { authReducer } from '../../components/auth/bll-dal/auth-reducer';
import { profileReducer } from '../../components/profile/bll-dal/profile-reducer';
import { DispatchType, RootStateType } from './types';
import { cardsReducer } from '../../components/cards/bll-dal/cards-reducer';
import { packsReducer } from '../../components/packs/bll-dal/packs-reducer';
import { modalReducer } from '../../common/basicModal/bll/modal-reducer';

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  packs: packsReducer,
  cards: cardsReducer,
  modals: modalReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export const useAppDispatch = () => useDispatch<DispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

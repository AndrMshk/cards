import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { appReducer } from './app-reducer';
import { authReducer } from '../../components/auth/bll-dal/auth-reducer';
import { profileReducer } from '../../components/profile/bll-dal/profile-reducer';
import { DispatchType, RootStateType } from './types';
import { cardsReducer } from '../../components/cards/bll-dal/cards-reducer';
import { packsReducer } from '../../components/packs/bll-dal/packs-reducer';
import { chatReducer } from '../../components/chat/bll-dal/chat-reducer';


export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  packs: packsReducer,
  cards: cardsReducer,
  chat: chatReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export const useAppDispatch = () => useDispatch<DispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

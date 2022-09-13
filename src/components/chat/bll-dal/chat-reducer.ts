import { MessageType, ThunkType } from '../../../app/bll-dal/types';
import { chatAPI } from './chat-api';

const initialState = {
  userName: '',
  messages: [{ message: '111', user: { name: '123', _id: '1', avatar: '' }, _id: '2' }] as MessageType[],
  readMessagesCount: 0,
};

export const chatReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'chat/SET-MESSAGES':
      return { ...state, messages: action.allMassages };
    case 'chat/SET-NEW-MESSAGE':
      return { ...state, messages: [...state.messages, action.massage] };
    case 'chat/SET-USER-NAME':
      return { ...state, userName: action.userName };
    case 'chat/SET-READ-MESSAGES-COUNT':
      return { ...state, readMessagesCount: action.messageCount };
    default:
      return state;
  }
};

export const initAllMessagesAction = (allMassages: MessageType[]) =>
  ({ type: 'chat/SET-MESSAGES', allMassages } as const);
export const initNewMessageAction = (massage: MessageType) =>
  ({ type: 'chat/SET-NEW-MESSAGE', massage } as const);
export const setUserNameAction = (userName: string) =>
  ({ type: 'chat/SET-USER-NAME', userName } as const);
export const setReadMessagesCountAction = (messageCount: number) =>
  ({ type: 'chat/SET-READ-MESSAGES-COUNT', messageCount } as const);

type InitialStateType = typeof initialState
export type InitAllMessagesActionType = ReturnType<typeof initAllMessagesAction>
export type InitNewMessageActionType = ReturnType<typeof initNewMessageAction>
export type SetUserNameActionType = ReturnType<typeof setUserNameAction>
export type SetReadMessagesCountActionType = ReturnType<typeof setReadMessagesCountAction>

export type ActionsType =
  | InitAllMessagesActionType
  | InitNewMessageActionType
  | SetUserNameActionType
  | SetReadMessagesCountActionType

export const openConnectionTC = (userName: string): ThunkType => dispatch => {
  chatAPI.openConnection();
  chatAPI.initAllMessages(messages => {
    dispatch(initAllMessagesAction(messages));
  });
  chatAPI.initNewMessage(message => {
    dispatch(initNewMessageAction(message));
  });
  chatAPI.setUserName(userName);
  dispatch(setUserNameAction(userName));
};

export const sendNewMessageTextTC = (messageText: string): ThunkType => () => {
  chatAPI.sentMessage(messageText);
};

export const closeConnectionTC = (): ThunkType => () => {
  chatAPI.closeConnection();
};

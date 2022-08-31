import { ThunkType } from './store';

const initialState = {
  error: null as null | string,
  isInitialized: false,
};
type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'app/SET-ERROR':
      return { ...state, error: action.error };
    case 'app/SET-IS-INITIALIZED':
      return { ...state, isInitialized: action.isInitialized };
    default:
      return state;
  }
};

export const setAppErrorAction = (error: null | string) =>
  ({ type: 'app/SET-ERROR', error } as const);
export const setAppIsInitializedAction = (isInitialized: boolean) =>
  ({ type: 'app/SET-IS-INITIALIZED', isInitialized } as const);

export const authMe = (): ThunkType => (dispatch) => {};

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAction>
export type SetAppIsInitializedActionType = ReturnType<typeof setAppIsInitializedAction>
export type ActionsType = SetAppErrorActionType | SetAppIsInitializedActionType

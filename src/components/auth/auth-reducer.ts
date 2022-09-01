const initialState = { isLoggedIn: false };

export const authReducer = (
  state: InitialStateType = initialState, action: LoginActionType): InitialStateType => {
  switch (action.type) {
    case 'LOGIN/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value };
    default:
      return state;
  }
};

export const setIsLoggedInAction = (value: boolean) => ({ type: 'LOGIN/SET-IS-LOGGED-IN', value } as const);

export type InitialStateType = typeof initialState
export type LoginActionType = SetIsLoggedInActionType
export type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedInAction>

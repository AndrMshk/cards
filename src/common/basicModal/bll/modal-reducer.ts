const initialState = {
  isOpen: false,
  modalData: {} as any,
};

export const modalReducer = (state: InitialStateType = initialState, action: ModalActionType): InitialStateType => {
  switch (action.type) {
    case 'modal/OPEN-CLOSE-TOGGLE':
      return { ...state, isOpen: action.isOpen };
    case 'modal/SET-MODAL-DATA':
      return { ...state, modalData: action.data };
    default:
      return state;
  }
};

export const toggleModalAction = (isOpen: boolean) => ({ type: 'modal/OPEN-CLOSE-TOGGLE', isOpen } as const);
export const setModalDataAction = (data: any) => ({ type: 'modal/SET-MODAL-DATA', data } as const);

type InitialStateType = typeof initialState
type ModalActionType =
  | ReturnType<typeof toggleModalAction>
  | ReturnType<typeof setModalDataAction>

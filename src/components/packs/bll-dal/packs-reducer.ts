import { PackType } from '../../../app/bll-dal/types';

const initialState = {
  cardPacks: [] as PackType[],
  currentCardPack: {} as PackType,
  page: 1,
  pageCount: 5,
  cardPacksTotalCount: 0,
  minCardsCount: 0,
  maxCardsCount: 110,
  token: '',
  tokenDeathTime: 0,
  filterValues: {
    sortOrder: undefined as string | undefined,
    filterByCardsCount: {
      min: undefined as number | undefined,
      max: undefined as number | undefined,
    },
    packName: '' as string | undefined,
    isOwn: false,
  },
};

export const packsReducer = (state: InitialStateType = initialState, action: PacksActionType): InitialStateType => {
  switch (action.type) {
    case 'packs/SET-PACKS':
      return { ...state, cardPacks: [...action.packs], cardPacksTotalCount: action.packsTotalCount };
    case 'packs/CREATE-PACK':
      return { ...state, cardPacks: [action.pack, ...state.cardPacks] };
    case 'packs/DELETE-PACK':
      return { ...state, cardPacks: state.cardPacks.filter(el => el._id !== action.packId) };
    case 'packs/UPDATE-PACK':
      return {
        ...state, cardPacks: state.cardPacks.map(el => el._id === action.packId
          ? { ...el, name: action.newPackName }
          : el),
      };
    case 'packs/SET-CURRENT-PAGE':
      return { ...state, page: action?.page };
    case 'packs/SET-CURRENT-PAGE-COUNT':
      return { ...state, pageCount: action?.pageCount };
    case 'packs/SET-SORT-ORDER':
      return { ...state, filterValues: { ...state.filterValues, sortOrder: action.sortOrder } };
    case 'packs/SORT-PACK-BY-CARDS-COUNT':
      return {
        ...state,
        filterValues: {
          ...state.filterValues,
          filterByCardsCount: { ...state.filterValues.filterByCardsCount, ...action.count },
        },
      };
    case 'packs/SORT-PACK-BY-NAME':
      return { ...state, filterValues: { ...state.filterValues, packName: action.name } };
    case 'packs/SHOW-MY-PACKS':
      return { ...state, filterValues: { ...state.filterValues, isOwn: action.isOwn } };
    case 'packs/SET-CURRENT-PACK':
      return { ...state, currentCardPack: { ...action.currentCardPack } };
    case 'packs/SET-MIN-MAX-CARDS-COUNT':
      return { ...state, minCardsCount: action.minCardsCount, maxCardsCount: action.maxCardsCount };
    case 'packs/RESET-FILTERS':
      return {
        ...state, page: 1, pageCount: 5, filterValues:
          { sortOrder: undefined, isOwn: false, packName: '', filterByCardsCount: { max: undefined, min: undefined } },
      };
    default:
      return state;
  }
};

export const setPacksAction = (packs: PackType[], packsTotalCount: number) => ({
  type: 'packs/SET-PACKS', packs, packsTotalCount,
} as const);
export const createPackAction = (pack: PackType) => ({ type: 'packs/CREATE-PACK', pack } as const);
export const deletePackAction = (packId: string) => ({ type: 'packs/DELETE-PACK', packId } as const);
export const updatePackAction = (packId: string, newPackName: string | undefined) => ({
  type: 'packs/UPDATE-PACK', packId, newPackName,
} as const);
export const setCurrentPageAction = (page: number) => ({ type: 'packs/SET-CURRENT-PAGE', page } as const);
export const setCurrentPageCountAction = (pageCount: number) => ({
  type: 'packs/SET-CURRENT-PAGE-COUNT', pageCount,
} as const);
export const setSortOrderAction = (sortOrder: string | undefined) => ({
  type: 'packs/SET-SORT-ORDER', sortOrder,
} as const);
export const sortPacksByCardsCountAction = (count: { min?: number | undefined, max?: number | undefined }) =>
  ({ type: 'packs/SORT-PACK-BY-CARDS-COUNT', count } as const);
export const sortPacksByNameAction = (name: string | undefined) =>
  ({ type: 'packs/SORT-PACK-BY-NAME', name } as const);
export const showMyPacksAction = (isOwn: boolean) => ({ type: 'packs/SHOW-MY-PACKS', isOwn } as const);
export const setCurrentPackAction = (currentCardPack: PackType) => ({
  type: 'packs/SET-CURRENT-PACK', currentCardPack,
} as const);
export const setMinMaxCardsCountAction = (minCardsCount: number, maxCardsCount: number) => ({
  type: 'packs/SET-MIN-MAX-CARDS-COUNT', minCardsCount, maxCardsCount,
} as const);
export const resetAllFiltersAction = () => ({ type: 'packs/RESET-FILTERS' } as const);

type InitialStateType = typeof initialState
type PacksActionType =
  | ReturnType<typeof setPacksAction>
  | ReturnType<typeof createPackAction>
  | ReturnType<typeof deletePackAction>
  | ReturnType<typeof updatePackAction>
  | ReturnType<typeof setCurrentPageAction>
  | ReturnType<typeof setCurrentPageCountAction>
  | ReturnType<typeof setSortOrderAction>
  | ReturnType<typeof sortPacksByCardsCountAction>
  | ReturnType<typeof sortPacksByNameAction>
  | ReturnType<typeof showMyPacksAction>
  | ReturnType<typeof setCurrentPackAction>
  | ReturnType<typeof setMinMaxCardsCountAction>
  | ReturnType<typeof resetAllFiltersAction>





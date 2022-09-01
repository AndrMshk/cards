import { CardType, UpdatedGradeCardResponseType } from '../../app/types';

const initialState = {
  cards: [] as CardType[],
  packUserId: '',
  page: 1,
  pageCount: 5,
  cardsTotalCount: 0,
  cardQuestion: '',
  cardAnswer: '',
  minGrade: 0,
  maxGrade: 0,
  token: '',
  tokenDeathTime: 0,
};

export const cardsReducer = (state: InitialStateType = initialState, action: CardsActionType): InitialStateType => {
  switch (action.type) {
    case 'cards/SET-CARDS':
      return {
        ...state,
        cards: [...action.cards],
        cardsTotalCount: action.cardsTotalCount,
        packUserId: action.packUserId,
      };
    case 'cards/CREATE-CARD':
      return { ...state, cards: [action.card, ...state.cards] };
    case 'cards/DELETE-CARD':
      return { ...state, cards: state.cards.filter(el => el._id !== action.cardId) };
    case 'cards/UPDATE-CARD':
      return {
        ...state, cards: state.cards.map(el => el._id === action.cardId
          ? { ...el, question: action?.question, answer: action?.answer }
          : el),
      };
    case 'cards/SET-CURRENT-PAGE':
      return { ...state, page: action.page };
    case 'cards/SET-CURRENT-PAGE-COUNT':
      return { ...state, pageCount: action.pageCount };
    case 'cards/SEARCH-QUESTION':
      return { ...state, cardQuestion: action.cardQuestion };
    case 'cards/SEARCH-ANSWER':
      return { ...state, cardAnswer: action.cardAnswer };
    case 'cards/UPDATE-CARD-GRADE':
      return {
        ...state,
        cards: state.cards.map(
          el => el._id === action.card.card_id ? { ...el, shots: action.card.shots, grade: action.card.grade } : el),
      };
    case 'cards/SET-DEFAULT-PAGE-COUNT':
      return { ...state, pageCount: 5 };
    default:
      return state;
  }
};

export const setCardsAction = (cards: CardType[], cardsTotalCount: number, packUserId: string) =>
  ({ type: 'cards/SET-CARDS', cards, cardsTotalCount, packUserId } as const);
export const createCardAction = (card: CardType) => ({ type: 'cards/CREATE-CARD', card } as const);
export const deleteCardAction = (cardId: string) => ({ type: 'cards/DELETE-CARD', cardId } as const);
export const updateCardAction = (cardId: string, question?: string, answer?: string) =>
  ({ type: 'cards/UPDATE-CARD', cardId, answer, question } as const);
export const setCurrentPageAction = (page: number) =>
  ({ type: 'cards/SET-CURRENT-PAGE', page } as const);
export const setCurrentPageCountAction = (pageCount: number) =>
  ({ type: 'cards/SET-CURRENT-PAGE-COUNT', pageCount } as const);
export const searchQuestionAction = (cardQuestion: string) => ({
  type: 'cards/SEARCH-QUESTION',
  cardQuestion,
} as const);
export const searchAnswerAction = (cardAnswer: string) => ({ type: 'cards/SEARCH-ANSWER', cardAnswer } as const);
export const updateCardGradeAction = (card: UpdatedGradeCardResponseType) =>
  ({ type: 'cards/UPDATE-CARD-GRADE', card } as const);
export const setDefaultPageCountValueAction = () => ({ type: 'cards/SET-DEFAULT-PAGE-COUNT' } as const);

type InitialStateType = typeof initialState
type CardsActionType =
  | ReturnType<typeof setCardsAction>
  | ReturnType<typeof createCardAction>
  | ReturnType<typeof deleteCardAction>
  | ReturnType<typeof updateCardAction>
  | ReturnType<typeof setCurrentPageAction>
  | ReturnType<typeof setCurrentPageCountAction>
  | ReturnType<typeof searchQuestionAction>
  | ReturnType<typeof searchAnswerAction>
  | ReturnType<typeof updateCardGradeAction>
  | ReturnType<typeof setDefaultPageCountValueAction>

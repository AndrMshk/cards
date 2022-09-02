import { CardType, ParamsGetCardsRequestType, ThunkType } from '../../../app/bll-dal/types';
import { setAppErrorAction, setAppIsLoadingAction } from '../../../app/bll-dal/app-reducer';
import { cardsApi } from './cardsApi';
import axios from 'axios';
import {
  createCardAction,
  deleteCardAction,
  setCardsAction,
  setCurrentPageAction,
  setCurrentPageCountAction,
  updateCardAction,
  updateCardGradeAction,
} from './cards-reducer';

export const setCards = (params: ParamsGetCardsRequestType): ThunkType => async dispatch => {
  try {
    dispatch(setAppIsLoadingAction(true));
    const res = await cardsApi.setCards(params);
    dispatch(setCurrentPageAction(params.page || 1));
    dispatch(setCurrentPageCountAction(params.pageCount || 5));
    dispatch(setCardsAction(res.data.cards, res.data.cardsTotalCount, res.data.packUserId));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(setAppErrorAction(error.message));
    } else {
      dispatch(setAppErrorAction('Some error'));
    }
  } finally {
    dispatch(setAppIsLoadingAction(false));
  }
};

export const createCard = (newCard: CardType): ThunkType => async dispatch => {
  try {
    dispatch(setAppIsLoadingAction(true));
    const res = await cardsApi.createCard(newCard);
    dispatch(createCardAction(res.data.newCard));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(setAppErrorAction(error.message));
    } else {
      dispatch(setAppErrorAction('Some error'));
    }
  } finally {
    dispatch(setAppIsLoadingAction(false));
  }
};
export const deleteCard = (cardId: string): ThunkType => async dispatch => {
  try {
    dispatch(setAppIsLoadingAction(true));
    await cardsApi.deleteCard(cardId);
    dispatch(deleteCardAction(cardId));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(setAppErrorAction(error.message));
    } else {
      dispatch(setAppErrorAction('Some error'));
    }
  } finally {
    dispatch(setAppIsLoadingAction(false));
  }
};
export const updateCard = (cardId: string, question?: string, answer?: string): ThunkType => async dispatch => {
  try {
    dispatch(setAppIsLoadingAction(true));
    await cardsApi.updateCard(cardId, question, answer);
    dispatch(updateCardAction(cardId, question, answer));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(setAppErrorAction(error.message));
    } else {
      dispatch(setAppErrorAction('Some error'));
    }
  } finally {
    dispatch(setAppIsLoadingAction(false));
  }
};
export const updateCardGrade = (cardId: string, grade: number): ThunkType => async dispatch => {
  try {
    dispatch(setAppIsLoadingAction(true));
    const res = await cardsApi.updateGrade(cardId, grade);
    dispatch(updateCardGradeAction(res.data.updatedGrade));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(setAppErrorAction(error.message));
    } else {
      dispatch(setAppErrorAction('Some error'));
    }
  } finally {
    dispatch(setAppIsLoadingAction(false));
  }
};

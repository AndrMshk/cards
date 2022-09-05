import { AxiosResponse } from 'axios';
import { instance } from '../../../app/bll-dal/app-api';
import {
  CardType,
  GetCardsResponseType,
  ParamsGetCardsRequestType,
  UpdatedGradeResponseType,
} from '../../../app/bll-dal/types';

export const cardsApi = {
  setCards(params: ParamsGetCardsRequestType) {
    return instance.get<ParamsGetCardsRequestType, AxiosResponse<GetCardsResponseType>>(`cards/card`, { params: { ...params } });
  },
  createCard(newCard: CardType) {
    return instance.post<CardType, AxiosResponse<any>>(`cards/card`, { card: { ...newCard } });
  },
  deleteCard(cardId: string) {
    return instance.delete<{ cardId: number }, AxiosResponse<any>>(`cards/card/?id=${cardId}`);
  },
  updateCard(cardId: string, question?: string, answer?: string) {
    return instance.put<{ cardId: number, question?: string, answer?: string }, AxiosResponse<any>>
    (`cards/card`, { card: { _id: cardId, question, answer } });
  },
  updateGrade(cardId: string, grade: number) {
    return instance.put<{ cardId: string, grade: number }, AxiosResponse<UpdatedGradeResponseType>>('/cards/grade',
      { grade, card_id: cardId });
  },
};





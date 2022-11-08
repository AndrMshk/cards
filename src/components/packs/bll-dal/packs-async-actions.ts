import { ParamsGetPackRequestType, ThunkType } from '../../../app/bll-dal/types';
import { setAppIsLoadingAction } from '../../../app/bll-dal/app-reducer';
import { packsApi } from './packsApi';
import {
  createPackAction,
  deletePackAction,
  setCurrentPageAction,
  setCurrentPageCountAction,
  setMinMaxCardsCountAction,
  setPacksAction,
  updatePackAction,
} from './packs-reducer';
import { axiosErrorHandle } from '../../../utils/axiosErrorHandle';

export const setPacks = (params: ParamsGetPackRequestType): ThunkType => async dispatch => {
  try {
    dispatch(setAppIsLoadingAction(true));
    const res = await packsApi.setPacks(params);
    dispatch(setCurrentPageAction(params.page || 1));
    dispatch(setCurrentPageCountAction(params.pageCount || 10));
    dispatch(setMinMaxCardsCountAction(res.data.minCardsCount, res.data.maxCardsCount));
    dispatch(setPacksAction(res.data.cardPacks, res.data.cardPacksTotalCount));
  } catch (error) {
    axiosErrorHandle(error, dispatch);
  } finally {
    dispatch(setAppIsLoadingAction(false));
  }
};

export const createPack = (newPackName?: string, cover?: string): ThunkType => async dispatch => {
  try {
    dispatch(setAppIsLoadingAction(true));
    const res = await packsApi.createPack(newPackName, cover);
    dispatch(createPackAction(res.data.newCardsPack));
  } catch (error) {
    axiosErrorHandle(error, dispatch);
  } finally {
    dispatch(setAppIsLoadingAction(false));
  }
};

export const deletePack = (packId: string): ThunkType => async dispatch => {
  try {
    dispatch(setAppIsLoadingAction(true));
    await packsApi.deletePack(packId);
    dispatch(deletePackAction(packId));
  } catch (error) {
    axiosErrorHandle(error, dispatch);
  } finally {
    dispatch(setAppIsLoadingAction(false));
  }
};

export const updatePack = (packId: string, name?: string, deckCover?: string): ThunkType => async dispatch => {
  try {
    dispatch(setAppIsLoadingAction(true));
    await packsApi.updatePack(packId, name, deckCover);
    dispatch(updatePackAction(packId, { deckCover, name }));
  } catch (error) {
    axiosErrorHandle(error, dispatch);
  } finally {
    dispatch(setAppIsLoadingAction(false));
  }
};

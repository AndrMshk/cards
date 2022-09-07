import { AxiosResponse } from 'axios';
import { GetPacksResponseType, ParamsGetPackRequestType } from '../../../app/bll-dal/types';
import { instance } from '../../../app/bll-dal/app-api';

export const packsApi = {
  setPacks(params: ParamsGetPackRequestType) {
    return instance.get<ParamsGetPackRequestType, AxiosResponse<GetPacksResponseType>>(`cards/pack`, {
      params: { ...params },
    });
  },
  createPack(newPackName: string | undefined, deckCover: string | undefined) {
    return instance.post<{ cardsPack: { name?: string, deckCover?: string, private?: boolean } }, AxiosResponse<any>>
    ('cards/pack', { cardsPack: { name: newPackName, deckCover: deckCover } });
  },
  deletePack(packId: string) {
    return instance.delete<AxiosResponse<any>>(`cards/pack/?id=${packId}`);
  },
  updatePack(packId: string, newPackName: string | undefined, deckCover: string | undefined) {
    return instance.put<{ cardsPack: { _id: string, name?: string, deckCover?: string } }, AxiosResponse<any>>
    (`/cards/pack`, { cardsPack: { _id: packId, name: newPackName, deckCover } });
  },
};


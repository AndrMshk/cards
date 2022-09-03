import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { rootReducer } from './store';

export type ThunkType<ReturnType = Promise<any> | void> = ThunkAction<ReturnType, RootStateType, unknown, AnyAction>
export type RootStateType = ReturnType<typeof rootReducer>
export type DispatchType = ThunkDispatch<RootStateType, unknown, AnyAction>

export type PackType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string | undefined
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: Date
  updated: Date
  more_id?: string
  __v: number
  deckCover?: any
};

export type CardType = {
  cardsPack_id: string
  answer?: string
  question?: string
  grade: number
  rating?: number
  shots?: number
  type?: string
  user_id?: string
  created?: Date | string
  updated?: Date | string
  __v?: number
  _id?: string
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
}

export type ParamsGetPackRequestType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string
}

export type GetPacksResponseType = {
  cardPacks: PackType[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}

export type ParamsGetCardsRequestType = {
  _id?: string
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id?: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
}

export type UpdatedGradeResponseType = {
  token: string
  tokenDeathTime: number
  updatedGrade: UpdatedGradeCardResponseType
}

export type UpdatedGradeCardResponseType = {
  card_id: string
  cardsPack_id: string
  created: Date
  grade: number
  more_id: Date
  shots: number
  updated: Date
  user_id: string
  __v: number
  _id: string
}

export type LoginRequestDataType = {
  email: string
  password: string
  rememberMe: boolean
}

export type LoginResponseType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
  error?: string
}

export type SignUpRequestDataType = {
  email: string
  password: string
}

export type SignUpResponseType = {
  addedUser?: {
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    updated: string
    verified: boolean
    __v: number
    _id: string
  }
}

export type PasswordResponseType = {
  info: string
  success: boolean
  answer: boolean
  html: boolean
  error: string
}

export type ForgotRequestDataType = {
  email: string
  from: string
  message: string
}

export type NewPasswordRequestDataType = {
  password: string
  resetPasswordToken: string | undefined
}

export type UserType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  created?: Date
  updated?: Date
  isAdmin?: boolean
  verified?: boolean
  rememberMe?: boolean
}

export type UpdateUserDataType = {
  name?: string
  avatar?: string
}

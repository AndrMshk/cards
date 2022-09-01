import React from 'react';
import {useAppDispatch} from "../../../app/store";
import { BasicModal } from '../../../common/modals/BasicModal';
import { deletePack } from '../packs-async-actions';


type DeletePackType = {
    packId: string | undefined
    packName: string | undefined
    isOpenModal: boolean
    setIsOpenModal: (value: boolean) => void
}
export const DeletePackModal: React.FC<DeletePackType> = React.memo(({
                                                                         packId,
                                                                         packName,
                                                                         isOpenModal,
                                                                         setIsOpenModal
                                                                     }) => {
    const dispatch = useAppDispatch()


    const deletePackHandler = () => {
        if (packId) {
            dispatch(deletePack(packId))
        }

    }

    return (
        <BasicModal isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
                    operationTitle={'Add new Pack'}
                    buttonName={'Save'}
                    handleOperation={deletePackHandler}>
            <div>Do you really want to remove pack <b>{packName}</b>?</div>
            <div>The pack will be removed.</div>
        </BasicModal>
    )
})

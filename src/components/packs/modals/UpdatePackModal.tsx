import React from 'react';
import {useAppDispatch} from "../../../app/store";
import {TextField} from "@mui/material";
import { updatePack } from '../packs-async-actions';
import { BasicModal } from '../../../common/modals/BasicModal';

type UpdatePackType = {
    packId: string | undefined
    packName: string | undefined
    isOpenModal: boolean
    setIsOpenModal: (value: boolean) => void
}

export const UpdatePackModal: React.FC<UpdatePackType> = React.memo(({
                                                                         packId,
                                                                         packName,
                                                                         isOpenModal,
                                                                         setIsOpenModal
                                                                     }) => {
    const [newPackName, setNewPackName] = React.useState(packName)
    const dispatch = useAppDispatch()


    const updatePackHandler = () => {
        if (packId) {
            dispatch(updatePack(packId, newPackName))
            setNewPackName('')

        }
    }

    return (
        <BasicModal isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
                    operationTitle={'Change Pack'}
                    buttonName={'Save'}
                    handleOperation={updatePackHandler}>

            <>
                <TextField

                    label="Title"
                    variant="standard"
                    color="secondary"
                    value={newPackName}
                    onChange={(e) => setNewPackName(e.currentTarget.value)}/>
                <div>Do you really want to change <b>{packName}</b>?</div>
            </>
        </BasicModal>
    );
});

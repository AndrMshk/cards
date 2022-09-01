import React, {useState} from 'react';
import {TextField} from '@mui/material';

import {useAppDispatch} from "../../../app/store";
import { BasicModal } from '../../../common/modals/BasicModal';
import { createPack } from '../packs-async-actions';


type AddNewPackType = {
    isOpenModal: boolean
    setIsOpenModal: (value: boolean) => void
}

export const AddNewPackModal: React.FC<AddNewPackType> = React.memo(({isOpenModal, setIsOpenModal}) => {

    const [newPackName, setNewPackName] = useState('')

       const dispatch = useAppDispatch()


    const addNewPack = () => {
        dispatch(createPack(newPackName))
        setNewPackName(newPackName)


    }

    return (
        <BasicModal isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
                    operationTitle={'Add new Card'}
                    buttonName={'Save'}
                    handleOperation={addNewPack}>

            <>
                <TextField

                    label="Title"
                    variant="standard"
                    color="secondary"
                    value={newPackName}
                    onChange={(e) => setNewPackName(e.currentTarget.value)}/>

            </>
        </BasicModal>
    );
});

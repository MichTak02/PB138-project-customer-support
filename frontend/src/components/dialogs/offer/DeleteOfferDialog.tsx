import { useContext, useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';
import { DeleteDialogProps, DeleteDialogContext } from "../../dataDisplay/CursorPaginatedDataGrid.tsx";
import { OfferDto } from "../../../models/offer.ts";
import React from 'react';

const DeleteOfferDialog = () => {
    const { isOpen, close, deleteEntity, targetEntityId }: DeleteDialogProps<OfferDto> = useContext(DeleteDialogContext);
    const [error, setError] = useState<string | null>(null);

    const onDeleteOffer = async () => {
        try {
            await deleteEntity(targetEntityId);
            close();
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    useEffect(() => {
        if (!isOpen) {
            setError(null);
        }
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onClose={close}>
            <DialogTitle>Delete Offer</DialogTitle>
            <DialogContent>
                {error && <Typography color="error">{error}</Typography>}
                <Typography>Are you sure you want to delete this offer?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onDeleteOffer} color="error">Delete</Button>
                <Button onClick={close} color="primary">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteOfferDialog;

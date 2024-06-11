import { useContext, useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';
import { DeleteDialogProps, DeleteDialogContext } from "../../dataDisplay/CursorPaginatedDataGrid.tsx";
import { UserDto } from "../../../models/user.ts";
import React from 'react';

const DeleteUserDialog = () => {
    const { isOpen, close, deleteEntity, targetEntityId }: DeleteDialogProps<UserDto> = useContext(DeleteDialogContext);
    const [error, setError] = useState<string | null>(null);

    const onDeleteUser = async () => {
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
            <DialogTitle>Delete User</DialogTitle>
            <DialogContent>
                {error && <Typography color="error">{error}</Typography>}
                <Typography>Are you sure you want to delete this user?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onDeleteUser} color="error">Delete</Button>
                <Button onClick={close} color="primary">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteUserDialog;

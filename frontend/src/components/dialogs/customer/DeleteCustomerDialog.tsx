import { useContext, useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';
import { DeleteDialogProps, DeleteDialogContext } from "../../dataDisplay/CursorPaginatedDataGrid.tsx";
import { CustomerDto } from "../../../models/customer.ts";

const DeleteCustomerDialog = () => {
    const { isOpen, close, deleteEntity, targetEntityId }: DeleteDialogProps<CustomerDto> = useContext(DeleteDialogContext);
    const [error, setError] = useState<string | null>(null);

    const onDeleteCustomer = async () => {
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
            <DialogTitle>Delete Customer</DialogTitle>
            <DialogContent>
                {error && <Typography color="error">{error}</Typography>}
                <Typography>Are you sure you want to delete this customer?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onDeleteCustomer} color="error">Delete</Button>
                <Button onClick={close} color="primary">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteCustomerDialog;

import { useContext, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';
import { DeleteDialogProps, DeleteDialogContext } from "../../dataDisplay/CursorPaginatedDataGrid.tsx";
import { ProductDto } from "../../../models/product.ts";
import React from 'react';

const DeleteProductDialog = () => {
    const { isOpen, close, deleteEntity, targetEntityId }: DeleteDialogProps<ProductDto> = useContext(DeleteDialogContext);
    const [error, setError] = useState<string | null>(null);

    const onDeleteProduct = async () => {
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

    return (
        <Dialog open={isOpen} onClose={close}>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogContent>
                {error && <Typography color="error">{error}</Typography>}
                <Typography>Are you sure you want to delete this product?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onDeleteProduct} color="error">Delete</Button>
                <Button onClick={close} color="primary">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteProductDialog;

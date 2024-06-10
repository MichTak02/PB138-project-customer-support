import { useContext, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';
import { DeleteDialogProps, DeleteDialogContext } from "../../dataDisplay/CursorPaginatedDataGrid.tsx";
import { CategoryDto } from "../../../models/category.ts";

const DeleteCategoryDialog = () => {
    const { isOpen, close, deleteEntity, targetEntityId }: DeleteDialogProps<CategoryDto> = useContext(DeleteDialogContext);
    const [error, setError] = useState<string | null>(null);

    const onDeleteCategory = async () => {
        try {
            await deleteEntity(targetEntityId);
            close();
        } catch (e) {
            if (e instanceof Error) {
                if (e.message.includes("Cannot delete category as it is used by some products")) {
                    setError("Cannot delete this category because it is assigned to one or more products.");
                } else {
                    setError(e.message);
                }
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    return (
        <Dialog open={isOpen} onClose={close}>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogContent>
                {error && <Typography color="error">{error}</Typography>}
                <Typography>Are you sure you want to delete this category?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onDeleteCategory} color="error">Delete</Button>
                <Button onClick={close} color="primary">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteCategoryDialog;

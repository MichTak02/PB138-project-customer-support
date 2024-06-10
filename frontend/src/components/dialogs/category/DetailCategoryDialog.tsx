import React, {useContext} from "react";
import {
    DetailDialogProps,
    DetailDialogContext,
} from "../../dataDisplay/CursorPaginatedDataGrid.tsx";
import {CategoryDto} from "../../../models/category.ts";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";

const DetailCategoryDialog: React.FC = () => {
    const {isOpen, close, useEntityExtended, targetEntityId}: DetailDialogProps<CategoryDto> = useContext(DetailDialogContext);
    const {data: categoryExtendedDto, isLoading, error} = useEntityExtended(targetEntityId);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading category data</div>;

    return (
        <Dialog open={isOpen} onClose={close} maxWidth="md" fullWidth>
            <DialogTitle>Category Detail</DialogTitle>
            <DialogContent dividers>
                <Box component="div" mb={3}>
                    <Typography variant="body1"><strong>ID:</strong> {categoryExtendedDto?.id}</Typography>
                </Box>
                <Box component="div" mb={3}>
                    <Typography variant="body1"><strong>Category name:</strong> {categoryExtendedDto?.name}</Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={close}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DetailCategoryDialog;

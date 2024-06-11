import React, { useContext } from "react";
import {
    DetailDialogProps,
    DetailDialogContext,
} from "../../dataDisplay/CursorPaginatedDataGrid.tsx";
import { ProductExtendedDto } from "../../../models/product.ts";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

const DetailProductDialog: React.FC = () => {
    const { isOpen, close, useEntityExtended, targetEntityId }: DetailDialogProps<ProductExtendedDto> = useContext(DetailDialogContext);
    const { data: productExtendedDto, isLoading, error } = useEntityExtended(targetEntityId);

    return (
        <Dialog open={isOpen} onClose={close} maxWidth="md" fullWidth>
            <DialogTitle>Product Detail</DialogTitle>
            <DialogContent dividers>
                <Box component="div" mb={3}>
                    <Typography variant="body1"><strong>ID:</strong> {productExtendedDto?.id}</Typography>
                </Box>
                <Box component="div" mb={3}>
                    <Typography variant="body1"><strong>Product name:</strong> {productExtendedDto?.name}</Typography>
                </Box>
                <Box component="div" mb={3}>
                    <Typography variant="body1"><strong>Description:</strong> {productExtendedDto?.description}</Typography>
                </Box>
                <Box component="div" mb={3}>
                    <Typography variant="body1"><strong>Price:</strong> {productExtendedDto?.price}</Typography>
                </Box>
                <Box component="div" mb={3}>
                    <Typography variant="body1"><strong>Type:</strong> {productExtendedDto?.type}</Typography>
                </Box>
                <Box component="div" mb={3}>
                    <Typography variant="body1"><strong>Categories: </strong> 
                        {productExtendedDto?.categories?.map((category, index) => (
                            <span key={category.id}>
                                {category.name}{index < productExtendedDto.categories.length - 1 ? ', ' : ''}
                            </span>
                        ))}
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={close}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DetailProductDialog;

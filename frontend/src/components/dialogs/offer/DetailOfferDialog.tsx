import React, { useContext } from "react";
import { DetailDialogProps, DetailDialogContext } from "../../dataDisplay/CursorPaginatedDataGrid.tsx";
import { OfferExtendedDto } from "../../../models/offer.ts";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

const DetailOfferDialog: React.FC = () => {
    const { isOpen, close, useEntityExtended, targetEntityId }: DetailDialogProps<OfferExtendedDto> = useContext(DetailDialogContext);
    const { data: offerExtendedDto, isLoading, error } = useEntityExtended(targetEntityId);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading offer data</div>;

    return (
        <Dialog open={isOpen} onClose={close} maxWidth="md" fullWidth>
            <DialogTitle>Offer Detail</DialogTitle>
            <DialogContent dividers>
                <Box component="div" mb={3}>
                    <Typography variant="body1"><strong>ID:</strong> {offerExtendedDto?.id}</Typography>
                </Box>

                <Box component="div" mb={3}>
                    <Typography variant="body1"><strong>Offer name:</strong> {offerExtendedDto?.name}</Typography>
                </Box>

                <Box component="div" mb={3}>
                    <Typography variant="body1"><strong>Description:</strong> {offerExtendedDto?.description}</Typography>
                </Box>

                {offerExtendedDto?.offerToProducts && offerExtendedDto.offerToProducts.length > 0 && (
                    <Box component="div" mb={3}>
                        <Typography variant="body1"><strong>Products:</strong></Typography>
                        {offerExtendedDto.offerToProducts.map((otp, index) => (
                            <Box key={index} ml={2}>
                                <Typography variant="body2">{otp.product.name} - {otp.newPrice} (Qty: {otp.productQuantity})</Typography>
                            </Box>
                        ))}
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={close}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DetailOfferDialog;

import React, { useContext } from "react";
import { DetailDialogProps, DetailDialogContext } from "../../dataDisplay/CursorPaginatedDataGrid.tsx";
import { CustomerExtendedDto } from "../../../models/customer.ts";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

const DetailCustomerDialog: React.FC = () => {
    const { isOpen, close, useEntityExtended, targetEntityId }: DetailDialogProps<CustomerExtendedDto> = useContext(DetailDialogContext);
    const { data: customerExtendedDto, isLoading, error } = useEntityExtended(targetEntityId);

    return (
        <Dialog open={isOpen} onClose={close} maxWidth="md" fullWidth>
            <DialogTitle>Customer Detail</DialogTitle>
            <DialogContent dividers>
                {customerExtendedDto && (
                    <>
                        <Box component="div" mb={3}>
                            <Typography variant="body1"><strong>ID:</strong> {customerExtendedDto.id}</Typography>
                        </Box>
                        <Box component="div" mb={3}>
                            <Typography variant="body1"><strong>Name:</strong> {customerExtendedDto.name}</Typography>
                        </Box>
                        <Box component="div" mb={3}>
                            <Typography variant="body1"><strong>Surname:</strong> {customerExtendedDto.surname}</Typography>
                        </Box>
                        <Box component="div" mb={3}>
                            <Typography variant="body1"><strong>Email:</strong> {customerExtendedDto.email}</Typography>
                        </Box>
                        <Box component="div" mb={3}>
                            <Typography variant="body1"><strong>Phone Number:</strong> {customerExtendedDto.phoneNumber}</Typography>
                        </Box>
                        {customerExtendedDto.products && customerExtendedDto.products.length > 0 && (
                            <Box component="div" mb={3}>
                                <Typography variant="body1"><strong>Products:</strong></Typography>
                                {customerExtendedDto.products.map((product, index) => (
                                    <Box key={index} ml={2}>
                                        <Typography variant="body2">{product.name}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={close}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DetailCustomerDialog;

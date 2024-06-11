import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { DetailDialogProps, DetailDialogContext } from "../../dataDisplay/CursorPaginatedDataGrid.tsx";
import { CustomerExtendedDto } from "../../../models/customer.ts";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import useAuth from "../../../hooks/useAuth";

const DetailCustomerDialog: React.FC = () => {
    const navigate = useNavigate();
    const { isOpen, close, useEntityExtended, targetEntityId }: DetailDialogProps<CustomerExtendedDto> = useContext(DetailDialogContext);
    const { data: customerExtendedDto, isLoading, error } = useEntityExtended(targetEntityId);

    const { auth } = useAuth();
    const userId = auth?.id;

    const handleViewVoiceRecords = () => {
        if (userId && targetEntityId) {
            navigate(`/auth/customers/voice-records/${userId}/${targetEntityId}`);
        } else {
            alert('User ID or Customer ID is missing.');
        }
    };

    const handleViewChatRecords = () => {
        if (userId && targetEntityId) {
            navigate(`/auth/customers/chat-records/${userId}/${targetEntityId}`);
        } else {
            alert('User ID or Customer ID is missing.');
        }
    };

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
                <Button color="secondary" onClick={handleViewChatRecords}>View Chat Records</Button>
                <Button color="secondary" onClick={handleViewVoiceRecords}>View Voice Records</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DetailCustomerDialog;

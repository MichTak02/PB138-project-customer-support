import React, { useContext } from "react";
import { DetailDialogProps, DetailDialogContext } from "../../dataDisplay/CursorPaginatedDataGrid.tsx";
import { UserDto } from "../../../models/user.ts";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormGroup, Typography } from "@mui/material";

const DetailUserDialog: React.FC = () => {
    const { isOpen, close, useEntityExtended, targetEntityId }: DetailDialogProps<UserDto> = useContext(DetailDialogContext);
    const { data: userExtendedDto, isLoading, error } = useEntityExtended(targetEntityId);

    return (
        <Dialog open={isOpen} onClose={close} maxWidth="md" fullWidth>
            <DialogTitle>User Detail</DialogTitle>
            <DialogContent dividers>
                <Box component={FormGroup} mb={3}>
                    <Typography variant="body1"><strong>ID: </strong>{userExtendedDto?.id}</Typography>
                </Box>

                <Box component={FormGroup} mb={3}>
                    <Typography variant="body1"><strong>Email: </strong>{userExtendedDto?.email}</Typography>
                </Box>

                <Box component={FormGroup} mb={3}>
                    <Typography variant="body1"><strong>Display Name: </strong>{userExtendedDto?.displayName}</Typography>
                </Box>

                <Box component={FormGroup} mb={3}>
                    <Typography variant="body1"><strong>Role: </strong>{userExtendedDto?.role}</Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={close}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DetailUserDialog;

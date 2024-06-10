import React, { useContext } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, FormGroup, Box } from '@mui/material';
import { CustomerCreateDto } from "../../../models/customer.ts";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { createCustomerSchema } from "../../../validationSchemas/forms.ts";
import { CreateDialogProps, CreateDialogContext } from "../../dataDisplay/CursorPaginatedDataGrid.tsx";

const CreateCustomerDialog = () => {
    const { isOpen, close, createEntity }: CreateDialogProps<CustomerCreateDto> = useContext(CreateDialogContext);

    const { handleSubmit, formState: { errors }, register } = useForm<CustomerCreateDto>({
        resolver: zodResolver(createCustomerSchema),
    });

    const onCreateCustomer = async (data: CustomerCreateDto) => {
        await createEntity(data);
        close();
    };

    return (
        <Dialog open={isOpen} onClose={close} maxWidth="md" fullWidth>
            <DialogTitle>Create Customer</DialogTitle>
            <DialogContent dividers>
                <Box component={FormGroup} mb={3} sx={{ '& > *': { marginBottom: 2 } }}>
                    <TextField
                        label="Name"
                        fullWidth
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <TextField
                        label="Surname"
                        fullWidth
                        {...register("surname")}
                        error={!!errors.surname}
                        helperText={errors.surname?.message}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        label="Phone Number"
                        fullWidth
                        {...register("phoneNumber")}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber?.message}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit(onCreateCustomer)} color="primary">Create Customer</Button>
                <Button onClick={close} color="error">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateCustomerDialog;

import React, { useContext, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, FormGroup, Box } from '@mui/material';
import { CustomerUpdateDto, CustomerExtendedDto } from "../../../models/customer.ts";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { editCustomerSchema } from "../../../validationSchemas/forms.ts";
import { EditDialogProps, EditDialogContext } from "../../dataDisplay/CursorPaginatedDataGrid.tsx";

const EditCustomerDialog: React.FC = () => {
    const { isOpen, close, editEntity, useEntityExtended, targetEntityId }: EditDialogProps<CustomerExtendedDto, CustomerUpdateDto> = useContext(EditDialogContext);

    const { data: targetEntity, isLoading, error } = useEntityExtended(targetEntityId);

    const { handleSubmit, formState: { errors }, register, reset } = useForm<CustomerUpdateDto>({
        resolver: zodResolver(editCustomerSchema),
    });

    useEffect(() => {
        if (targetEntity) {
            reset(targetEntity);
        }
    }, [targetEntity, reset]);

    const onUpdateCustomer = async (data: CustomerUpdateDto) => {
        await editEntity(targetEntityId, data);
        close();
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading customer data</div>;

    return (
        <Dialog open={isOpen} onClose={close} maxWidth="md" fullWidth>
            <DialogTitle>Edit Customer</DialogTitle>
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
                <Button onClick={handleSubmit(onUpdateCustomer)} color="primary">Update Customer</Button>
                <Button onClick={close} color="error">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditCustomerDialog;

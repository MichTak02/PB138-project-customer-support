import React, { useContext } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, FormGroup, Box, FormControl, FormControlLabel, Radio, RadioGroup, FormLabel } from '@mui/material';
import { UserCreateDto } from "../../../models/user.ts";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "../../../validationSchemas/forms.ts";
import { CreateDialogProps, CreateDialogContext } from "../../dataDisplay/CursorPaginatedDataGrid.tsx";

const CreateUserDialog = () => {
    const { isOpen, close, createEntity }: CreateDialogProps<UserCreateDto> = useContext(CreateDialogContext);

    const { handleSubmit, formState: { errors }, register, control } = useForm<UserCreateDto>({
        resolver: zodResolver(createUserSchema),
    });

    const onCreateUser = async (data: UserCreateDto) => {
        await createEntity(data);
        close();
    };

    return (
        <Dialog open={isOpen} onClose={close} maxWidth="md" fullWidth>
            <DialogTitle>Create User</DialogTitle>
            <DialogContent dividers>
                <Box component={FormGroup} mb={3} sx={{ '& > *': { marginBottom: 2 } }}>
                    <TextField
                        label="Email"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        fullWidth
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        label="Display Name"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        fullWidth
                        {...register("displayName")}
                        error={!!errors.displayName}
                        helperText={errors.displayName?.message}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        fullWidth
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        sx={{ mt: 2 }}
                    />
                    <FormControl sx={{ mt: 2 }} component="fieldset">
                        <FormLabel component="legend">Role</FormLabel>
                        <Controller
                            name="role"
                            control={control}
                            defaultValue="REGULAR"
                            render={({ field }) => (
                                <RadioGroup row {...field}>
                                    <FormControlLabel value="REGULAR" control={<Radio />} label="Regular" />
                                    <FormControlLabel value="ADMIN" control={<Radio />} label="Admin" />
                                </RadioGroup>
                            )}
                        />
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit(onCreateUser)} color="primary">Create User</Button>
                <Button onClick={close} color="error">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateUserDialog;

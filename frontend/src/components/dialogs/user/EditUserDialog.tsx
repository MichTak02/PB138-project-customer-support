import React, { useContext, useEffect } from "react";
import { EditDialogProps, EditDialogContext } from "../../dataDisplay/CursorPaginatedDataGrid.tsx";
import { UserExtendedDto, UserUpdateDto } from "../../../models/user.ts";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserSchema } from "../../../validationSchemas/forms.ts";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormGroup, TextField, FormControl, FormControlLabel, Radio, RadioGroup, FormLabel } from "@mui/material";

const EditUserDialog: React.FC = () => {
    const { isOpen, close, editEntity, useEntityExtended, targetEntityId }: EditDialogProps<UserExtendedDto, UserUpdateDto> = useContext(EditDialogContext);

    const { data: targetEntity, isLoading, error } = useEntityExtended(targetEntityId);

    const { handleSubmit, formState: { errors }, register, reset, control } = useForm<UserUpdateDto>({
        resolver: zodResolver(editUserSchema),
    });

    useEffect(() => {
        if (targetEntity) {
            const initialValues = {
                displayName: targetEntity.displayName,
                role: targetEntity.role,
            };
            reset(initialValues);
        }
    }, [targetEntity, reset]);

    const onUpdateUser = async (data: UserUpdateDto) => {
        await editEntity(targetEntityId, data);
        close();
    };

    return (
        <Dialog open={isOpen} onClose={close} maxWidth="md" fullWidth>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent dividers>
                <Box component={FormGroup} mb={3} sx={{ '& > *': { marginBottom: 2 } }}>
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
                <Button onClick={handleSubmit(onUpdateUser)} color="primary">Update User</Button>
                <Button onClick={close} color="error">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditUserDialog;

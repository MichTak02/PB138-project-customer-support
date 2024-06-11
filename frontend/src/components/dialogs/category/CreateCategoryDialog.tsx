import { useContext, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, FormGroup, Box } from '@mui/material';
import { CategoryCreateDto } from "../../../models/category.ts";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategorySchema } from "../../../validationSchemas/forms.ts";
import { CreateDialogProps, CreateDialogContext } from "../../dataDisplay/CursorPaginatedDataGrid.tsx";
import React from 'react';

const CreateCategoryDialog = () => {
    const { isOpen, close, createEntity }: CreateDialogProps<CategoryCreateDto> = useContext(CreateDialogContext);

    const {
        handleSubmit, formState: { errors }, register, reset
    } = useForm<CategoryCreateDto>({
        resolver: zodResolver(createCategorySchema),
    });

    const onCreateCategory = async (data: CategoryCreateDto) => {
        await createEntity(data);
        close();
    }

    useEffect(() => {
        if (!isOpen) {
            reset({
                name: ''
            });
        }
    }, [isOpen, reset]);

    return (
        <Dialog open={isOpen} onClose={close} maxWidth="sm" fullWidth>
            <DialogTitle>Add Category</DialogTitle>
            <DialogContent>
                <Box component={FormGroup} mb={3} sx={{ mt: 2 }}>
                    <TextField
                        label="Category name"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        fullWidth
                        {...register("name")}
                        error={typeof errors.name !== 'undefined'}
                        helperText={errors.name?.message}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit(onCreateCategory)}>Create category</Button>
                <Button onClick={() => {
                    close();
                    reset({ name: '' });
                }} color="error">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateCategoryDialog;

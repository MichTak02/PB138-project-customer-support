import React, { useContext, useEffect } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
    FormGroup,
    Box,
    FormControl,
    InputLabel,
} from '@mui/material';
import { CategoryDto, CategoryUpdateDto } from '../../../models/category.ts';
import { EditDialogContext, EditDialogProps } from "../../dataDisplay/CursorPaginatedDataGrid.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editCategorySchema } from "../../../validationSchemas/forms.ts";

const EditCategoryDialog: React.FC = () => {
    const { isOpen, close, editEntity, useEntityExtended, targetEntityId }: EditDialogProps<CategoryDto, CategoryUpdateDto> = useContext(EditDialogContext);
    const { data: categoryExtendedDto } = useEntityExtended(targetEntityId);

    const { handleSubmit, formState: { errors }, register, setValue } = useForm<CategoryUpdateDto>({
        resolver: zodResolver(editCategorySchema),
    });

    useEffect(() => {
        if (categoryExtendedDto) {
            setValue("name", categoryExtendedDto.name);
        }
    }, [categoryExtendedDto, setValue]);

    const onEditCategory = async (data: CategoryUpdateDto) => {
        await editEntity(targetEntityId, data);
        close();
    };

    return (
        <Dialog open={isOpen} onClose={close} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogContent>
                <Box component={FormGroup} mb={3} sx={{ mt: 2 }}>
                    <FormControl fullWidth variant="outlined">
                        <TextField
                            label="Category name"
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            fullWidth
                            {...register("name")}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit(onEditCategory)} color="primary">OK</Button>
                <Button onClick={close} color="error">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditCategoryDialog;

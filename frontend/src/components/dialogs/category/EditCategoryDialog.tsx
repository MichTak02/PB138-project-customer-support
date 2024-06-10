import React, {useContext} from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
    FormGroup,
    Box
} from '@mui/material';
import {CategoryDto, CategoryUpdateDto} from '../../../models/category.ts';
import {EditDialogContext, EditDialogProps} from "../../dataDisplay/CursorPaginatedDataGrid.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {editCategorySchema} from "../../../validationSchemas/forms.ts";

const EditCategoryDialog: React.FC = () => {
    // EditDialogProps bere 2 typove parametry - extended verze a update verze objektu
    // !!DULEZITE - zde se pouziva jako extended normalni verze (tj. CategoryDto) proto, ze Category NEMA extended verzi.
    // U jinych entit ale pouzivejte vzdycky extended verzi
    // useEntityExtended = hook, ktery po zavolani vrati extended verzi entity
    // targetEntityId = id entity, kterou editujeme
    const {isOpen, close, editEntity, useEntityExtended, targetEntityId}: EditDialogProps<CategoryDto, CategoryUpdateDto> = useContext(EditDialogContext);
    const {data: categoryExtendedDto} = useEntityExtended(targetEntityId);

    const {
        handleSubmit, formState: {errors}, register
    } = useForm<CategoryUpdateDto>({
        resolver: zodResolver(editCategorySchema),
        values: categoryExtendedDto,
    })

    const onEditCategory = async (data: CategoryUpdateDto) => {
        await editEntity(targetEntityId , data);
        close();
    }

    return (
        <Dialog open={isOpen} onClose={close}>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogContent>
                <Box component={FormGroup} mb={3}>
                    <TextField
                        value={targetEntityId}
                        label="ID"
                        disabled={true}
                    ></TextField>
                </Box>

                <Box component={FormGroup} mb={3}>
                    <TextField
                        label="Category name"
                        {...register("name")}
                        error={typeof errors.name !== 'undefined'}
                        helperText={errors.name?.message}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit(onEditCategory)}>OK</Button>
                <Button onClick={close} color="error">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditCategoryDialog;

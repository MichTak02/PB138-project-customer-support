import {useContext} from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, FormGroup, Box} from '@mui/material';
import {CategoryCreateDto} from "../../../models/category.ts";
import {useForm} from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod";
import {createCategorySchema} from "../../../validationSchemas/forms.ts";
import {CreateDialogProps, CreateDialogContext} from "../../dataDisplay/CursorPaginatedDataGrid.tsx";
import React from 'react';


const CreateCategoryDialog = () => {
    // kazdy CREATE dialog musi mit tento radek na zacatku, nezapomen zmenit CategoryCreateDto na odpovidajici create typ
    // isOpen a close musi dostat Dialog jako indikator otevrenosti a funkci na zavirani dialogu
    // createEntity je funkce, ktera bere jako parametr objekt stejneho typu jako u CreateDialogProps, vytvori objekt
    const {isOpen, close, createEntity}: CreateDialogProps<CategoryCreateDto> = useContext(CreateDialogContext);

    const {
        handleSubmit, formState: {errors}, register
    } = useForm<CategoryCreateDto>({
        resolver: zodResolver(createCategorySchema),
    })

    const onCreateCategory = async (data: CategoryCreateDto) => {
        await createEntity(data);
        close();
    }

    return (
        <Dialog open={isOpen} onClose={close}>
            <DialogTitle>Add Category</DialogTitle>
            <DialogContent>
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
                <Button onClick={handleSubmit(onCreateCategory)}>Create category</Button>
                <Button onClick={close} color="error">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateCategoryDialog;

import React, {useContext} from "react";
import {
    DetailDialogProps,
    DetailDialogContext,
} from "../dataDisplay/CursorPaginatedDataGrid.tsx";
import {CategoryDto} from "../../models/category.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {editCategorySchema} from "../../validationSchemas/forms.ts";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormGroup, TextField} from "@mui/material";

const DetailCategoryDialog: React.FC = () => {
    // EditDialogProps bere 1 typovy parametry - extended verzi
    // !!DULEZITE - zde se pouziva jako extended normalni verze (tj. CategoryDto) proto, ze Category NEMA extended verzi.
    // U jinych entit ale pouzivejte vzdycky extended verzi!!
    // useEntityExtended = hook, ktery po zavolani vrati extended verzi entity
    // targetEntityId = id entity, u ktere se divame na detail
    const {isOpen, close, useEntityExtended, targetEntityId}: DetailDialogProps<CategoryDto> = useContext(DetailDialogContext);
    const {data: categoryExtendedDto} = useEntityExtended(targetEntityId);

    const {
        handleSubmit, register
    } = useForm<CategoryDto>({
        resolver: zodResolver(editCategorySchema),
        values: categoryExtendedDto
    })

    const onClose = async (_data: CategoryDto) => {
        close();
    }

    return (
        <Dialog open={isOpen} onClose={close}>
            <DialogTitle>Category detail</DialogTitle>
            <DialogContent>
                <Box component={FormGroup} mb={3}>
                    <TextField
                        label="ID"
                        {...register("id")}
                        disabled={true}
                    ></TextField>
                </Box>

                <Box component={FormGroup} mb={3}>
                    <TextField
                        label="Category name"
                        {...register("name")}
                        disabled={true}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleSubmit(onClose)}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DetailCategoryDialog;
import React, { useContext, useEffect } from "react";
import {
    EditDialogProps,
    EditDialogContext,
} from "../../dataDisplay/CursorPaginatedDataGrid.tsx";
import { ProductDto, ProductUpdateDto } from "../../../models/product.ts";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProductSchema } from "../../../validationSchemas/forms.ts";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormGroup, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, ListItemText } from "@mui/material";
import { useCategories } from "../../../hooks/useCategories";

const EditProductDialog: React.FC = () => {
    const { isOpen, close, editEntity, useEntityExtended, targetEntityId }: EditDialogProps<ProductDto, ProductUpdateDto> = useContext(EditDialogContext);
    const { handleSubmit, formState: { errors }, register, setValue, control } = useForm<ProductUpdateDto>({
        resolver: zodResolver(editProductSchema),
    });

    const { data: product } = useEntityExtended(targetEntityId);
    const { data: categories } = useCategories();

    useEffect(() => {
        if (product) {
            setValue("name", product.name);
            setValue("description", product.description);
            setValue("price", product.price);
            setValue("type", product.type);
            setValue("categoryIds", product.categoryIds);
        }
    }, [product, setValue]);

    const onUpdateProduct = async (data: ProductUpdateDto) => {
        await editEntity(targetEntityId, data);
        close();
    };

    return (
        <Dialog open={isOpen} onClose={close} maxWidth="md" fullWidth>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogContent dividers>
                <Box component={FormGroup} mb={3} sx={{ '& > *': { marginBottom: 2 } }}>
                    <TextField
                        label="Product name"
                        fullWidth
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        minRows={3}
                        {...register("description")}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                    />
                    <TextField
                        label="Price"
                        fullWidth
                        type="number"
                        {...register("price", { valueAsNumber: true })}
                        error={!!errors.price}
                        helperText={errors.price?.message}
                    />
                    <TextField
                        label="Type"
                        fullWidth
                        {...register("type")}
                        error={!!errors.type}
                        helperText={errors.type?.message}
                    />
                    <FormControl fullWidth error={!!errors.categoryIds} sx={{ marginBottom: 2 }}>
                        <InputLabel id="category-label">Categories</InputLabel>
                        <Controller
                            control={control}
                            name="categoryIds"
                            render={({ field }) => (
                                <Select
                                    labelId="category-label"
                                    multiple
                                    {...field}
                                    value={field.value ?? []}
                                    renderValue={(selected) => {
                                        const selectedCategories = categories?.pages.flatMap(page => 
                                            page.filter(category => selected.includes(category.id))
                                        );
                                        return selectedCategories?.map(category => category.name).join(', ') || '';
                                    }}
                                >
                                    {categories?.pages.flatMap(page =>
                                        page.map((category) => (
                                            <MenuItem key={category.id} value={category.id}>
                                                <Checkbox checked={field.value ? field.value.includes(category.id) : false} />
                                                <ListItemText primary={category.name} />
                                            </MenuItem>
                                        ))
                                    )}
                                </Select>
                            )}
                        />
                        {errors.categoryIds && <p>{errors.categoryIds.message}</p>}
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit(onUpdateProduct)} color="primary">Update product</Button>
                <Button onClick={close} color="error">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditProductDialog;

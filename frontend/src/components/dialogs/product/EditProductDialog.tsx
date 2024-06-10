import React, { useContext, useEffect, useRef } from "react";
import {
    EditDialogProps,
    EditDialogContext,
} from "../../dataDisplay/CursorPaginatedDataGrid.tsx";
import { ProductDto, ProductUpdateDto } from "../../../models/product.ts";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProductSchema } from "../../../validationSchemas/forms.ts";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormGroup, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, ListItemText, CircularProgress } from "@mui/material";
import { useCategories } from "../../../hooks/useCategories";

const EditProductDialog: React.FC = () => {
    const { isOpen, close, editEntity, useEntityExtended, targetEntityId }: EditDialogProps<ProductDto, ProductUpdateDto> = useContext(EditDialogContext);
    const { handleSubmit, formState: { errors }, register, setValue, control } = useForm<ProductUpdateDto>({
        resolver: zodResolver(editProductSchema),
    });

    const { data: product } = useEntityExtended(targetEntityId);
    const {
        data: categories,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useCategories();

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

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

    const handleCategoryScroll = (event: React.UIEvent<HTMLDivElement>) => {
        if (hasNextPage && !isFetchingNextPage && event.currentTarget.scrollTop + event.currentTarget.clientHeight >= event.currentTarget.scrollHeight) {
            fetchNextPage();
        }
    };

    useEffect(() => {
        if (loadMoreRef.current && hasNextPage && !isFetchingNextPage) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    fetchNextPage();
                }
            }, { threshold: 1.0 });
            observer.observe(loadMoreRef.current);
            return () => observer.disconnect();
        }
    }, [loadMoreRef.current, hasNextPage, isFetchingNextPage]);

    const sortedCategories = categories?.pages.flatMap(page => page).sort((a, b) => a.name.localeCompare(b.name)) || [];

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
                    <FormControl fullWidth error={!!errors.type} sx={{ marginBottom: 2 }}>
                        <InputLabel id="type-label">Type</InputLabel>
                        <Controller
                            control={control}
                            name="type"
                            render={({ field }) => (
                                <Select
                                    labelId="type-label"
                                    {...field}
                                    value={field.value ?? 'PRODUCT'}
                                >
                                    <MenuItem value="PRODUCT">Product</MenuItem>
                                    <MenuItem value="SERVICE">Service</MenuItem>
                                </Select>
                            )}
                        />
                        {errors.type && <p>{errors.type.message}</p>}
                    </FormControl>
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
                                        const selectedCategories = sortedCategories.filter(category => selected.includes(category.id));
                                        return selectedCategories.map(category => category.name).join(', ') || '';
                                    }}
                                    MenuProps={{ onScroll: handleCategoryScroll }}
                                >
                                    {sortedCategories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            <Checkbox checked={field.value ? field.value.includes(category.id) : false} />
                                            <ListItemText primary={category.name} />
                                        </MenuItem>
                                    ))}
                                    {isFetchingNextPage && (
                                        <MenuItem disabled>
                                            <CircularProgress size={24} />
                                        </MenuItem>
                                    )}
                                </Select>
                            )}
                        />
                        {errors.categoryIds && <p>{errors.categoryIds.message}</p>}
                    </FormControl>
                </Box>
                <div ref={loadMoreRef} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit(onUpdateProduct)} color="primary">Update product</Button>
                <Button onClick={close} color="error">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditProductDialog;

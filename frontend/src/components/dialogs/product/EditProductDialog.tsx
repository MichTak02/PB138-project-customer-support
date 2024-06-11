import React, { useContext, useEffect, useRef, useState } from "react";
import {
    EditDialogProps,
    EditDialogContext,
} from "../../dataDisplay/CursorPaginatedDataGrid.tsx";
import { ProductDto, ProductUpdateDto } from "../../../models/product.ts";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProductSchema } from "../../../validationSchemas/forms.ts";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormGroup, TextField, FormControl, InputLabel, Checkbox, FormControlLabel, ListItemText, CircularProgress, Select, MenuItem, Typography } from "@mui/material";
import { useCategories } from "../../../hooks/useCategories";

const EditProductDialog: React.FC = () => {
    const { isOpen, close, editEntity, useEntityExtended, targetEntityId }: EditDialogProps<ProductDto, ProductUpdateDto> = useContext(EditDialogContext);
    const { handleSubmit, formState: { errors }, register, setValue, control, watch } = useForm<ProductUpdateDto>({
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
    const [selectOpen, setSelectOpen] = useState(false);

    useEffect(() => {
        if (product) {
            setValue("name", product.name);
            setValue("description", product.description);
            setValue("price", product.price);
            setValue("type", product.type);
            setValue("categoryIds", product.categoryIds || []);
        }
    }, [product, setValue]);

    const selectedType = watch('type');

    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue('type', event.target.value);
    };

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
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        fullWidth
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        label="Description"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        fullWidth
                        multiline
                        minRows={3}
                        {...register("description")}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        label="Price"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        fullWidth
                        type="number"
                        {...register("price", { valueAsNumber: true })}
                        error={!!errors.price}
                        helperText={errors.price?.message}
                        sx={{ mt: 2 }}
                    />
                    <FormControl sx={{ mt: 2 }} component="fieldset" error={!!errors.type}>
                        <InputLabel sx={{ mb: 2, position: 'relative' }} component="legend">Type</InputLabel>
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedType === 'PRODUCT'}
                                        onChange={handleTypeChange}
                                        value="PRODUCT"
                                    />
                                }
                                label="Product"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedType === 'SERVICE'}
                                        onChange={handleTypeChange}
                                        value="SERVICE"
                                    />
                                }
                                label="Service"
                            />
                        </FormGroup>
                        {errors.type && <p>{errors.type.message}</p>}
                    </FormControl>
                    <FormControl fullWidth error={!!errors.categoryIds} sx={{ marginBottom: 2 }}>
                        <InputLabel id="category-label">Categories</InputLabel>
                        <Controller
                            control={control}
                            name="categoryIds"
                            render={({ field }) => (
                                <>
                                    <Select
                                        labelId="category-label"
                                        multiple
                                        {...field}
                                        open={selectOpen}
                                        onOpen={() => setSelectOpen(true)}
                                        onClose={() => setSelectOpen(false)}
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
                                        <Button
                                            onClick={() => setSelectOpen(false)}
                                            fullWidth
                                            color="primary"
                                            sx={{
                                                position: 'sticky',
                                                bottom: 0,
                                                bgcolor: 'white',
                                                '&:hover': {
                                                    bgcolor: 'white',
                                                    boxShadow: 'none',
                                                },
                                            }}
                                        >
                                            OK
                                        </Button>
                                    </Select>
                                </>
                            )}
                        />
                        {errors.categoryIds && <p>{errors.categoryIds.message}</p>}
                    </FormControl>
                </Box>
                <div ref={loadMoreRef} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit(onUpdateProduct)} color="primary">Update product</Button>
                <Button onClick={close} color="error">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditProductDialog;

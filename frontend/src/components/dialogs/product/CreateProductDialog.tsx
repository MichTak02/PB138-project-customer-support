import React, { useContext, useEffect, useRef } from 'react';
import {
    Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, FormGroup, Box, Select, MenuItem, InputLabel, FormControl, Checkbox, ListItemText, FormControlLabel, CircularProgress
} from '@mui/material';
import { ProductCreateDto } from "../../../models/product.ts";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema } from "../../../validationSchemas/forms.ts";
import { CreateDialogProps, CreateDialogContext } from "../../dataDisplay/CursorPaginatedDataGrid.tsx";
import { useCategories } from '../../../hooks/useCategories'; 

const CreateProductDialog = () => {
    const { isOpen, close, createEntity }: CreateDialogProps<ProductCreateDto> = useContext(CreateDialogContext);

    const { handleSubmit, formState: { errors }, register, control, setValue, watch } = useForm<ProductCreateDto>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            type: 'PRODUCT',
            categoryIds: []
        }
    });

    const {
        data: categories,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useCategories();

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const selectedType = watch('type');

    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue('type', event.target.value);
    };

    const onCreateProduct = async (data: ProductCreateDto) => {
        await createEntity(data);
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
            <DialogTitle>Add Product</DialogTitle>
            <DialogContent>
                <Box component={FormGroup} mb={3} sx={{ '& .MuiTextField-root': { marginBottom: '16px' } }}>
                    <TextField
                        label="Product name"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        fullWidth
                        {...register("name")}
                        error={typeof errors.name !== 'undefined'}
                        helperText={errors.name?.message}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        label="Description"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        fullWidth
                        {...register("description")}
                        error={typeof errors.description !== 'undefined'}
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
                        error={typeof errors.price !== 'undefined'}
                        helperText={errors.price?.message}
                        sx={{ mt: 2 }}
                    />
                    <FormControl sx={{ mt: 2 }} component="fieldset" error={typeof errors.type !== 'undefined'}>
                        <InputLabel component="legend">Type</InputLabel>
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
                    <FormControl fullWidth error={typeof errors.categoryIds !== 'undefined'} sx={{ marginBottom: '16px' }}>
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
                                            <Checkbox checked={field.value.includes(category.id)} />
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
                <Button onClick={handleSubmit(onCreateProduct)}>Create product</Button>
                <Button onClick={close} color="error">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateProductDialog;

import React, { useContext, useEffect, useRef } from 'react';
import {
    Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, FormGroup, Box, Select, MenuItem, FormControl, InputLabel, CircularProgress
} from '@mui/material';
import { OfferCreateDto } from "../../../models/offer.ts";
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { createOfferSchema } from "../../../validationSchemas/forms.ts";
import { CreateDialogProps, CreateDialogContext } from "../../dataDisplay/CursorPaginatedDataGrid.tsx";
import { useProducts } from '../../../hooks/useProducts';

const CreateOfferDialog = () => {
    const { isOpen, close, createEntity }: CreateDialogProps<OfferCreateDto> = useContext(CreateDialogContext);

    const { handleSubmit, formState: { errors }, register, control, reset } = useForm<OfferCreateDto>({
        resolver: zodResolver(createOfferSchema),
    });

    const {
        data: products,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useProducts();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "offerToProducts"
    });

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const onCreateOffer = async (data: OfferCreateDto) => {
        data.offerToProducts.forEach(product => {
            product.productQuantity = Number(product.productQuantity);
            product.newPrice = Number(product.newPrice);
        });
        await createEntity(data);
        close();
    };

    const handleProductScroll = (event: React.UIEvent<HTMLDivElement>) => {
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

    const sortedProducts = products?.pages.flatMap(page => page).sort((a, b) => a.name.localeCompare(b.name)) || [];

    useEffect(() => {
        if (!isOpen) {
            reset({
                name: '',
                description: '',
                offerToProducts: [{ productId: 0, productQuantity: 1, newPrice: 0 }]
            });
        }
    }, [isOpen, reset]);

    return (
        <Dialog open={isOpen} onClose={close} maxWidth="md" fullWidth>
            <DialogTitle>Create Offer</DialogTitle>
            <DialogContent dividers>
                <Box component={FormGroup} mb={3} sx={{ '& > *': { marginBottom: 2 } }}>
                    <TextField
                        label="Offer name"
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
                    {fields.map((item, index) => (
                        <Box sx={{ mt: 2 }} key={item.id} mb={2}>
                            <FormControl fullWidth error={!!errors.offerToProducts?.[index]?.productId} sx={{ mt: 2 }}>
                                <InputLabel>Product</InputLabel>
                                <Controller
                                    name={`offerToProducts.${index}.productId`}
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            MenuProps={{ onScroll: handleProductScroll }}
                                        >
                                            {sortedProducts.map((product) => (
                                                <MenuItem key={product.id} value={product.id}>
                                                    {product.name}
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
                                {errors.offerToProducts?.[index]?.productId && <p>{errors.offerToProducts?.[index]?.productId?.message}</p>}
                            </FormControl>
                            <TextField
                                label="Quantity"
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                fullWidth
                                type="number"
                                {...register(`offerToProducts.${index}.productQuantity`, { valueAsNumber: true })}
                                error={!!errors.offerToProducts?.[index]?.productQuantity}
                                helperText={errors.offerToProducts?.[index]?.productQuantity?.message}
                                sx={{ mt: 2 }}
                            />
                            <TextField
                                label="New Price"
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                fullWidth
                                type="number"
                                {...register(`offerToProducts.${index}.newPrice`, { valueAsNumber: true })}
                                error={!!errors.offerToProducts?.[index]?.newPrice}
                                helperText={errors.offerToProducts?.[index]?.newPrice?.message}
                                sx={{ mt: 2 }}
                            />
                            <Button onClick={() => remove(index)} color="error">
                                Remove Product
                            </Button>
                        </Box>
                    ))}
                    <Button onClick={() => append({ productId: 0, productQuantity: 1, newPrice: 0 })} color="primary">
                        Add Product
                    </Button>
                </Box>
                <div ref={loadMoreRef} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit(onCreateOffer)} color="primary">Create Offer</Button>
                <Button onClick={() => {
                    close();
                    reset({
                        name: '',
                        description: '',
                        offerToProducts: [{ productId: 0, productQuantity: 1, newPrice: 0 }]
                    });
                }} color="error">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateOfferDialog;

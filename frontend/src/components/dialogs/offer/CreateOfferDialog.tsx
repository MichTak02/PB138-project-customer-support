import React, { useContext, useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, FormGroup, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { OfferCreateDto } from "../../../models/offer.ts";
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { createOfferSchema } from "../../../validationSchemas/forms.ts";
import { CreateDialogProps, CreateDialogContext } from "../../dataDisplay/CursorPaginatedDataGrid.tsx";
import { useProducts } from '../../../hooks/useProducts';

const CreateOfferDialog = () => {
    const { isOpen, close, createEntity }: CreateDialogProps<OfferCreateDto> = useContext(CreateDialogContext);

    const { handleSubmit, formState: { errors }, register, control } = useForm<OfferCreateDto>({
        resolver: zodResolver(createOfferSchema),
    });

    const { data: products } = useProducts();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "offerToProducts"
    });

    const onCreateOffer = async (data: OfferCreateDto) => {
        data.offerToProducts.forEach(product => {
            product.productQuantity = Number(product.productQuantity);
            product.newPrice = Number(product.newPrice);
        });
        await createEntity(data);
        close();
    };

    return (
        <Dialog open={isOpen} onClose={close} maxWidth="md" fullWidth>
            <DialogTitle>Create Offer</DialogTitle>
            <DialogContent dividers>
                <Box component={FormGroup} mb={3} sx={{ '& > *': { marginBottom: 2 } }}>
                    <TextField
                        label="Offer name"
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
                    {fields.map((item, index) => (
                        <Box key={item.id} mb={2}>
                            <FormControl fullWidth error={!!errors.offerToProducts?.[index]?.productId}>
                                <InputLabel>Product</InputLabel>
                                <Controller
                                    name={`offerToProducts.${index}.productId`}
                                    control={control}
                                    render={({ field }) => (
                                        <Select {...field}>
                                            {products?.pages.flatMap(page => 
                                                page.map((product) => (
                                                    <MenuItem key={product.id} value={product.id}>
                                                        {product.name}
                                                    </MenuItem>
                                                ))
                                            )}
                                        </Select>
                                    )}
                                />
                                {errors.offerToProducts?.[index]?.productId && <p>{errors.offerToProducts?.[index]?.productId?.message}</p>}
                            </FormControl>
                            <TextField
                                label="Quantity"
                                fullWidth
                                type="number"
                                {...register(`offerToProducts.${index}.productQuantity`, { valueAsNumber: true })}
                                error={!!errors.offerToProducts?.[index]?.productQuantity}
                                helperText={errors.offerToProducts?.[index]?.productQuantity?.message}
                            />
                            <TextField
                                label="New Price"
                                fullWidth
                                type="number"
                                {...register(`offerToProducts.${index}.newPrice`, { valueAsNumber: true })}
                                error={!!errors.offerToProducts?.[index]?.newPrice}
                                helperText={errors.offerToProducts?.[index]?.newPrice?.message}
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
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit(onCreateOffer)} color="primary">Create Offer</Button>
                <Button onClick={close} color="error">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateOfferDialog;

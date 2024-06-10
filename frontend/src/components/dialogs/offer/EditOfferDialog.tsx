import React, { useContext, useEffect } from "react";
import { EditDialogProps, EditDialogContext } from "../../dataDisplay/CursorPaginatedDataGrid.tsx";
import { OfferExtendedDto, OfferUpdateDto } from "../../../models/offer.ts";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editOfferSchema } from "../../../validationSchemas/forms.ts";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormGroup, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useProducts } from "../../../hooks/useProducts";

const EditOfferDialog: React.FC = () => {
    const { isOpen, close, editEntity, useEntityExtended, targetEntityId }: EditDialogProps<OfferExtendedDto, OfferUpdateDto> = useContext(EditDialogContext);

    const { data: targetEntity, isLoading, error } = useEntityExtended(targetEntityId);

    const { handleSubmit, formState: { errors }, register, reset, control } = useForm<OfferUpdateDto>({
        resolver: zodResolver(editOfferSchema),
    });

    const { data: products } = useProducts();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "offerToProducts"
    });

    useEffect(() => {
        if (targetEntity) {
            const initialValues = {
                ...targetEntity,
                offerToProducts: targetEntity.offerToProducts.map(otp => ({
                    productId: otp.product.id,
                    productQuantity: otp.productQuantity,
                    newPrice: otp.newPrice,
                })),
            };
            reset(initialValues);
        }
    }, [targetEntity, reset]);

    const onUpdateOffer = async (data: OfferUpdateDto) => {
        data.offerToProducts?.forEach(product => {
            product.productQuantity = Number(product.productQuantity);
            product.newPrice = Number(product.newPrice);
        });
        await editEntity(targetEntityId, data);
        close();
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading offer data</div>;

    return (
        <Dialog open={isOpen} onClose={close} maxWidth="md" fullWidth>
            <DialogTitle>Edit Offer</DialogTitle>
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
                <Button onClick={handleSubmit(onUpdateOffer)} color="primary">Update Offer</Button>
                <Button onClick={close} color="error">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditOfferDialog;

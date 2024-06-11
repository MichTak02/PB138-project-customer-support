import React, { useContext, useEffect, useRef } from "react";
import { EditDialogProps, EditDialogContext } from "../../dataDisplay/CursorPaginatedDataGrid.tsx";
import { OfferExtendedDto, OfferUpdateDto } from "../../../models/offer.ts";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editOfferSchema } from "../../../validationSchemas/forms.ts";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormGroup, TextField, FormControl, InputLabel, Select, MenuItem, CircularProgress } from "@mui/material";
import { useProducts } from "../../../hooks/useProducts";

const EditOfferDialog: React.FC = () => {
    const { isOpen, close, editEntity, useEntityExtended, targetEntityId }: EditDialogProps<OfferExtendedDto, OfferUpdateDto> = useContext(EditDialogContext);

    const { data: targetEntity, isLoading, error } = useEntityExtended(targetEntityId);

    const { handleSubmit, formState: { errors }, register, reset, control } = useForm<OfferUpdateDto>({
        resolver: zodResolver(editOfferSchema),
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

    const onUpdateOffer = async (data: OfferUpdateDto) => {
        data.offerToProducts?.forEach(product => {
            product.productQuantity = Number(product.productQuantity);
            product.newPrice = Number(product.newPrice);
        });
        await editEntity(targetEntityId, data);
        close();
    };

    const handleProductScroll = (event: React.UIEvent<HTMLDivElement>) => {
        if (hasNextPage && !isFetchingNextPage && event.currentTarget.scrollTop + event.currentTarget.clientHeight >= event.currentTarget.scrollHeight) {
            fetchNextPage();
        }
    };

    const sortedProducts = products?.pages.flatMap(page => page).sort((a, b) => a.name.localeCompare(b.name)) || [];

    return (
        <Dialog open={isOpen} onClose={close} maxWidth="md" fullWidth>
            <DialogTitle>Edit Offer</DialogTitle>
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
                <Button onClick={handleSubmit(onUpdateOffer)} color="primary">Update Offer</Button>
                <Button onClick={close} color="error">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditOfferDialog;

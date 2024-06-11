import React, { useContext, useEffect, useRef, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, FormGroup, Box, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, CircularProgress } from '@mui/material';
import { CustomerCreateDto } from "../../../models/customer.ts";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { createCustomerSchema } from "../../../validationSchemas/forms.ts";
import { CreateDialogProps, CreateDialogContext } from "../../dataDisplay/CursorPaginatedDataGrid.tsx";
import { useProducts } from '../../../hooks/useProducts';

const CreateCustomerDialog = () => {
    const { isOpen, close, createEntity }: CreateDialogProps<CustomerCreateDto> = useContext(CreateDialogContext);

    const { handleSubmit, formState: { errors }, register, control, reset } = useForm<CustomerCreateDto>({
        resolver: zodResolver(createCustomerSchema),
        defaultValues: {
            name: '',
            surname: '',
            email: '',
            phoneNumber: '',
            productIds: []
        }
    });

    const {
        data: products,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useProducts();

    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const [selectOpen, setSelectOpen] = useState(false);

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

    useEffect(() => {
        if (!isOpen) {
            reset({
                name: '',
                surname: '',
                email: '',
                phoneNumber: '',
                productIds: []
            });
        }
    }, [isOpen, reset]);

    const onCreateCustomer = async (data: CustomerCreateDto) => {
        if (data.productIds.length === 0) {
            alert("Please select at least one product.");
            return;
        }
        await createEntity(data);
        close();
    };

    const sortedProducts = products?.pages.flatMap(page => page).sort((a, b) => a.name.localeCompare(b.name)) || [];

    return (
        <Dialog open={isOpen} onClose={close} maxWidth="md" fullWidth>
            <DialogTitle>Create Customer</DialogTitle>
            <DialogContent dividers>
                <Box component={FormGroup} mb={3} sx={{ '& > *': { marginBottom: 2 } }}>
                    <TextField
                        label="Name"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        fullWidth
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        label="Surname"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        fullWidth
                        {...register("surname")}
                        error={!!errors.surname}
                        helperText={errors.surname?.message}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        label="Email"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        fullWidth
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        label="Phone Number"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        fullWidth
                        {...register("phoneNumber")}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber?.message}
                        sx={{ mt: 2 }}
                    />
                    <FormControl sx={{ mt: 2 }} fullWidth error={!!errors.productIds}>
                        <InputLabel id="product-label">Products</InputLabel>
                        <Controller
                            control={control}
                            name="productIds"
                            render={({ field }) => (
                                <>
                                    <Select
                                        labelId="product-label"
                                        multiple
                                        {...field}
                                        open={selectOpen}
                                        onOpen={() => setSelectOpen(true)}
                                        onClose={() => setSelectOpen(false)}
                                        value={field.value ?? []}
                                        renderValue={(selected) => {
                                            const selectedProducts = sortedProducts.filter(product => selected.includes(product.id));
                                            return selectedProducts.map(product => product.name).join(', ') || '';
                                        }}
                                        MenuProps={{ onScroll: handleProductScroll }}
                                    >
                                        {sortedProducts.map((product) => (
                                            <MenuItem key={product.id} value={product.id}>
                                                <Checkbox checked={field.value.includes(product.id)} />
                                                <ListItemText primary={product.name} />
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
                        {errors.productIds && <p>{errors.productIds.message}</p>}
                    </FormControl>
                </Box>
                <div ref={loadMoreRef} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit(onCreateCustomer)} color="primary">Create Customer</Button>
                <Button onClick={() => {
                    close();
                    reset({
                        name: '',
                        surname: '',
                        email: '',
                        phoneNumber: '',
                        productIds: []
                    });
                }} color="error">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateCustomerDialog;

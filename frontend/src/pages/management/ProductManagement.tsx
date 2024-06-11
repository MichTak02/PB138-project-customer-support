import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import {
    useProducts, useProduct,
    useCreateProduct, useDeleteProduct, useUpdateProduct
} from '../../hooks/useProducts.ts';
import Page from "../../components/base/Page.tsx";
import { Typography } from "@mui/material";
import CursorPaginatedDataGrid from "../../components/dataDisplay/CursorPaginatedDataGrid.tsx";
import {ProductCreateDto, ProductDto, ProductFilters, ProductUpdateDto} from "../../models/product.ts";
import CreateProductDialog from "../../components/dialogs/product/CreateProductDialog.tsx";
import EditProductDialog from "../../components/dialogs/product/EditProductDialog.tsx";
import DetailProductDialog from "../../components/dialogs/product/DetailProductDialog.tsx";
import DeleteProductDialog from "../../components/dialogs/product/DeleteProductDialog.tsx";

const ProductManagement: React.FC = () => {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'price', headerName: 'Price', width: 100 },
        { field: 'type', headerName: 'Type', width: 100 },
        {
            field: 'categories',
            headerName: 'Categories',
            width: 200,
            renderCell: (params) => (
                <div>
                    {params.row.categories.map((category: { name: string }) => category.name).join(', ')}
                </div>
            ),
        },
    ];

    return (
        <Page title="Product Management">
            <Typography component="h1" variant="h5">
                Product Management
            </Typography>
            <CursorPaginatedDataGrid<ProductDto, ProductDto, ProductCreateDto, ProductUpdateDto, ProductFilters>
                columns={columns}
                createFilterObject={(model) => { return {
                    id: model.items.find(item => item.field === 'id')?.value ?? undefined,
                    name: model.items.find(item => item.field === 'name')?.value ?? undefined,
                    type: model.items.find(item => item.field === 'type')?.value ?? undefined,
                }}}
                createDialog={<CreateProductDialog />}
                editDialog={<EditProductDialog />}
                detailDialog={<DetailProductDialog />}
                deleteDialog={<DeleteProductDialog />}
                useEntityHook={useProduct}
                useEntitiesHook={useProducts}
                useCreateEntityHook={useCreateProduct}
                useUpdateEntityHook={useUpdateProduct}
                useDeleteEntityHook={useDeleteProduct}
            />
        </Page>
    );
};

export default ProductManagement;

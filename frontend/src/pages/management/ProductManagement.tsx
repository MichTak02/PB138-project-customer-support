import React, { useState, useEffect } from 'react';
import Page from '../../components/base/Page';
import { Typography, Button } from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '../../hooks/useProducts';
import { ProductCreateDto, ProductExtendedDto, ProductUpdateDto } from '../../models/product';
import AddProductDialog from '../../components/dialogs/AddProductDialog';
import EditProductDialog from '../../components/dialogs/EditProductDialog';

const ProductManagement: React.FC = () => {
  const [cursorId, setCursorId] = useState<number | undefined>(undefined);
  const { data: products, isLoading, error } = useProducts(cursorId);
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductExtendedDto | null>(null);

  const handleAddProduct = (product: ProductCreateDto) => {
    createProductMutation.mutate(product);
  };

  const handleEditProduct = (id: number, product: ProductUpdateDto) => {
    updateProductMutation.mutate({ id, product });
  };

  const handleDeleteProduct = (id: number) => {
    deleteProductMutation.mutate(id);
  };

  const handleShowMore = () => {
    if (products && products.length > 0) {
      const lastProduct = products[products.length - 1];
      setCursorId(lastProduct.id);
    }
  };

  if (isLoading && cursorId === undefined) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <Page title="Product Management">
      <Typography component="h1" variant="h5">
        Product Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setIsCreateDialogOpen(true)}>
        Add Product
      </Button>
      <DataGrid
        rows={products || []}
        columns={[
          { field: 'id', headerName: 'ID', width: 70 },
          { field: 'name', headerName: 'Name', width: 200 },
          { field: 'description', headerName: 'Description', width: 400 },
          { field: 'price', headerName: 'Price', width: 100 },
          { field: 'type', headerName: 'Type', width: 100 },
          {
            field: 'categories',
            headerName: 'Categories',
            width: 200,
          },
          {
            field: 'edit',
            headerName: 'Edit',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setCurrentProduct(params.row as ProductExtendedDto);
                  setIsEditDialogOpen(true);
                }}
              >
                Edit
              </Button>
            ),
          },
          {
            field: 'delete',
            headerName: 'Delete',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteProduct((params.row as ProductExtendedDto).id)}
              >
                Delete
              </Button>
            ),
          },
        ]}
        disableRowSelectionOnClick
      />
      <Button variant="contained" color="primary" onClick={handleShowMore}>
        Show More
      </Button>

      <AddProductDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onAddProduct={handleAddProduct}
      />

      <EditProductDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onEditProduct={handleEditProduct}
        product={currentProduct}
      />
    </Page>
  );
};

export default ProductManagement;

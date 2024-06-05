import React, { useState } from 'react';
import Page from '../../components/base/Page';
import { Typography, Button } from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '../../hooks/useProducts';
import { Product } from '../../models/product';
import AddProductDialog from '../../components/dialogs/AddProductDialog';
import EditProductDialog from '../../components/dialogs/EditProductDialog';

const ProductManagement: React.FC = () => {
  const { data: products, isLoading, error } = useProducts();
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const handleAddProduct = (product: { name: string; description: string; price: number; type: string }) => {
    createProductMutation.mutate(product);
  };

  const handleEditProduct = (id: number, product: { name: string; description: string; price: number; type: string }) => {
    updateProductMutation.mutate({ id, product });
  };

  const handleDeleteProduct = (id: number) => {
    deleteProductMutation.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
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
          { field: 'type', headerName: 'Type', width: 150 },
          {
            field: 'categories',
            headerName: 'Categories',
            width: 200,
            renderCell: (params: GridRenderCellParams) => (
              <div>
                {(params.row as Product).categories.map((category) => (
                  <span key={category.id}>{category.name} </span>
                ))}
              </div>
            ),
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
                  setCurrentProduct(params.row as Product);
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
                onClick={() => handleDeleteProduct((params.row as Product).id)}
              >
                Delete
              </Button>
            ),
          },
        ]}
        disableRowSelectionOnClick
      />

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

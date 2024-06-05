import React, { useState } from 'react';
import Page from '../../components/base/Page';
import { Typography, Button } from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '../../hooks/useCategories';
import { Category } from '../../models/category';
import AddCategoryDialog from '../../components/dialogs/AddCategoryDialog';
import EditCategoryDialog from '../../components/dialogs/EditCategoryDialog';

const CategoryManagement: React.FC = () => {
  const { data: categories, isLoading, error } = useCategories();
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  const handleAddCategory = (name: string) => {
    createCategoryMutation.mutate({ name });
  };

  const handleEditCategory = (id: number, name: string) => {
    updateCategoryMutation.mutate({ id, category: { name } });
  };

  const handleDeleteCategory = (id: number) => {
    deleteCategoryMutation.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;

  return (
    <Page title="Category Management">
      <Typography component="h1" variant="h5">
        Category Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setIsCreateDialogOpen(true)}>
        Add Category
      </Button>
      <DataGrid
        rows={categories || []}
        columns={[
          { field: 'id', headerName: 'ID', width: 70 },
          { field: 'name', headerName: 'Name', width: 200 },
          {
            field: 'edit',
            headerName: 'Edit',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setCurrentCategory(params.row as Category);
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
                onClick={() => handleDeleteCategory((params.row as Category).id)}
              >
                Delete
              </Button>
            ),
          },
        ]}
        disableRowSelectionOnClick
      />

      <AddCategoryDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onAddCategory={handleAddCategory}
      />

      <EditCategoryDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onEditCategory={handleEditCategory}
        category={currentCategory}
      />
    </Page>
  );
};

export default CategoryManagement;

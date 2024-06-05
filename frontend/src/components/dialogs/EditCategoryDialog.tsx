import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { Category } from '../../models/category';

interface EditCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onEditCategory: (id: number, name: string) => void;
  category: Category | null;
}

const EditCategoryDialog: React.FC<EditCategoryDialogProps> = ({ open, onClose, onEditCategory, category }) => {
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (category) {
      setCategoryName(category.name);
    }
  }, [category]);

  const handleEditCategory = () => {
    if (category) {
      onEditCategory(category.id, categoryName);
      setCategoryName('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Category</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Category Name"
          type="text"
          fullWidth
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleEditCategory} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCategoryDialog;

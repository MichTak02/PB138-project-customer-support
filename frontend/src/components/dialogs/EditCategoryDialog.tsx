import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { CategoryDto } from '../../models/category';

interface EditCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onEditCategory: (id: number, name: string) => void;
  category: CategoryDto | null;
}

const EditCategoryDialog: React.FC<EditCategoryDialogProps> = ({ open, onClose, onEditCategory, category }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  const handleEditCategory = () => {
    if (category) {
      onEditCategory(category.id, name);
      setName('');
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
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
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

import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

interface AddCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onAddCategory: (name: string) => void;
}

const AddCategoryDialog: React.FC<AddCategoryDialogProps> = ({ open, onClose, onAddCategory }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleAddCategory = () => {
    onAddCategory(categoryName);
    setCategoryName('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Category</DialogTitle>
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
        <Button onClick={handleAddCategory} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategoryDialog;

import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

interface AddCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onAddCategory: (name: string) => void;
}

const AddCategoryDialog: React.FC<AddCategoryDialogProps> = ({ open, onClose, onAddCategory }) => {
  const [name, setName] = useState('');

  const handleAddCategory = () => {
    onAddCategory(name);
    setName('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Category</DialogTitle>
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
        <Button onClick={handleAddCategory} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategoryDialog;

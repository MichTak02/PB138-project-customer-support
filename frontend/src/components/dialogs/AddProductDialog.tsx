import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

interface AddProductDialogProps {
  open: boolean;
  onClose: () => void;
  onAddProduct: (product: { name: string; description: string; price: number; type: string }) => void;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({ open, onClose, onAddProduct }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [type, setType] = useState('');

  const handleAddProduct = () => {
    onAddProduct({ name, description, price, type });
    setName('');
    setDescription('');
    setPrice(0);
    setType('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Product</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Product Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Price"
          type="number"
          fullWidth
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <TextField
          margin="dense"
          label="Type"
          type="text"
          fullWidth
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddProduct} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductDialog;

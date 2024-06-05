import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { Product } from '../../models/product';

interface EditProductDialogProps {
  open: boolean;
  onClose: () => void;
  onEditProduct: (id: number, product: { name: string; description: string; price: number; type: string }) => void;
  product: Product | null;
}

const EditProductDialog: React.FC<EditProductDialogProps> = ({ open, onClose, onEditProduct, product }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [type, setType] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setType(product.type);
    }
  }, [product]);

  const handleEditProduct = () => {
    if (product) {
      onEditProduct(product.id, { name, description, price, type });
      setName('');
      setDescription('');
      setPrice(0);
      setType('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Product</DialogTitle>
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
        <Button onClick={handleEditProduct} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductDialog;

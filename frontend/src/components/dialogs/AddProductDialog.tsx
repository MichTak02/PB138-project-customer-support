import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { ProductCreateDto, TypeValues } from '../../models/product';

interface AddProductDialogProps {
  open: boolean;
  onClose: () => void;
  onAddProduct: (product: ProductCreateDto) => void;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({ open, onClose, onAddProduct }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [type, setType] = useState<TypeValues>(TypeValues.PRODUCT);
  const [categoryIds, setCategoryIds] = useState<number[]>([]);

  const handleAdd = () => {
    onAddProduct({ name, description, price, type, categoryIds });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Product</DialogTitle>
      <DialogContent>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth />
        <TextField label="Price" value={price} onChange={(e) => setPrice(Number(e.target.value))} fullWidth type="number" />
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select value={type} onChange={(e) => setType(e.target.value as TypeValues)} fullWidth>
            <MenuItem value={TypeValues.PRODUCT}>PRODUCT</MenuItem>
            <MenuItem value={TypeValues.SERVICE}>SERVICE</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Category IDs" value={categoryIds.join(',')} onChange={(e) => setCategoryIds(e.target.value.split(',').map(Number))} fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductDialog;

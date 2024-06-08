import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { ProductExtendedDto, ProductUpdateDto, TypeValues } from '../../models/product';

interface EditProductDialogProps {
  open: boolean;
  onClose: () => void;
  onEditProduct: (id: number, product: ProductUpdateDto) => void;
  product: ProductExtendedDto | null;
}

const EditProductDialog: React.FC<EditProductDialogProps> = ({ open, onClose, onEditProduct, product }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [type, setType] = useState<TypeValues>(TypeValues.PRODUCT);
  const [categoryIds, setCategoryIds] = useState<number[]>([]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setType(product.type as TypeValues);
      setCategoryIds(product.categories.map((cat) => cat.id));
    }
  }, [product]);

  const handleEdit = () => {
    if (product) {
      onEditProduct(product.id, { name, description, price, type, categoryIds });
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Product</DialogTitle>
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
        <Button onClick={handleEdit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductDialog;

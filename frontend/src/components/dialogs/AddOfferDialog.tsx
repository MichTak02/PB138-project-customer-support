import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

interface AddOfferDialogProps {
  open: boolean;
  onClose: () => void;
  onAddOffer: (offer: { name: string; description: string }) => void;
}

const AddOfferDialog: React.FC<AddOfferDialogProps> = ({ open, onClose, onAddOffer }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleAddOffer = () => {
    onAddOffer({ name, description });
    setName('');
    setDescription('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Offer</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Offer Name"
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddOffer} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOfferDialog;

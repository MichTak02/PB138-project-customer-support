import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { Offer } from '../../models/offer';

interface EditOfferDialogProps {
  open: boolean;
  onClose: () => void;
  onEditOffer: (id: number, offer: { name: string; description: string }) => void;
  offer: Offer | null;
}

const EditOfferDialog: React.FC<EditOfferDialogProps> = ({ open, onClose, onEditOffer, offer }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (offer) {
      setName(offer.name);
      setDescription(offer.description);
    }
  }, [offer]);

  const handleEditOffer = () => {
    if (offer) {
      onEditOffer(offer.id, { name, description });
      setName('');
      setDescription('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Offer</DialogTitle>
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
        <Button onClick={handleEditOffer} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditOfferDialog;

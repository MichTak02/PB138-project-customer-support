import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

interface AddCustomerDialogProps {
  open: boolean;
  onClose: () => void;
  onAddCustomer: (customer: { name: string; surname: string; email: string; phoneNumber: string }) => void;
}

const AddCustomerDialog: React.FC<AddCustomerDialogProps> = ({ open, onClose, onAddCustomer }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleAddCustomer = () => {
    onAddCustomer({ name, surname, email, phoneNumber });
    setName('');
    setSurname('');
    setEmail('');
    setPhoneNumber('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Customer</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="First Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Surname"
          type="text"
          fullWidth
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Phone Number"
          type="text"
          fullWidth
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddCustomer} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCustomerDialog;

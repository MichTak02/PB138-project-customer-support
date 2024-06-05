import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { Customer } from '../../models/customer';

interface EditCustomerDialogProps {
  open: boolean;
  onClose: () => void;
  onEditCustomer: (id: number, customer: { name: string; surname: string; email: string; phoneNumber: string }) => void;
  customer: Customer | null;
}

const EditCustomerDialog: React.FC<EditCustomerDialogProps> = ({ open, onClose, onEditCustomer, customer }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (customer) {
      setName(customer.name);
      setSurname(customer.surname);
      setEmail(customer.email);
      setPhoneNumber(customer.phoneNumber);
    }
  }, [customer]);

  const handleEditCustomer = () => {
    if (customer) {
      onEditCustomer(customer.id, { name, surname, email, phoneNumber });
      setName('');
      setSurname('');
      setEmail('');
      setPhoneNumber('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Customer</DialogTitle>
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
        <Button onClick={handleEditCustomer} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCustomerDialog;

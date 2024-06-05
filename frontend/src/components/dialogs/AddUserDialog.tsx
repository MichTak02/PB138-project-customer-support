import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

interface AddUserDialogProps {
  open: boolean;
  onClose: () => void;
  onAddUser: (user: { email: string; displayName: string; passwordHash: string; role: string }) => void;
}

const AddUserDialog: React.FC<AddUserDialogProps> = ({ open, onClose, onAddUser }) => {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const [role, setRole] = useState('');

  const handleAddUser = () => {
    onAddUser({ email, displayName, passwordHash, role });
    setEmail('');
    setDisplayName('');
    setPasswordHash('');
    setRole('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add User</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Display Name"
          type="text"
          fullWidth
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Password Hash"
          type="text"
          fullWidth
          value={passwordHash}
          onChange={(e) => setPasswordHash(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Role"
          type="text"
          fullWidth
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddUser} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;

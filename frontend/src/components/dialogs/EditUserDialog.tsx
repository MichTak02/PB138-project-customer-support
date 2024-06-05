import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { User } from '../../models/user';

interface EditUserDialogProps {
  open: boolean;
  onClose: () => void;
  onEditUser: (id: number, user: { email: string; displayName: string; passwordHash: string; role: string }) => void;
  user: User | null;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({ open, onClose, onEditUser, user }) => {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setDisplayName(user.displayName);
      setPasswordHash(user.passwordHash);
      setRole(user.role);
    }
  }, [user]);

  const handleEditUser = () => {
    if (user) {
      onEditUser(user.id, { email, displayName, passwordHash, role });
      setEmail('');
      setDisplayName('');
      setPasswordHash('');
      setRole('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
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
        <Button onClick={handleEditUser} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;

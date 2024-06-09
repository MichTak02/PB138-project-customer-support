import React, { useState } from 'react';
import Page from '../../components/base/Page';
import { Typography, Button } from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from '../../hooks/useUsers.ts';
import { User } from '../../models/user';
import AddUserDialog from '../../components/dialogs/AddUserDialog';
import EditUserDialog from '../../components/dialogs/EditUserDialog';

const UserManagement: React.FC = () => {
  const { data: users, isLoading, error } = useUsers();
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleAddUser = (user: { email: string; displayName: string; passwordHash: string; role: string }) => {
    createUserMutation.mutate(user);
  };

  const handleEditUser = (id: number, user: { email: string; displayName: string; passwordHash: string; role: string }) => {
    updateUserMutation.mutate({ id, user });
  };

  const handleDeleteUser = (id: number) => {
    deleteUserMutation.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <Page title="User Management">
      <Typography component="h1" variant="h5">
        User Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setIsCreateDialogOpen(true)}>
        Add User
      </Button>
      <DataGrid
        rows={users || []}
        columns={[
          { field: 'id', headerName: 'ID', width: 70 },
          { field: 'email', headerName: 'Email', width: 200 },
          { field: 'displayName', headerName: 'Display Name', width: 200 },
          { field: 'role', headerName: 'Role', width: 150 },
          { field: 'createdOn', headerName: 'Created On', width: 200 },
          {
            field: 'edit',
            headerName: 'Edit',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setCurrentUser(params.row as User);
                  setIsEditDialogOpen(true);
                }}
              >
                Edit
              </Button>
            ),
          },
          {
            field: 'delete',
            headerName: 'Delete',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteUser((params.row as User).id)}
              >
                Delete
              </Button>
            ),
          },
        ]}
        disableRowSelectionOnClick
      />

      <AddUserDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onAddUser={handleAddUser}
      />

      <EditUserDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onEditUser={handleEditUser}
        user={currentUser}
      />
    </Page>
  );
};

export default UserManagement;

import React, { useState } from 'react';
import Page from '../../components/base/Page';
import { Typography, Button } from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { useCustomers, useCreateCustomer, useUpdateCustomer, useDeleteCustomer } from '../../hooks/useCustomers.ts';
import { Customer } from '../../models/customer';
import AddCustomerDialog from '../../components/dialogs/AddCustomerDialog';
import EditCustomerDialog from '../../components/dialogs/EditCustomerDialog';

const CustomerManagement: React.FC = () => {
  const { data: customers, isLoading, error } = useCustomers();
  const createCustomerMutation = useCreateCustomer();
  const updateCustomerMutation = useUpdateCustomer();
  const deleteCustomerMutation = useDeleteCustomer();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);

  const handleAddCustomer = (customer: { name: string; surname: string; email: string; phoneNumber: string }) => {
    createCustomerMutation.mutate(customer);
  };

  const handleEditCustomer = (id: number, customer: { name: string; surname: string; email: string; phoneNumber: string }) => {
    updateCustomerMutation.mutate({ id, customer });
  };

  const handleDeleteCustomer = (id: number) => {
    deleteCustomerMutation.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading customers</div>;

  return (
    <Page title="Customer Management">
      <Typography component="h1" variant="h5">
        Customer Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setIsCreateDialogOpen(true)}>
        Add Customer
      </Button>
      <DataGrid
        rows={customers || []}
        columns={[
          { field: 'id', headerName: 'ID', width: 70 },
          { field: 'name', headerName: 'Name', width: 200 },
          { field: 'surname', headerName: 'Surname', width: 200 },
          { field: 'email', headerName: 'Email', width: 250 },
          { field: 'phoneNumber', headerName: 'Phone Number', width: 200 },
          {
            field: 'edit',
            headerName: 'Edit',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setCurrentCustomer(params.row as Customer);
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
                onClick={() => handleDeleteCustomer((params.row as Customer).id)}
              >
                Delete
              </Button>
            ),
          },
        ]}
        disableRowSelectionOnClick
      />

      <AddCustomerDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onAddCustomer={handleAddCustomer}
      />

      <EditCustomerDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onEditCustomer={handleEditCustomer}
        customer={currentCustomer}
      />
    </Page>
  );
};

export default CustomerManagement;


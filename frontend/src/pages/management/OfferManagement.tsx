import React, { useState } from 'react';
import Page from '../../components/base/Page';
import { Typography, Button } from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { useOffers, useCreateOffer, useUpdateOffer, useDeleteOffer } from '../../hooks/useOffers';
import { Offer } from '../../models/offer';
import AddOfferDialog from '../../components/dialogs/AddOfferDialog';
import EditOfferDialog from '../../components/dialogs/EditOfferDialog';

const OfferManagement: React.FC = () => {
  const { data: offers, isLoading, error } = useOffers();
  const createOfferMutation = useCreateOffer();
  const updateOfferMutation = useUpdateOffer();
  const deleteOfferMutation = useDeleteOffer();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentOffer, setCurrentOffer] = useState<Offer | null>(null);

  const handleAddOffer = (offer: { name: string; description: string }) => {
    createOfferMutation.mutate(offer);
  };

  const handleEditOffer = (id: number, offer: { name: string; description: string }) => {
    updateOfferMutation.mutate({ id, offer });
  };

  const handleDeleteOffer = (id: number) => {
    deleteOfferMutation.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading offers</div>;

  return (
    <Page title="Offer Management">
      <Typography component="h1" variant="h5">
        Offer Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setIsCreateDialogOpen(true)}>
        Add Offer
      </Button>
      <DataGrid
        rows={offers || []}
        columns={[
          { field: 'id', headerName: 'ID', width: 70 },
          { field: 'name', headerName: 'Name', width: 200 },
          { field: 'description', headerName: 'Description', width: 400 },
          {
            field: 'products',
            headerName: 'Products',
            width: 400,
            renderCell: (params: GridRenderCellParams) => (
              <div>
                {(params.row as Offer).offerToProducts.map((offerToProduct) => (
                  <div key={offerToProduct.id}>
                    {offerToProduct.product.name} - {offerToProduct.newPrice} (Qty: {offerToProduct.productQuantity})
                  </div>
                ))}
              </div>
            ),
          },
          {
            field: 'edit',
            headerName: 'Edit',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setCurrentOffer(params.row as Offer);
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
                onClick={() => handleDeleteOffer((params.row as Offer).id)}
              >
                Delete
              </Button>
            ),
          },
        ]}
        disableRowSelectionOnClick
      />

      <AddOfferDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onAddOffer={handleAddOffer}
      />

      <EditOfferDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onEditOffer={handleEditOffer}
        offer={currentOffer}
      />
    </Page>
  );
};

export default OfferManagement;

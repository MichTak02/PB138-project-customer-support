import React from 'react';
import Page from '../../components/base/Page';
import { Typography } from '@mui/material';
import { useOffers, useOffer, useCreateOffer, useUpdateOffer, useDeleteOffer } from '../../hooks/useOffers.ts';
import {OfferDto, OfferExtendedDto, OfferCreateDto, OfferUpdateDto, OfferFilters} from '../../models/offer';
import CreateOfferDialog from '../../components/dialogs/offer/CreateOfferDialog.tsx';
import EditOfferDialog from '../../components/dialogs/offer/EditOfferDialog.tsx';
import DetailOfferDialog from '../../components/dialogs/offer/DetailOfferDialog.tsx';
import DeleteOfferDialog from '../../components/dialogs/offer/DeleteOfferDialog.tsx';
import CursorPaginatedDataGrid from '../../components/dataDisplay/CursorPaginatedDataGrid.tsx';
import { GridRenderCellParams } from '@mui/x-data-grid';

const OfferManagement: React.FC = () => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 200 },
        {
            field: 'products',
            headerName: 'Products',
            width: 400,
            renderCell: (params: GridRenderCellParams) => (
                <div>
                    {(params.row as OfferExtendedDto).offerToProducts.map((offerToProduct) => (
                        <div key={offerToProduct.id}>
                            {offerToProduct.product.name} - {offerToProduct.newPrice} (Qty: {offerToProduct.productQuantity})
                        </div>
                    ))}
                </div>
            ),
        },
    ];

    return (
        <Page title="Offer Management">
            <Typography component="h1" variant="h5">
                Offer Management
            </Typography>
            <CursorPaginatedDataGrid<OfferDto, OfferExtendedDto, OfferCreateDto, OfferUpdateDto, OfferFilters>
                useEntitiesHook={useOffers}
                useEntityHook={useOffer}
                useCreateEntityHook={useCreateOffer}
                useUpdateEntityHook={useUpdateOffer}
                useDeleteEntityHook={useDeleteOffer}
                columns={columns}
                createFilterObject={(model) => { return {
                    id: model.items.find(item => item.field === 'id')?.value ?? undefined,
                    name: model.items.find(item => item.field === 'name')?.value ?? undefined,
                }}}
                createDialog={<CreateOfferDialog />}
                editDialog={<EditOfferDialog />}
                detailDialog={<DetailOfferDialog />}
                deleteDialog={<DeleteOfferDialog />}
            />
        </Page>
    );
};

export default OfferManagement;

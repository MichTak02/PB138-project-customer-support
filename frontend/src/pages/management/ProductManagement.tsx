import React from 'react';
import Page from '../../components/base/Page';
import { Typography } from '@mui/material';

export function ProductManagement() {
  return (
    <Page title="Product Management">
      <Typography component="p" variant="h5">
        Manage your products here.
      </Typography>
    </Page>
  );
}

export default ProductManagement;
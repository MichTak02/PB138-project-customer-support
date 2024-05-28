import React from 'react';
import Page from '../../components/base/Page';
import { Typography } from '@mui/material';


export function CustomerManagement() {
  return (
    <Page title="Customer Management">
      <Typography component="p" variant="h5">
        Manage your customers here.
      </Typography>
    </Page>
  );
}

export default CustomerManagement;

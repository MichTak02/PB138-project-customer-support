import React from 'react';
import Page from '../../components/base/Page';
import { Typography } from '@mui/material';

export function UserManagement() {
  return (
    <Page title="User Management">
      <Typography component="p" variant="h5">
        Manage your users here.
      </Typography>
    </Page>
  );
}

export default UserManagement;

import React from 'react';
import Page from '../../components/base/Page';
import { Typography } from '@mui/material';

export function CategoryManagement() {
  return (
    <Page title="Category Management">
      <Typography component="p" variant="h5">
        Manage your categories here.
      </Typography>
    </Page>
  );
}

export default CategoryManagement;
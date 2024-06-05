import React from 'react';
import Page from '../../components/base/Page';
import { Typography } from '@mui/material';

export function NotFound() {
  return (
    <Page title="404 Not Found">
      <Typography component="p" variant="h5">
        Sorry, the page you are looking for does not exist.
      </Typography>
    </Page>
  );
}

export default NotFound;
import React from 'react';
import Page from '../components/base/Page';
import { Typography } from '@mui/material';

export function Register() {
  return (
    <Page title="Register">
      <Typography component="p" variant="h5">
        Please register to continue.
      </Typography>
    </Page>
  );
}

export default Register;

import React from 'react';
import Page from '../components/base/Page';
import { Typography } from '@mui/material';


export function Login() {
  return (
    <Page title="Login">
      <Typography component="p" variant="h5">
        Please log in to continue.
      </Typography>
    </Page>
  );
}

export default Login;

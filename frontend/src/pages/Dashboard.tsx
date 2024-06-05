import Page from '../components/base/Page';
import { Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

export function Dashboard() {
  return (
    <Page title="Dashboard">
      <Typography component="h2" variant="h5" gutterBottom>
        Management
      </Typography>
      <List>
        <ListItem button component={Link} to="/users">
          <ListItemText primary="User Management" />
        </ListItem>
        <ListItem button component={Link} to="/customers">
          <ListItemText primary="Customer Management" />
        </ListItem>
        <ListItem button component={Link} to="/products">
          <ListItemText primary="Product Management" />
        </ListItem>
        <ListItem button component={Link} to="/categories">
          <ListItemText primary="Category Management" />
        </ListItem>
        <ListItem button component={Link} to="/offers">
          <ListItemText primary="Offer Management" />
        </ListItem>
      </List>
      
      <Divider sx={{ my: 2 }} />

      <Typography component="h2" variant="h5" gutterBottom>
        Communications
      </Typography>
      <List>
        <ListItem button component={Link} to="/customers/:customerId/voice">
          <ListItemText primary="Voice Communications" />
        </ListItem>
        <ListItem button component={Link} to="/customers/:customerId/chat">
          <ListItemText primary="Chat Communications" />
        </ListItem>
      </List>
    </Page>
  );
}

export default Dashboard;

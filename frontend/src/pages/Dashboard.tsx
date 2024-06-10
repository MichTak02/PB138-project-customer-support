import Page from '../components/base/Page';
import {Typography, List, ListItemButton, Divider, ListItemText} from '@mui/material';
import {Link} from 'react-router-dom';
import Authorized from "../components/auth/Authorized.tsx";
import {RoleValues} from "../models/user.ts";

export function Dashboard() {
    return (
        <Page title="Dashboard">
            <Typography component="h2" variant="h5" gutterBottom>
                Management
            </Typography>
            <List>
                <Authorized role={RoleValues.ADMIN}>
                    <ListItemButton component={Link} to="/users">
                        <ListItemText primary="User Management"/>
                    </ListItemButton>
                </Authorized>
                <ListItemButton component={Link} to="/customers">
                    <ListItemText primary="Customer Management"/>
                </ListItemButton>
                <ListItemButton component={Link} to="/products">
                    <ListItemText primary="Product Management"/>
                </ListItemButton>
                <ListItemButton component={Link} to="/categories">
                    <ListItemText primary="Category Management"/>
                </ListItemButton>
                <ListItemButton component={Link} to="/offers">
                    <ListItemText primary="Offer Management"/>
                </ListItemButton>
            </List>

            <Divider sx={{my: 2}}/>

            <Typography component="h2" variant="h5" gutterBottom>
                Communications
            </Typography>
            <List>
                <ListItemButton component={Link} to="/customers/:customerId/voice">
                    <ListItemText primary="Voice Communications"/>
                </ListItemButton>
                <ListItemButton component={Link} to="/customers/:customerId/chat">
                    <ListItemText primary="Chat Communications"/>
                </ListItemButton>
            </List>
        </Page>
    );
}

export default Dashboard;

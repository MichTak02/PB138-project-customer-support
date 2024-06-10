import Page from '../components/base/Page';
import { Typography, List, ListItem, ListItemText, Divider, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import PercentIcon from '@mui/icons-material/Percent';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

export function Dashboard() {
  const items = [
    { text: "User Management", link: "/auth/users", icon: <PeopleIcon /> },
    { text: "Customer Management", link: "/auth/customers", icon: <PersonIcon /> },
    { text: "Product Management", link: "/auth/products", icon: <InventoryIcon /> },
    { text: "Category Management", link: "/auth/categories", icon: <CategoryIcon /> },
    { text: "Offer Management", link: "/auth/offers", icon: <PercentIcon /> },
  ];

  const communications = [
    { text: "Voice Communications", link: "/customers/:customerId/voice", icon: <KeyboardVoiceIcon /> },
    { text: "Chat Communications", link: "/customers/:customerId/chat", icon: <ChatBubbleIcon /> },
  ];

  return (
    <Page title="Dashboard">
      <Typography component="h2" variant="h5" gutterBottom>
        Management
      </Typography>
      <List>
      {items.map((item, index) => (
        <ListItem button component={Link} to={item.link} key={index}>
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
      
      <Divider sx={{ my: 2 }} />

      <Typography component="h2" variant="h5" gutterBottom>
        Communications
      </Typography>
      <List>
      {communications.map((communication, index) => (
        <ListItem button component={Link} to={communication.link} key={index}>
          <ListItemIcon>
            {communication.icon}
          </ListItemIcon>
          <ListItemText primary={communication.text} />
        </ListItem>
      ))}
    </List>
    </Page>
  );
}

export default Dashboard;

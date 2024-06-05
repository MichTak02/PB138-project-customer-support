import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button, ButtonGroup, Container, IconButton, Tooltip, Typography } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const pathAndTitle: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/products': 'Products',
  '/users': 'Users',
  '/customers': 'Customers',
  '/categories': 'Categories',
  '/offers': 'Offers',
};

export function Navbar() {
  const theme = useTheme();

  return (
    <AppBar position="static" sx={{ width: '100%' }} color="primary">
      <Container disableGutters>
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/dashboard"
            sx={{ color: 'inherit', textDecoration: 'none', flexGrow: 1 }}
          >
            Web Name
          </Typography>
          <ButtonGroup variant="text" color="inherit">
            {Object.keys(pathAndTitle).map((path) => (
              <Button
                key={path}
                component={NavLink}
                to={path}
                sx={{
                  px: 3,
                  '&.active': {
                    backgroundColor: theme.palette.primary.dark,
                    color: theme.palette.primary.contrastText
                  }
                }}
              >
                {pathAndTitle[path]}
              </Button>
            ))}
          </ButtonGroup>
          <Button color="inherit" component={Link} to="/login">
            Log Out
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;

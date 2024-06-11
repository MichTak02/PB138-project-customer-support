import Page from '../components/base/Page';
import { Typography, List, Card, CardMedia, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import userIcon from '../assets/user-icon.svg'
import customerIcon from '../assets/customer-icon.svg'
import productIcon from '../assets/product-icon.svg'
import categoryIcon from '../assets/category-icon.svg'
import offerIcon from '../assets/offer-icon.svg'
import {RoleValues} from "../models/user.ts";
import Authorized from "../components/auth/Authorized.tsx";

export function Dashboard() {
  const items = [
    { text: 'User Management', link: '/auth/users', image: userIcon, role: RoleValues.ADMIN },
    { text: 'Customer Management', link: '/auth/customers', image: customerIcon, role: RoleValues.REGULAR },
    { text: 'Product Management', link: '/auth/products', image: productIcon, role: RoleValues.REGULAR },
    { text: 'Category Management', link: '/auth/categories', image: categoryIcon, role: RoleValues.REGULAR },
    { text: 'Offer Management', link: '/auth/offers', image: offerIcon, role: RoleValues.REGULAR },
  ];

  return (
    <Page title="Dashboard">
      <Typography component="h2" variant="h5" gutterBottom>
        Management
      </Typography>
      <List style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
      {items.map((item, index) => (
          <Authorized role={item.role} key={index}>
        <Card component={Link} to={item.link} style={{ textDecoration: "none", width: "20rem" }}>
        <CardMedia
          component="div"
          style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "10rem" , padding: "1rem 0rem 0rem 0rem"}}
        >
          <img src={item.image} alt={item.text} style={{ maxHeight: "100%", maxWidth: "100%" }} />
        </CardMedia>
        <CardContent style={{ textAlign: "center" }}>
          <Typography variant="h6" component="div">
            {item.text}
          </Typography>
        </CardContent>
      </Card>
          </Authorized>
      ))}
    </List>
    </Page>
  );
}

export default Dashboard;

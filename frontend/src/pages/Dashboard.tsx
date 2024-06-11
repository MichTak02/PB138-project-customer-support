import Page from '../components/base/Page';
import { Typography, List, Card, CardMedia, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import userIcon from '../assets/user-icon.svg'
import customerIcon from '../assets/customer-icon.svg'
import productIcon from '../assets/product-icon.svg'
import categoryIcon from '../assets/category-icon.svg'
import offerIcon from '../assets/offer-icon.svg'

export function Dashboard() {
  const items = [
    { text: 'User Management', link: '/auth/users', image: userIcon },
    { text: 'Customer Management', link: '/auth/customers', image: customerIcon },
    { text: 'Product Management', link: '/auth/products', image: productIcon },
    { text: 'Category Management', link: '/auth/categories', image: categoryIcon },
    { text: 'Offer Management', link: '/auth/offers', image: offerIcon },
  ];

  return (
    <Page title="Dashboard">
      <Typography component="h2" variant="h5" gutterBottom>
        Management
      </Typography>
      <List style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
      {items.map((item, index) => (
        <Card key={index} component={Link} to={item.link} style={{ textDecoration: "none", width: "20rem" }}>
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
      ))}
    </List>
    </Page>
  );
}

export default Dashboard;

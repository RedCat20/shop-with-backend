import Layout from "../Layout/Layout";
import React, {useEffect} from "react";
import styles from './Products.module.scss';
import Typography from "@mui/material/Typography";

import {useGetProductsQuery} from '../../redux/api/productsApi';
import {useSelector} from "react-redux";
import {userData} from "../../redux/slices/authSlice";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {useNavigate} from "react-router-dom";

const Products = () => {

    const { data, error, isLoading } = useGetProductsQuery('')

    const user = useSelector(userData);
    const navigator = useNavigate();
    useEffect(() => {  },[user]);

    return (
        <Layout>
            <h1>Products</h1>

            {!data && <div>Loading...</div>}

            {(data?.length === 0) && <div>No products.</div>}

            <Grid container spacing={3}>

            {data && data?.length > 0 && data.map((product: any, idx: number) => {
                return (
                    <Grid item xs={3}>
                    <Card sx={{ maxWidth: 300, padding: '20px', height: '100%'}}>
                        <CardMedia
                            component="img"
                            height="auto"
                            image={product?.imageURL ? `http://localhost:5000${product?.imageURL}` : 'https://us.123rf.com/450wm/koblizeek/koblizeek2207/koblizeek220700042/koblizeek220700042.jpg?ver=6'}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{textAlign: 'center'}}>
                                {idx + 1}. {product.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <div className={styles.listItem}>Price: {product.price} grn</div>
                                <div>Author: {product.user.firstName} {product.user.lastName}</div>
                            </Typography>
                        </CardContent>
                        <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button
                                fullWidth
                                onClick={() => { navigator(`/products/${product._id}`) }} color="success" variant="contained"  size="medium" sx={{textTransform: 'none'}}>
                                Show more
                            </Button>
                        </CardActions>
                    </Card>
                    </Grid>
                )
            })}

            </Grid>
        </Layout>
    )
}

export default Products;
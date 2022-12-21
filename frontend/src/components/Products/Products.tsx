import {MouseEvent} from "react";
import styles from './Products.module.scss';

import {useNavigate} from "react-router-dom";
import {useGetProductsQuery} from '../../redux/api/productsApi';

import Layout from "../Layout/Layout";
import noImage from '../../assets/images/no-image.jpg';
import {Grid, Typography, Card, CardActions, CardContent, CardMedia, Button} from "@mui/material";

const Products = () => {

    const navigator = useNavigate();

    const { data, error, isLoading } = useGetProductsQuery('')

    const onCardClickHandler = (id: string) => {
        navigator(`/products/${id}`)
    }

    return (
        <Layout>
            <h1>Products</h1>

            {!data && <div>Loading...</div>}

            {(data?.length === 0) && <div>No products.</div>}

            <Grid container spacing={3}>

                {data && data?.length > 0 && data.map((product: any, idx: number) => {
                    return (
                        <Grid key={idx} item xs={12} sm={6} md={4} lg={3}>
                            <Card sx={{
                                maxWidth: 300, padding: '20px', height: '100%',
                                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '15px'
                            }}>
                                <div className={styles.image}>
                                    <CardMedia
                                        component="img"
                                        height="300px"
                                        sx={{margin: '0 auto'}}
                                        image={product?.imageURL ? `http://localhost:5000${product?.imageURL}` : noImage}
                                        alt="green iguana"
                                    />
                                </div>

                                <div>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" sx={{textAlign: 'center'}}>
                                            {idx + 1}. {product.name}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary">
                                            <div className={styles.listItem}>Price: {product.price} grn</div>
                                            <div>Author: {product.user.firstName} {product.user.lastName}</div>
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                                        <Button
                                            fullWidth
                                            onClick={(e: MouseEvent<HTMLButtonElement>) => onCardClickHandler(product._id)}
                                            color="success"
                                            variant="contained"
                                            size="medium"
                                            sx={{textTransform: 'none'}}
                                        >
                                            Show more
                                        </Button>
                                    </CardActions>
                                </div>

                            </Card>
                        </Grid>
                    )
                })}

            </Grid>
        </Layout>
    )
}

export default Products;
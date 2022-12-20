// @ts-nocheck

import Layout from "../Layout/Layout";
import React, {useEffect, useState} from "react";
import styles from './Product.module.scss';
import Typography from "@mui/material/Typography";

import {
    useChangeSelectedProductMutation,
    useGetProductByIdQuery,
    useRemoveProductByIdMutation, useUploadProductImageMutation
} from '../../redux/api/productsApi';
import {useSelector} from "react-redux";
import {userData} from "../../redux/slices/authSlice";

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import {useNavigate, useParams} from "react-router-dom";
import ProductForm from "../Forms/ProductForm";
import DialogWindow from "../DialogWindow/DialogWindow";

const Product = () => {
    const navigator = useNavigate();


    const [productId, setProductId] = useState('');
    const [open, setOpen] = useState(false);
    const [uploadImage, uploadImageResponse] = useUploadProductImageMutation();
    const [changeSelectedProduct, changeSelectedProductResponse] = useChangeSelectedProductMutation();

    const params = useParams();

    const { data: product, error, isLoading } = useGetProductByIdQuery(productId);
    const [deleteProduct, response] = useRemoveProductByIdMutation();

    const user = useSelector(userData);

    useEffect(() => {
        if (params?.id?.length) {
            setProductId(params.id);
        }
    },[user,product, params]);

    const onRemoveProductHandler = async (id: number) => {
        try {
            await deleteProduct(id);
            navigator('/products');
        } catch (err) {
            console.log('Can not remove product', err);
        }
    }

    const onSubmit = (id: string, newProduct: any) => {
        if (!newProduct) return;
        // console.log(newProduct)

        try {
            changeSelectedProduct({id: id, product: newProduct});
        } catch (err) {
            console.log('Can not change product', err);
        } finally {
            setOpen(false);
            //navigator('/products');
        }

    }

    return (
        <Layout>
            <h1>Product {product && product.name}</h1>
            {!product && <div>Loading...</div>}
            {product &&
                  <Box sx={{ display: 'flex', gap: '60px', alignItems: 'center'}}>
                    <Card sx={{ maxWidth: 300, padding: '20px', marginRight: '30px'}}>
                        <CardMedia
                            component="img"
                            height="auto"
                            image={product?.imageURL ? `http://localhost:5000${product?.imageURL}` : 'https://us.123rf.com/450wm/koblizeek/koblizeek2207/koblizeek220700042/koblizeek220700042.jpg?ver=6'}
                            alt="green iguana"
                        />
                    </Card>
                    <CardContent>

                      <Typography gutterBottom variant="h5" component="div" sx={{marginBottom: '30px'}}>
                          {product?.name}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        <div className={styles.listItem}>Price: {product?.price} grn</div>
                        <div>Author: {product?.user?.firstName} {product?.user?.lastName}</div>
                      </Typography>

                        <Button sx={{textTransform: 'none', marginTop: '30px' }}
                                disabled={Boolean(!product.isAvailable)}
                                color="success" fullWidth variant="contained" size="large">
                          Add to basket
                        </Button>

                        {user?._id === product?.user?._id && (
                            <>
                                <br/><br/>
                                    <Typography variant="subtitle1">You are an author, there are successful actions</Typography>
                                <CardActions sx={{display: 'flex', marginTop: '15px', justifyContent: 'space-between'}}>

                                    <Button color="success"
                                            fullWidth variant="outlined"
                                            onClick={() => setOpen(true)}
                                    >
                                        Edit
                                    </Button>
                                    <Button color="success"
                                            fullWidth
                                            variant="outlined"
                                            onClick={() => { onRemoveProductHandler(product?._id)} }>
                                        Remove
                                    </Button>
                                </CardActions>
                            </>
                            )
                        }
                    </CardContent>
                  </Box>
            }

            {open && <DialogWindow isOpen={open} callback={() => setOpen(prev => !prev)}>
              <ProductForm actionStr="Edit product" onSubmit={onSubmit.bind(this)} product={product}/>
            </DialogWindow>}

        </Layout>
    )
}

export default Product;
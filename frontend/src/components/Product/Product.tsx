import Layout from "../Layout/Layout";
import React, {FC, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ProductEditForm from "../Forms/ProductEditForm";
import DialogWindow from "../DialogWindow/DialogWindow";

import styles from './Product.module.scss';
import Typography from "@mui/material/Typography";

import {
    useChangeSelectedProductMutation,
    useGetProductByIdQuery,
    useRemoveProductByIdMutation
} from '../../redux/api/productsApi';

import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks";
import {userData} from "../../redux/slices/authSlice";

import {Card,Box,CardActions,CardContent,CardMedia,Button} from '@mui/material';
import {noProductImgUrl} from "../../data/no.image.data";
import {IProduct} from "../../interfaces/product.interface";
import {basePath} from "../../data/paths";

const Product:FC = () => {
    const navigator = useNavigate();

    const [productId, setProductId] = useState('');
    const [open, setOpen] = useState(false);
    const [changeSelectedProduct, changeSelectedProductResponse] = useChangeSelectedProductMutation();

    const params = useParams();

    const { data: product, error, isLoading } = useGetProductByIdQuery(productId);
    const [deleteProduct, response] = useRemoveProductByIdMutation();

    const user = useAppSelector(userData);

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

    const onSubmit = (id: string, newProduct: IProduct) => {
        if (!newProduct) return;
        // console.log(newProduct)
        try {
            changeSelectedProduct({id: id, product: newProduct});
        } catch (err) {
            console.log('Can not change product', err);
        } finally {
            setOpen(false);
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
                            image={product?.imageURL ? `${basePath}${product?.imageURL}` : noProductImgUrl
                        }
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

                            <div style={{marginTop: '30px'}}>

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
                            </div>
                            )
                        }
                    </CardContent>
                </Box>
            }

            {open && <DialogWindow isOpen={open} callback={() => setOpen(prev => !prev)}>
              <ProductEditForm actionStr="Edit product" onSubmit={onSubmit.bind(this)} product={product}/>
            </DialogWindow>}

        </Layout>
    )
}

export default Product;
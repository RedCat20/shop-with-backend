import React, {ChangeEvent, FC, useState} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

import Layout from "../Layout/Layout";
import styles from './AddProduct.module.scss';

import {isAuthUser} from "../../redux/slices/authSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks";
import { useAddNewProductMutation, useUploadProductImageMutation } from "../../redux/api/productsApi";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

import {InputLabel,Input,FormHelperText,Button,Paper,Box,Typography } from '@mui/material';
import {Radio,RadioGroup,FormControlLabel,FormControl,FormLabel} from '@mui/material';

interface IUploadImageRes {
    data?: any;
    error?: FetchBaseQueryError | SerializedError;
}

const AddProduct:FC = () => {
    const navigator = useNavigate();
    const isAuth = useAppSelector(isAuthUser);

    const [addProductError, setAddProductError] = useState('');
    const [isAvailableProduct, setIsAvailableProduct] = useState(true);

    const [uploadImage, uploadImageResponse] = useUploadProductImageMutation();
    const [addNewProduct, addNewProductResponse] = useAddNewProductMutation();

    const { register, handleSubmit, setError, formState: {errors, isValid} } = useForm({
        defaultValues: {
            name: '',
            price: null,
            isAvailable: false,
            imageURL: null
        },
        mode: 'onSubmit'
    });

    const onSubmit = async (values: any) => {
        // console.log(values);

        try {
            const formData = new FormData();
            if (values.imageURL) {
                const imageFile = values.imageURL[0];
                formData.append('image', imageFile);
            }
            const res: IUploadImageRes = await uploadImage(formData);

            let imgUrl = null;
            if (res && res.data && res.data.url) {
                imgUrl = res.data.url;
            }

            console.log('sended prod: ', {...values, imageURL: imgUrl, isAvailable: isAvailableProduct})

            await addNewProduct({...values, imageURL: imgUrl, isAvailable: isAvailableProduct});

        } catch (err) {
            setAddProductError('Can not add product')
            console.log('Can not add product', err);
        } finally {
            navigator(`/products`);
        }
    }

    if (!(localStorage.getItem('token')) && !isAuth) {
        return <Navigate to="/"/>
    }

    return (
        <Layout>
            <h1>Add new product</h1>

            <Box maxWidth={'sm'} sx={{m: '60px 0', margin: '0 auto'}}>
                <Paper sx={{p: '60px', minHeight: '400px'}}>

                    <Typography variant="h4" sx={{marginBottom: '45px'}}>Product info</Typography>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl required fullWidth sx={{marginBottom: '45px'}}>
                            <InputLabel htmlFor="my-input">Product name</InputLabel>
                            <Input type="text"
                                error={Boolean(errors.name?.message)}
                                id="name-input" aria-describedby="my-helper-text"
                                {...register('name', {required: 'Please, enter product name'})}
                            />
                            <FormHelperText id="name-helper-text">
                                {errors.name?.message ? errors.name?.message : "We'll never share your email"}
                            </FormHelperText>
                        </FormControl>

                        <FormControl required fullWidth sx={{marginBottom: '45px'}}>
                            <InputLabel htmlFor="my-input">Product price</InputLabel>
                            <Input type="number"
                                error={Boolean(errors.price?.message)}
                                id="price-input" aria-describedby="my-helper-text"
                                {...register('price', {required: 'Please, enter product price'})}
                            />
                            <FormHelperText id="my-helper-text">
                                {errors.price?.message ? errors.price?.message : "We'll never share your password"}
                            </FormHelperText>
                        </FormControl>

                        <FormControl required fullWidth sx={{marginBottom: '45px'}}>
                            <FormLabel id="demo-radio-buttons-group-label">Is available</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="available-radio-buttons-group-label"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setIsAvailableProduct(e.target.value === 'true')}
                                defaultValue="true"
                            >
                                <FormControlLabel name="isAvailable"
                                                  onChange={(e) => { console.log(e)} }
                                                  value="true"
                                                  control={<Radio />}
                                                  label="True"
                                />
                                <FormControlLabel name="isAvailable"
                                                  onChange={(e) => { console.log(e)} }
                                                  value="false"
                                                  control={<Radio />}
                                                  label="False"
                                />
                            </RadioGroup>
                        </FormControl>

                        <FormControl fullWidth sx={{marginBottom: '45px'}}>
                            <Input type="file"
                                   error={Boolean(errors.imageURL?.message)}
                                   id="image-input" aria-describedby="image-helper-text"
                                   {...register('imageURL', {required: 'Please, choose a file of product photo'})}
                            />
                            <FormHelperText id="image-helper-text">
                                {errors?.imageURL?.message ? errors?.imageURL?.message : "Please, choose a file"}
                            </FormHelperText>
                        </FormControl>

                        <Button fullWidth type="submit" variant="contained">Add product</Button>

                        {addProductError && <div className={styles.sendError} style={{marginTop: '30px'}}>{addProductError}</div>}
                    </form>
                </Paper>
            </Box>
        </Layout>
    )
}

export default AddProduct;
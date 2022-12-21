import React, {ChangeEvent, FC, useState} from 'react';
import {useForm} from "react-hook-form";

import {Box, Button, FormHelperText, Input, InputLabel, Paper} from "@mui/material";
import {Typography,FormControl,FormLabel} from "@mui/material";
import {RadioGroup,FormControlLabel,Radio} from "@mui/material";

import {useUploadProductImageMutation} from "../../redux/api/productsApi";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";
import {IProduct} from "../../interfaces/product.interface";

interface IUploadImageRes {
    data?: any;
    error?: FetchBaseQueryError | SerializedError;
}

interface Props {
    product?: IProduct;
    actionStr?: string;
    onSubmit: any;
}

const ProductEditForm:FC<Props> = ({ product, actionStr, onSubmit }) => {

    //console.log('product of product form: ', product);

    const [uploadImage, uploadImageResponse] = useUploadProductImageMutation();
    const [addProductError, setAddProductError] = useState('');
    const [isAvailableProduct, setIsAvailableProduct] = useState(true);

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isValid}
    } = useForm({
        defaultValues: {
            name: product?.name || '',
            price: product?.price || null,
            isAvailable: product?.isAvailable,
            imageURL: product?.imageURL || null
        },
        mode: 'onSubmit'
    });

    const saveProductDataHandler = async (values: any) => {
        if (!product) return;

        // console.log(values)
        try {
            const formData = new FormData();
            if (values.imageURL) {
                const imageFile = values.imageURL[0];
                formData.append('image', imageFile);
            }
            const res: IUploadImageRes = await uploadImage(formData);

            let newProduct: IProduct;

            if (res?.data?.url) {
                newProduct = {...values, imageURL: res.data.url, isAvailable: isAvailableProduct};
            } else if (product) {
                newProduct = {...values, imageURL: product.imageURL, isAvailable: isAvailableProduct};
            } else {
                newProduct = {...values, imageURL: null, isAvailable: isAvailableProduct};
            }
            // console.log(product._id,newProduct)
            onSubmit( product._id, newProduct);
        }  catch (err) {
            console.log('Can not create product data', err);
        }
    }

    return (
        <Box maxWidth={'sm'} sx={{margin: '0 auto'}}>
            <Paper sx={{p: '30px', minHeight: '400px'}}>

                <Typography variant="h4" sx={{marginBottom: '45px'}}>Product info</Typography>

                <form onSubmit={handleSubmit(saveProductDataHandler)}>
                    <FormControl required fullWidth sx={{marginBottom: '45px'}}>
                        <InputLabel htmlFor="my-input">Product name</InputLabel>
                        <Input type="text"
                               error={Boolean(errors?.name?.message)}
                               id="name-input" aria-describedby="my-helper-text"
                               {...register('name', {required: 'Please, enter product name'})}
                        />
                        <FormHelperText id="name-helper-text">
                            <>{errors?.name?.message ? errors.name.message : "Please, enter product name (min 3 symbols)"}</>
                        </FormHelperText>
                    </FormControl>

                    <FormControl required fullWidth sx={{marginBottom: '45px'}}>
                        <InputLabel htmlFor="my-input">Product price</InputLabel>
                        <Input type="number"
                               error={Boolean(errors?.price?.message)}
                               id="price-input" aria-describedby="my-helper-text"
                               {...register('price', {required: 'Please, enter product price'})}
                        />
                        <FormHelperText id="my-helper-text">
                            <>{errors?.price?.message ? errors.price.message : "Please, enter product price (numbers)"}</>
                        </FormHelperText>
                    </FormControl>

                    <FormControl required fullWidth sx={{marginBottom: '45px'}}>
                        <FormLabel id="demo-radio-buttons-group-label">Is available</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="available-radio-buttons-group-label"
                            onChange={
                                (e: ChangeEvent<HTMLInputElement>) => {
                                    // console.log(e.target.value);
                                    setIsAvailableProduct(e.target.value === 'true')
                                }
                            }
                            defaultValue={product?.isAvailable === true}
                        >
                            <FormControlLabel name="isAvailable"
                                              onChange={(e) => {console.log(e)}}
                                              value="true"
                                              control={<Radio />}
                                              label="True" />
                            <FormControlLabel name="isAvailable"
                                              onChange={(e) => {console.log(e)}}
                                              value="false"
                                              control={<Radio />}
                                              label="False" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl fullWidth sx={{marginBottom: '45px'}}>
                        <Input type="file"
                               error={Boolean(errors?.imageURL?.message)}
                               id="image-input" aria-describedby="image-helper-text"
                               {...register('imageURL', {required: 'Please, download image file'})}
                        />
                        <FormHelperText id="image-helper-text">
                            <>{errors?.imageURL?.message ? errors.imageURL.message : "Please, download image file as png, jpg..."}</>
                        </FormHelperText>
                        <span style={{overflowWrap: 'break-word'}}>
                            <br/>
                            Last loaded img file: {product?.imageURL || 'none'}
                            <br/><br/>
                            You can change it if it is necessary
                        </span>
                    </FormControl>

                    <Button fullWidth type="submit" variant="contained">{actionStr || 'OK'}</Button>

                    {addProductError && <div style={{marginTop: '30px'}}>{addProductError}</div>}
                </form>
            </Paper>
        </Box>
    );
};

export default ProductEditForm;
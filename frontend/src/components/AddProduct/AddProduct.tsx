import React, {FC, useState} from 'react';
import Layout from "../Layout/Layout";
import { InputLabel,Input,FormHelperText } from '@mui/material';
import {useForm} from "react-hook-form";
import {Button,Paper,Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import {isAuthUser} from "../../redux/slices/authSlice";
import {useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import {
    useAddNewProductMutation,
    useUploadProductImageMutation
} from "../../redux/api/productsApi";


const AddProduct:FC = () => {

    const isAuth = useSelector(isAuthUser);
    const navigator = useNavigate();
    const [addProductError, setAddProductError] = useState('');

    const [uploadImage, uploadImageResponse] = useUploadProductImageMutation();
    const [addNewProduct, addNewProductResponse] = useAddNewProductMutation();

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isValid}
    } = useForm({
        defaultValues: {
            name: '',
            price: null,
            isAvailable: true,
            imageURL: ''
        },
        mode: 'onSubmit'
    });

    const onSubmit = async (values: any) => {
        try {
            const formData = new FormData();
            const imageFile = values.imageURL[0];

            formData.append('image', imageFile);

            const res = await uploadImage(formData);
            // @ts-ignore
            console.log('res', res)
            // @ts-ignore
            addNewProduct({...values, imageURL: res.data.url});

        } catch (err) {
            setAddProductError('Can not add product')
            console.log('Can not add product', err);
        } finally {
            navigator('/products');
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
                                name="isAvailable"
                            >
                                <FormControlLabel value="true" control={<Radio />} label="True" />
                                {/*<FormControlLabel value="false" control={<Radio />} label="False" />*/}
                            </RadioGroup>
                        </FormControl>

                        <FormControl fullWidth sx={{marginBottom: '45px'}}>
                            <Input type="file"
                                   error={Boolean(errors.imageURL?.message)}
                                   id="image-input" aria-describedby="image-helper-text"
                                   {...register('imageURL', {required: 'Please, enter product price'})}
                            />
                            <FormHelperText id="image-helper-text">
                                {errors.imageURL?.message ? errors.imageURL?.message : "We'll never share your password"}
                            </FormHelperText>
                        </FormControl>

                        <Button fullWidth type="submit" variant="contained">Add product</Button>

                        {addProductError && <div style={{marginTop: '30px'}}>{addProductError}</div>}
                    </form>
                </Paper>
            </Box>
        </Layout>
    )
}

export default AddProduct;
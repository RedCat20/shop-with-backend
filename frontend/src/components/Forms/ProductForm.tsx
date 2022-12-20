import React, {FC, useState} from 'react';
import {Box, Button, FormHelperText, Input, InputLabel, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {useForm} from "react-hook-form";

interface Props {
    product?: any;
    actionStr?: string;
    onSubmit: (values: any) => void;
}

const ProductForm:FC<Props> = ({ product, actionStr, onSubmit }) => {

    console.log('product: ', product);

    const [addProductError, setAddProductError] = useState('');

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isValid}
    } = useForm({
        defaultValues: {
            name: product?.name || '',
            price: product?.price || null,
            isAvailable: product?.isAvailable || true,
            imageURL: product?.imageURL || ''
        },
        mode: 'onSubmit'
    });

    return (
        <Box maxWidth={'sm'} sx={{margin: '0 auto'}}>
            <Paper sx={{p: '30px', minHeight: '400px'}}>

                <Typography variant="h4" sx={{marginBottom: '45px'}}>Product info</Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
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
                            name="isAvailable"
                            defaultValue={product?.isAvailable || true}
                        >
                            <FormControlLabel value="true" control={<Radio />} label="True" />
                            {/*<FormControlLabel value="false" control={<Radio />} label="False" />*/}
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

                    <Button fullWidth type="submit" variant="contained" onClick={onSubmit}>{actionStr || 'OK'}</Button>

                    {addProductError && <div style={{marginTop: '30px'}}>{addProductError}</div>}
                </form>
            </Paper>
        </Box>
    );
};

export default ProductForm;
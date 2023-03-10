import React, {FC, useState} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks";
import {fetchUserData, isAuthUser} from "../../redux/slices/authSlice";

import styles from "./Auth.module.scss";
import Layout from "../Layout/Layout";

import { FormControl,InputLabel,Input,FormHelperText,Button,Paper,Box,Typography } from '@mui/material';

interface Props { }

const Auth:FC<Props> = () => {

    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(isAuthUser);
    const navigator = useNavigate();
    const [authError, setAuthError] = useState('');

    const { register, handleSubmit, setError, formState: {errors, isValid} } = useForm({
        defaultValues: {
            email: 'd@gmail.com',
            password: '123456'
        },
        mode: 'onSubmit'
    });

    const onSubmit = async (values: any) => {
        //console.log('values: ', values);

        // @ts-ignore
        const data = await dispatch(fetchUserData(values));
        if (!data?.payload) {
            setAuthError('Can not auth this user now');
        }

        if ('token' in data?.payload) {
            localStorage.setItem('token', data.payload.token);
            navigator('/');
        } else {
            setAuthError('Can not auth this user now');
        }
    }

    // console.log(isAuth);

    if ((localStorage.getItem('token')) && isAuth) {
        return <Navigate to="/"/>
    }

    return (
       <Layout>
           <h1>Auth page</h1>

           <Box maxWidth={'sm'} sx={{m: '60px 0', margin: '0 auto'}}>
               <Paper sx={{p: '60px', minHeight: '400px'}}>

                   <Typography variant="h4" sx={{marginBottom: '45px', textAlign: 'center'}}>
                       Log in
                   </Typography>

                   <form onSubmit={handleSubmit(onSubmit)}>
                       <FormControl fullWidth sx={{marginBottom: '45px'}}>
                           <InputLabel htmlFor="my-input">Email address</InputLabel>
                           <Input
                               error={Boolean(errors.email?.message)}
                               id="my-input" aria-describedby="my-helper-text"
                               {...register('email', {required: 'Please, enter your email'})}
                           />
                           <FormHelperText id="my-helper-text">
                               {errors.email?.message ? errors.email?.message : "We'll never share your email"}
                           </FormHelperText>
                       </FormControl>

                       <FormControl fullWidth sx={{marginBottom: '45px'}}>
                           <InputLabel htmlFor="my-input">Password</InputLabel>
                           <Input
                               error={Boolean(errors.password?.message)}
                               id="my-input" aria-describedby="my-helper-text"
                               {...register('password', {required: 'Please, enter your password'})}
                           />
                           <FormHelperText id="my-helper-text">
                               {errors.password?.message ? errors.password?.message : "We'll never share your password"}
                           </FormHelperText>
                       </FormControl>

                       <Button fullWidth type="submit" variant="contained">Log in</Button>

                       {authError && <div style={{marginTop: '30px'}}>{authError}</div>}
                   </form>
               </Paper>
           </Box>
       </Layout>
    );
};

export default Auth;
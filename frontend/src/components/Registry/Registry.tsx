import React, {FC, useState} from 'react';
import Layout from "../Layout/Layout";
import { FormControl,InputLabel,Input,FormHelperText } from '@mui/material';
import {useForm} from "react-hook-form";
import {Button,Paper,Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import {fetchUserRegistry, isAuthUser} from "../../redux/slices/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

interface Props { }

const Registry:FC<Props> = () => {

    const dispatch = useDispatch();
    const isAuth = useSelector(isAuthUser);
    const navigator = useNavigate();
    const [authError, setAuthError] = useState('');

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isValid}
    } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            age: '',
            address: '',
            avatarURL: '',
        },
        mode: 'onSubmit'
    });

    const onSubmit = async (values: any) => {
        // @ts-ignore
        const data = await dispatch(fetchUserRegistry(values));
        if (!data?.payload) {
            setAuthError('Can not registry this user now');
        }

        if ('token' in data?.payload) {
            localStorage.setItem('token', data.payload.token);
            navigator('/');
        } else {
            setAuthError('Can not auth this user now');
        }
        console.log('values: ', values);
    }

    console.log(isAuth);

    return (
        <Layout>
            <h1>Registry page</h1>

            <Box maxWidth={'sm'} sx={{m: '60px 0', margin: '0 auto'}}>
                <Paper sx={{p: '60px', minHeight: '400px'}}>

                    <Typography variant="h4" sx={{marginBottom: '45px', textAlign: 'center'}}>Registration</Typography>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <FormControl required fullWidth sx={{marginBottom: '45px'}}>
                            <InputLabel htmlFor="first-name-input">First name</InputLabel>
                            <Input
                                error={Boolean(errors.firstName?.message)}
                                id="first-name-input" aria-describedby="my-helper-text"
                                {...register('firstName', {required: 'Please, enter correct first name'})}
                            />
                            <FormHelperText id="first-name-helper-text">
                                {errors.firstName?.message ? errors.firstName?.message : "Please, enter correct first name (min 3 symbols)"}
                            </FormHelperText>
                        </FormControl>

                        <FormControl required fullWidth sx={{marginBottom: '45px'}}>
                            <InputLabel htmlFor="last-name-input">Last name</InputLabel>
                            <Input
                                error={Boolean(errors.lastName?.message)}
                                id="last-name-input" aria-describedby="my-helper-text"
                                {...register('lastName', {required: "Please, enter correct last name"})}
                            />
                            <FormHelperText id="last-name-helper-text">
                                {errors.lastName?.message ? errors.lastName?.message : "Please, enter correct last name (min 3 symbols)"}
                            </FormHelperText>
                        </FormControl>

                        <FormControl required fullWidth sx={{marginBottom: '45px'}}>
                            <InputLabel htmlFor="email-input">Email address</InputLabel>
                            <Input type="email"
                                error={Boolean(errors.email?.message)}
                                id="email-input" aria-describedby="my-helper-text"
                                {...register('email', {required: 'Please, enter correct email address'})}
                            />
                            <FormHelperText id="email-helper-text">
                                {errors.email?.message ? errors.email?.message : "Please, enter your email in format \"email@email.com\""}
                            </FormHelperText>
                        </FormControl>

                        <FormControl required fullWidth sx={{marginBottom: '45px'}}>
                            <InputLabel htmlFor="password-input">Password</InputLabel>
                            <Input type="password"
                                error={Boolean(errors.password?.message)}
                                id="password-input" aria-describedby="my-helper-text"
                                {...register('password', {required: 'Please, enter your password'})}
                            />
                            <FormHelperText id="password-helper-text">
                                {errors.password?.message ? errors.password?.message : "We'll never share your password"}
                            </FormHelperText>
                        </FormControl>

                        <FormControl fullWidth sx={{marginBottom: '45px'}}>
                            <InputLabel htmlFor="age-input">Age</InputLabel>
                            <Input type="number"
                                error={Boolean(errors.age?.message)}
                                id="age-input" aria-describedby="my-helper-text"
                                {...register('age', {required: 'Please, enter your age'})}
                            />
                            <FormHelperText id="age-helper-text">
                                {errors.age?.message ? errors.age?.message : "Please, enter your age as number"}
                            </FormHelperText>
                        </FormControl>


                        <FormControl fullWidth sx={{marginBottom: '45px'}}>
                            <InputLabel htmlFor="address-input">Address</InputLabel>
                            <Input
                                error={Boolean(errors.address?.message)}
                                id="address-input" aria-describedby="my-helper-text"
                                {...register('address', {required: 'Please, enter your address'})}
                            />
                            <FormHelperText id="address-helper-text">
                                {errors.address?.message ? errors.address?.message : "Please, enter your home address"}
                            </FormHelperText>
                        </FormControl>


                        <FormControl fullWidth sx={{marginBottom: '45px'}}>
                            <InputLabel htmlFor="avatar-url-input">Avatar URL</InputLabel>
                            <Input type="url"
                                error={Boolean(errors.avatarURL?.message)}
                                id="avatar-url-input" aria-describedby="my-helper-text"
                                {...register('avatarURL' )}
                            />
                            <FormHelperText id="avatar-helper-text">
                                {errors.avatarURL?.message ? errors.avatarURL?.message : "Please, enter your URL in URL format (such as https://site.com/img.png)"}
                            </FormHelperText>
                        </FormControl>

                        <Button fullWidth type="submit" variant="contained">Sign up</Button>

                        {authError && <div style={{marginTop: '30px'}}>{authError}</div>}
                    </form>
                </Paper>
            </Box>
        </Layout>
    );
};

export default Registry;
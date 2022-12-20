import Layout from "../Layout/Layout";
import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {userData} from "../../redux/slices/authSlice";
import styles from './Home.module.scss';
import { IconButton } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Home = () => {

    const user = useSelector(userData);

    useEffect(() => {  },[user]);

    return (
        <Layout>
            <h1>Home page</h1>
            <div className={styles.centered}>
                <h1 className={styles.welcome}>Shop application</h1>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"

                >
                    <ShoppingCartIcon sx={{fontSize: '52px'}}/>
                </IconButton>
                <h2 className={styles.welcome}>
                    Hello, <span className={styles.bold}>{user?.firstName ? user?.firstName : 'dear visitor'}</span>!
                </h2>
            </div>
        </Layout>
    )
}

export default Home;
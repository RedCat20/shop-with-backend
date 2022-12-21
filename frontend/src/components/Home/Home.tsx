import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks";
import {userData} from "../../redux/slices/authSlice";

import Layout from "../Layout/Layout";
import styles from './Home.module.scss';

import { IconButton } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Home = () => {

    const user = useAppSelector(userData);
    const navigator = useNavigate();

    useEffect(() => {  },[user]);

    return (
        <Layout>
            <h1>Home page</h1>
            <div className={styles.centered}>
                <h1 className={styles.welcome}>
                    Shop application
                </h1>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={() => navigator('/products')}
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
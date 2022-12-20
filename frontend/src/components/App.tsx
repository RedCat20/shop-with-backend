import React, {FC, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import styles from './App.module.scss';
import Auth from "./Auth/Auth";
import Registry from "./Registry/Registry";
import Profile from "./Profile/Profile";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserProfileData, isAuthUser} from "../redux/slices/authSlice";
import Home from "./Home/Home";
import Products from "./Products/Products";
import Product from "./Product/Product";
import AddProduct from "./AddProduct/AddProduct";

const App:FC = () => {

    const dispatch = useDispatch();
    const isAuth = useSelector(isAuthUser)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            // @ts-ignore
            dispatch(fetchUserProfileData())
        }

    },[localStorage, dispatch])

  return (
      <div className={styles.container}>
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/registry" element={<Registry/>}/>
                <Route path="/profile" element={<Profile isUser={isAuth}/>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/products/:id" element={<Product/>}/>
                <Route path="/add-product" element={<AddProduct/>}/>
            </Routes>
        </Router>
      </div>
  );
};

export default App;
import React, {FC, useEffect, useState} from 'react';
import Layout from "../Layout/Layout";
import styles from "./Profile.module.scss";

import {useDispatch, useSelector} from 'react-redux';
import {fetchUserProfileData, isAuthUser} from "../../redux/slices/authSlice";
import Avatar from "@mui/material/Avatar";

interface Props {
    isUser: boolean;
}

const Profile:FC<Props> = ({isUser}) => {
    const isAuth = useSelector(isAuthUser);

    const [user, setUser] = useState({
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        age: 0,
        address: '',
        avatarURL: ''
    });

    const dispatch = useDispatch();

    const getUserData = async () => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (token) {
            // @ts-ignore
            const data = await dispatch(fetchUserProfileData());
            // @ts-ignore
            if (data?.payload)
                setUser(data.payload)
        }
    }

    useEffect(() => {
        getUserData();
    },[])

    return (
       <Layout>
           {user && isUser &&
                <>
                    <h1>User profile</h1>

                    <div className={styles.info}>
                       <div>
                           <span>First name: </span>
                           <span>{user.firstName}</span>
                       </div>
                       <div>
                         <span>Last name: </span>
                         <span>{user.lastName}</span>
                       </div>
                       <div>
                         <span>Email: </span>
                         <span>{user.email}</span>
                       </div>
                       <div>
                         <span>Age: </span>
                         <span>{user.age}</span>
                       </div>
                       <div>
                         <span>Address: </span>
                         <span>{user.address}</span>
                       </div>
                     <div>
                       <span>Avatar: </span>
                       <Avatar sx={{ marginTop: '20px',width: '156px', height: '156px' }}
                               alt="Avatar" src={user.avatarURL ? user.avatarURL : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png'}
                       />
                     </div>
                    </div>
                </>
           }
       </Layout>
    );
};

export default Profile;
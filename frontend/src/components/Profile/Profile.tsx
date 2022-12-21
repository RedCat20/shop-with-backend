import {FC, useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks/storeHooks";
import {fetchUserProfileData, isAuthUser} from "../../redux/slices/authSlice";
import {PayloadAction} from "@reduxjs/toolkit";

import Layout from "../Layout/Layout";
import styles from "./Profile.module.scss";

import Avatar from "@mui/material/Avatar";
import {IUser} from "../../interfaces/user.interface";
import {noUserImgUrl} from "../../data/no.image.data";

interface Props {
    isUser: boolean;
}

const Profile:FC<Props> = ({isUser}) => {
    const isAuth = useAppSelector(isAuthUser);

    const [user, setUser] = useState<IUser>({
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        age: 0,
        address: '',
        avatarURL: ''
    });

    const dispatch = useAppDispatch();

    const getUserData = async () => {
        const token = localStorage.getItem('token');
        // console.log(token)
        if (token) {
            const data: PayloadAction<any> = await dispatch(fetchUserProfileData());
            if (data?.payload)
                setUser(data.payload)
        }
    }

    useEffect(() => {
        getUserData();
    },[])

    if (!(localStorage.getItem('token')) && !isAuth) {
        return <Navigate to="/"/>
    }

    return (
       <Layout>
           {user && isUser &&
                <>
                    <h1>User profile</h1>

                    <div className={styles.profile}>

                        <div>
                            <Avatar sx={{ marginTop: '20px',width: '156px', height: '156px' }}
                                    alt="Avatar" src={user.avatarURL ? user.avatarURL : noUserImgUrl
                            }
                            />
                        </div>

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

                        </div>
                    </div>
                </>
           }
       </Layout>
    );
};

export default Profile;
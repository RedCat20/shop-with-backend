import React, {FC, ReactNode} from 'react';
import styles from './Layout.module.scss';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Container from "@mui/material/Container";

interface Props {
    children?: ReactNode;
}

const Layout:FC<Props> = ({children}) => {
    return (
        <div className={styles.container}>
            <Header/>
            <Container maxWidth={'xl'} className={styles.main}>
                {children}
            </Container>
            <Footer/>
        </div>
    );
};

export default Layout;
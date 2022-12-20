import React, {FC} from 'react';
import styles from './Footer.module.scss';

const Footer:FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.lists}>
                    <ul>
                        <li>Link 1</li>
                        <li>Link 2</li>
                        <li>Link 3</li>
                    </ul>
                    <ul>
                        <li>Link 1</li>
                        <li>Link 2</li>
                        <li>Link 3</li>
                    </ul>
                    <ul>
                        <li>Link 1</li>
                        <li>Link 2</li>
                        <li>Link 3</li>
                    </ul>
                    <ul>
                        <li>Link 1</li>
                        <li>Link 2</li>
                        <li>Link 3</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Footer;
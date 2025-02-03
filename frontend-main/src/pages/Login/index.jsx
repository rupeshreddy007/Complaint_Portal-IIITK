import React from 'react';
import styles from './styles.module.css';
import googleIcon from '../../assets/google.png';
import { apiRoutes } from '@/constants';
import illutiration from '/public/assests/com.svg';

const Login = () => {
    const handleGoogleSignIn = () => {
        window.open(`${apiRoutes.login}`, '_self');
    };


    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <div className={styles.logoContainer}>
                    <img src={'assests/IIIT-Kottayam.png'} alt="Logo" className={styles.logo} />
                </div>
                <h1>Welcome Back</h1>
                <p>Sign in to continue</p>
                <div className={styles.googleButton}>
                    <a href="#" className={styles.googleSignin} onClick={handleGoogleSignIn}>
            <span className={styles.icon}>
              <img src={googleIcon} alt="Google" className={styles.googleImage} />
            </span>
                        <span className={styles.text}>Sign in with Google</span>
                    </a>
                </div>
            </div>
            <div className={styles.illustrationContainer}>
                <img src={illutiration} alt="Illustration" className={styles.illustration} />
            </div>
        </div>
    );
};

export default Login;
/*import React from 'react';
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
*/
import React from 'react';

const App = () => {
    const apiRoutes = {
        login: 'https://example.com/auth/google',
    };

    const handleGoogleSignIn = () => {
        if (apiRoutes.login) {
            console.log(`Redirecting to: ${apiRoutes.login}`);
            // window.open(apiRoutes.login, '_self');
        } else {
            console.error("Login API route is not defined.");
        }
    };

    const assets = {
        logo: 'https://placehold.co/200x80/FFFFFF/000000?text=IIIT+Kottayam',
        googleIcon: 'https://placehold.co/40x40/FFFFFF/000000?text=G',
        illustration: 'https://placehold.co/600x400/E2E8F0/4A5568?text=Illustration',
    };

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans">
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 sm:p-12 bg-white">
                <div className="w-full max-w-md">
                    <div className="mb-8 text-center">
                        <img src={assets.logo} alt="IIIT Kottayam Logo" className="h-16 mx-auto mb-4" />
                        <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
                        <p className="text-gray-500 mt-2">Sign in to continue to your account.</p>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                    >
                        <img src={assets.googleIcon} alt="" className="h-6 w-6 mr-3 rounded-full" />
                        Sign in with Google
                    </button>
                </div>
                 <div className="mt-8 text-center text-sm text-gray-400">
                    <p>&copy; 2024 IIIT Kottayam. All rights reserved.</p>
                </div>
            </div>

            <div className="hidden lg:flex w-1/2 items-center justify-center bg-indigo-50 p-8">
                <img
                    src={assets.illustration}
                    alt="A person working at a computer with charts and graphs."
                    className="max-w-lg w-full h-auto rounded-lg"
                />
            </div>
        </div>
    );
};

export default App;

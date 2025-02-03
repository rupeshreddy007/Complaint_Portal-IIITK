import {useEffect} from 'react';
import styles from './styles.module.css';
import Contact from "@components/Contact/contact.jsx";
import About from "@components/About/about.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useUser} from "@/contexts/UserContextProvider.jsx";
import {pages, UserTypes} from "@/constants.js";
import ActualHome from './Main/main';

const Home = () => {
    const url = window.location.href;

    useEffect(() => {
        const section = url.split('#')[1];
        const element = document.getElementById(section ? section : 'home');
        element.scrollIntoView({behavior: "smooth"});
    }, [url]);
    return (
        <div className='content'>
            <ActualHome />
            <About />
        </div>
    );
};

export default Home;
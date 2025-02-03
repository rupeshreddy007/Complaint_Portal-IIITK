import {useUser} from "@/contexts/UserContextProvider.jsx";
import {useNavigate} from "react-router-dom";
import styles from '../styles/complaintButton.module.css';
import pen from "@/assets/pen.svg";
import {pages, UserTypes} from "@/constants.js";


const ComplaintButton = () => {
    const {user} = useUser();
    // let display = user ? "flex" : "none";
    let display = "flex";
    const url = window.location.href;
    if( url.includes('/complaint-register')) display = "none";
    const naviagte = useNavigate();
    if(user && user.role !== UserTypes.Complainant) return null;
    return (
        <button
            style={{
                border:'none',
                outline:'none',
                color:'var(--quinary-color)',
                fontSize: 'larger',
                display,
            }}
            onClick={() => {
                naviagte(pages.registerComplaint);
            }}
            className={styles.complaintButton}
        >Complain &nbsp; <img src={pen} /></button>
    );
}
export default ComplaintButton;
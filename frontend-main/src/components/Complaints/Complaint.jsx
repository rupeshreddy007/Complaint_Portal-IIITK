import styles from '../styles/complaint.module.css';
import {useNavigate} from "react-router-dom";
import {useUser} from "@/contexts/UserContextProvider.jsx";
import {pages, reverseStatusMap, statusStylesMap} from "@/constants.js";

/*
    complaint type: {
        id: string,
        title: string,
        description: string,
        status: string
    }
*/


const Complaint = ({ item, children, index}) => {
    const navigate = useNavigate();
    const {user} = useUser();
    // console.log(item);
    const date = new Date(item.createdAt);
    return (
        <div className={`${styles.complaint}`}>
            <div>{index+1}</div>
            <div>{item.complaintId}</div>
            <div>{date.toDateString()}</div>
            <div >{item.title}</div>
            <div className={statusStylesMap[item.status]}
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >{reverseStatusMap[item.status]}</div>
            <div className={styles.actions_wrapper}>
                <button onClick={() => {
                    navigate(`${pages.complaint}/${item.complaintId}`)
                }}
                className={styles.button}
                >View</button>
                {children}
            </div>
        </div>
    );

}

export default Complaint;
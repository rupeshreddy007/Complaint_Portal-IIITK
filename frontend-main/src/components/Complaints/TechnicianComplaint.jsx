import Complaint from "./Complaint.jsx";
import styles from '../styles/complaint.module.css'
import {statusMap} from "@/constants.js";

const TechnicianComplaint = ({item, acceptMutation, solvedMutation, index}) => {

    return (
        <>
            <Complaint item={item} index={index}>
                {
                    item.status === statusMap.Verified && (<button className={styles.button} onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        return acceptMutation.mutate(item.complaintId);
                    }}>Accept it</button>)
                }
                {
                    item.status === statusMap.Accepted && (<button className={styles.button} onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        return solvedMutation.mutate(item.complaintId);
                    }}>Solve it</button>)
                }
            </Complaint>
        </>
    );

}

export default TechnicianComplaint;
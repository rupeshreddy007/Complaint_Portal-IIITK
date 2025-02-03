import Complaint from "./Complaint.jsx";
import { useMutation } from '@tanstack/react-query';
import { deleteComplaint } from "@api/apiCalls";
import styles from '../styles/complaint.module.css';
import {statusMap} from "@/constants.js";
const UserComplaint = ({item, deleteMutation, index}) => {

    return (
        <>
            <Complaint item={item} index={index}>
                {
                    statusMap.Solved > item.status && <button className={styles.button} onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        deleteMutation.mutate(item.complaintId)
                    }}>Delete it</button>
                }
            </Complaint>
        </>
    );

}

export default UserComplaint;
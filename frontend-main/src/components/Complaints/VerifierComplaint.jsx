import Complaint from "./Complaint.jsx";
import { useMutation } from '@tanstack/react-query';
import {rejectComplaint, verifyComplaint} from "@api/apiCalls";
import styles from '../styles/complaint.module.css';
import {toast} from "sonner";

const VerifierComplaint = ({item, verifyMutation, rejectMutation, index}) => {
    return (
        <>
            <Complaint item={item} index={index}>
                <button className={styles.button} onClick={() => verifyMutation.mutate(item.complaintId)}>Verify it</button>
                <button className={styles.button} onClick={() => rejectMutation.mutate(item.complaintId)}>Reject it</button>
            </Complaint>

        </>
    );

}

export default VerifierComplaint;
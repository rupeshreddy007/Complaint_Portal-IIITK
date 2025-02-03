import React from 'react';
import styles from './styles.module.css';
import {useNavigate, useParams} from "react-router-dom";
import {
    pages,
    reverseBuildingsMap,
    reverseComplaintTypes,
    reverseStatusMap,
    statusMap,
    statusStylesMap,
    UserTypes
} from "@/constants.js";
import {useMutation, useQuery} from "@tanstack/react-query";
import {
    acceptComplaint,
    deleteComplaint,
    getComplaintWithId,
    rejectComplaint,
    solveComplaint,
    verifyComplaint
} from "@/api/apiCalls.js";
import {useUser} from "@/contexts/UserContextProvider.jsx";
import {toast} from "sonner";
import {onError} from "@/utils/index.js";
import googleImage from '@/assets/google.png';
import PreviewProof from "@components/ui/PreviewProof.jsx";
import Loading from "@components/ui/Loading.jsx";


const Verifier = ({complaint}) => {
    const navigate = useNavigate();

    const verifyMutation = useMutation({
        mutationFn: verifyComplaint, onSuccess: () => {
            toast.success('Complaint Verified Successfully');
            navigate(pages.dashboard);
        }, onError,
    });
    const handleVerify = async () => {
        await verifyMutation.mutateAsync(complaint.complaintId);
    }

    const rejectMutation = useMutation({
        mutationFn: rejectComplaint, onSuccess: () => {
            toast.success('Complaint Rejected Successfully');
            navigate(pages.dashboard);
        }, onError,
    });
    const handleReject = async () => {
        await verifyMutation.mutateAsync(complaint.complaintId);
    }
    return (<div className={`${styles.bottom_buttons_wrapper}`}>
            {complaint.status < statusMap.Verified &&
                <button className={styles.accept} onClick={handleVerify}>Verify</button>}
            {complaint.status < statusMap.Verified &&
                <button className={styles.delete} onClick={handleReject}>Reject</button>}
        </div>);
}

const Technician = ({complaint}) => {
    const navigate = useNavigate();
    const acceptMutation = useMutation({
        mutationFn: acceptComplaint, onSuccess: () => {
            toast.success('Complaint Accepted Successfully');
            location.reload();
        }, onError,
    });
    const solveMutation = useMutation({
        mutationFn: solveComplaint, onSuccess: () => {
            toast.success('Complaint Solved Successfully');
            navigate(pages.dashboard);
        }, onError,
    });

    const handleAccept = async () => {
        await acceptMutation.mutateAsync(complaint.complaintId);
    }
    const handleSolve = async () => {
        await solveMutation.mutateAsync(complaint.complaintId);
    }
    return (<div className={`${styles.bottom_buttons_wrapper}`}>
            {!(complaint.status === statusMap.Accepted) &&
                <button className={styles.accept} onClick={handleAccept}>Accept</button>}
            <button className={styles.accept} onClick={handleSolve}>Solve</button>
        </div>);
}

const Complainant = ({complaint}) => {
    const navigate = useNavigate();
    const deleteMutation = useMutation({
        mutationFn: deleteComplaint, onSuccess: () => {
            toast.success('Complaint Deleted Successfully');
            navigate(pages.dashboard);
        }, onError,
    });

    const handleDelete = async () => {
        await deleteMutation.mutateAsync(complaint.complaintId);
    }
    return complaint.status !== statusMap.Solved ? (<div className={`${styles.bottom_buttons_wrapper}`}>
        <button onClick={handleDelete} className={styles.delete}>Delete</button>
    </div>) : (<></>);
}

const userMap = {
    [UserTypes.Complainant]: Complainant,
    [UserTypes.Technician]: Technician,
    [UserTypes.Verifier]: Verifier,
    [UserTypes.Admin] : Complainant,
}

const firstRow = "text-base font-medium text-gray-600";
const secondRow = "font-bold text-xl";
const row = "flex flex-col gap-1";
const col = "flex flex-col flex-wrap gap-5"


const Complaint = () => {
    const {complaintId} = useParams();
    const navigate = useNavigate();
    const {user} = useUser();

    const complaintQuery = useQuery({
        queryFn: () => getComplaintWithId(complaintId), queryKey: ['complaint', complaintId],
    });

    const {data, isError, isLoading} = complaintQuery;
    if (isLoading) return <Loading />
    if (isError) return <div>Error Fetching Data</div>

    const {complaint, acceptedBy, createdBy} = data;
    // alert(user.role);
    const Component = userMap[user.role];
    // console.log(data);

    const resolvedDate = new Date(complaint.createdAt);
    const createdDate = new Date(complaint.createdAt);
    return (
        <>
            <div className='flex flex-col ' style={{
                alignItems: 'center'
            }}>
                <div className='w-full'>
                    <div className="flex flex-col gap-3 m-5 border border-gray-300 rounded-lg shadow-lg ">
                        <div className="p-5 text-2xl font-semibold bg-gray-300 ">Veiw Application Details</div>
                        <div className="flex flex-row flex-wrap justify-between p-5 gap-5">
                            <div className={col}>
                                <div className={row}>
                                    <div className={firstRow}>
                                        Complaint ID
                                    </div>
                                    <div className={secondRow}>
                                        {complaint.complaintId}
                                    </div>
                                </div>
                                <div className={row}>
                                    <div className={firstRow}>
                                        Location
                                    </div>
                                    <div className={secondRow}>
                                        <div><span
                                            className={firstRow}>Building Name:</span> {reverseBuildingsMap[complaint.location.buildingName]}
                                        </div>
                                        {(complaint.location.roomNo /* && confirm('Enter anything') */) && <div><span
                                            className={firstRow}>Room No:</span> {complaint.location.roomNo}</div>}
                                        {complaint.location.floorNo && <div><span
                                            className={firstRow}>Floor NO:</span> {complaint.location.floorNo}
                                        </div>}
                                    </div>
                                </div>
                                <div className={row}>
                                    <div className={firstRow}>
                                        Resolved Date
                                    </div>
                                    <div className={secondRow}>
                                        {resolvedDate.toDateString()}
                                    </div>
                                </div>
                            </div>
                            <div className={col}>
                                <div className={row}>
                                    <div className={firstRow}>
                                        Name
                                    </div>
                                    <div className={secondRow}>
                                        {createdBy.displayName}
                                    </div>
                                </div>
                                <div className={row}>
                                    <div className={firstRow}>
                                        Status
                                    </div>
                                    <div
                                        className={`${statusStylesMap[complaint.status]} w-fit rounded-full px-4 py-1 capitalize font-semibold text-base`}>
                                        {reverseStatusMap[complaint.status]}
                                    </div>
                                </div>
                                {complaint.mobile && (<div className={row}>
                                    <div className={firstRow}>
                                        Mobile Number
                                    </div>
                                    <div className={secondRow}>
                                        {complaint.mobile}
                                    </div>
                                </div>)}
                            </div>
                            {/* third Row */}
                            <div className={col}>
                                <div className={row}>
                                    <div className={firstRow}>
                                        Roll No
                                    </div>
                                    <div className={secondRow}>
                                        {createdBy.rollNo}
                                    </div>
                                </div>
                                <div className={row}>
                                    <div className={firstRow}>
                                        Registration Date
                                    </div>
                                    <div className={secondRow}>
                                        {createdDate.toDateString()}
                                    </div>
                                </div>
                            </div>
                            {/* fourth Row */}
                            <div className={col}>
                                <div className={row}>
                                    <div className={firstRow}>
                                        Email
                                    </div>
                                    <div className={secondRow}>
                                        {createdBy.email}
                                    </div>
                                </div>
                                <div className={row}>
                                    <div className={firstRow}>
                                        Complaint Type
                                    </div>
                                    <div className={secondRow}>
                                        {reverseComplaintTypes[complaint.complaintType]}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-5">
                            <div className={row}>
                                <div className={firstRow}>
                                    Description
                                </div>
                                <div className="text-lg font-semibold">
                                    {complaint.description}
                                </div>
                            </div>
                        </div>
                        <div className="px-5 pb-5 flex justify-center" style={{
                            width: '100%',
                        }} >
                            <div className={`${row} items-center`}>
                                <PreviewProof attachmentUrl={complaint.proof}/>
                            </div>
                        </div>
                    </div>
                </div>
                {<Component complaint={complaint}/>}
            </div>
        </>);
};

export default Complaint;

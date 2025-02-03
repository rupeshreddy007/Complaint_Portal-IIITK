import TechnicianComplaint from '@components/Complaints/TechnicianComplaint.jsx'
import styles from "./styles.module.css";
import {useInfiniteQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {acceptComplaint, getComplaints, solveComplaint} from "@/api/apiCalls.js";
import {complaintHeader, handleScroll, RenderItems} from "@pages/Dashboard/utils.jsx";
import {useState} from "react";
import {toast} from "sonner";
import {onError} from "@/utils/index.js";
import {complaintTypes, statusMap, timeGap, UserTypes} from "@/constants.js";
import TestTable from "@components/ui/TempTable.jsx";
import TempTable from "@components/ui/TempTable.jsx";
import UserComplaint from "@components/Complaints/UserComplaint.jsx";
import Loading from "@components/ui/Loading.jsx";


const subUrl = UserTypes.Technician;
const pendingKey = ["complaints", subUrl, "pending"];
const acceptedKey = ["complaints", subUrl, "accepted"];
const selectOptions = [
    {
        value: "-1",
        name: "All",
    },
    {
        value: `${statusMap.Accepted}`,
        name: "Accepted",
    },
    {
        value: `${statusMap.Verified}`,
        name: "Verified",
    }
];
const sucess = (thing, queryClient) => {
    toast.success(`Complaint ${thing} successfully`);
    queryClient.invalidateQueries(pendingKey);
    queryClient.invalidateQueries(acceptedKey);
}

const divStyle= "flex items-center gap-3 p-2 mx-1 my-2 border border-gray-300 rounded shadow w-fit";

const Technician = () => {
    // const [filter, setFilter] = useState("");
    // const [search, setSearch] = useState("");

    // let timer;
    // const handleSearch = (event) => {
    //     clearTimeout(timer);
    //     timer = setTimeout(() => {
    //         setSearch(event.target.value.toLowerCase());
    //     }, timeGap);
    // }

    const queryClient = useQueryClient();
    // const complaintsDiv = (renderableComplaints = []) => {
    //     return (
    //         <>
    //             <div className='flex'>
    //                 <div className={divStyle}>
    //                     <label htmlFor="filter" className="text-base capitalize">filter :</label>
    //                     <select id="filter"
    //                             onChange={(event) => {
    //                                 setFilter(event.target.value)
    //                             }}
    //                             className="p-1 text-base border-2 border-black rounded" name="filter">
    //                         <option value="">All</option>
    //                         <option value="accepted">Accepted</option>
    //                         <option value="verified">Verified</option>
    //                     </select>
    //                 </div>
    //                 <div className={divStyle}>
    //                     <label htmlFor="search" className="text-base capitalize">Search :</label>
    //                     <input type='text' placeholder='Enter Complaint Id' onChange={handleSearch} />
    //                 </div>
    //             </div>
    //
    //             <div
    //                 className={styles.solved_complaints}
    //                 onScroll={(event) => handleScroll(event, [technicianPendingComplaintQuery, technitianAcceptedComplaintQuery])}
    //             >
    //                 <RenderComplaints renderableComplaints={renderableComplaints} Component={TechnicianComplaint} props={{
    //                     acceptMutation,
    //                     solvedMutation,
    //                 }}/>
    //             </div>
    //         </>
    //     );
    // }

    const technicianPendingComplaintQuery = useInfiniteQuery({
        queryKey: pendingKey,
        queryFn: ({queryKey, pageParam = 1}) =>
            getComplaints(
                [
                    {
                        value: pageParam,
                        name: "page",
                    },
                    {
                        value: statusMap.Verified,
                        name: "type",
                    }
                ],
                subUrl
            ),
        getNextPageParam: (prevPage) => prevPage.nextPage,
    });

    const technitianAcceptedComplaintQuery = useInfiniteQuery({
        queryKey: acceptedKey,
        queryFn: ({queryKey, pageParam = 1}) =>
            getComplaints(
                [
                    {
                        value: pageParam,
                        name: "page",
                    },
                    {
                        value: statusMap.Accepted,
                        name: "type",
                    }
                ],
                subUrl
            ),
        getNextPageParam: (prevPage) => prevPage.nextPage,
    });

    const acceptMutation = useMutation({
        mutationFn: acceptComplaint,
        onSuccess: () => {
            sucess("accepted", queryClient)
            queryClient.invalidateQueries(acceptedKey)
            queryClient.invalidateQueries(pendingKey)
        },
        onError,
    });

    const solvedMutation = useMutation({
        mutationFn: solveComplaint,
        onSuccess: () => {
            sucess("solved", queryClient)
            queryClient.invalidateQueries(acceptedKey)
            queryClient.invalidateQueries(pendingKey)
        },
        onError,
    })
    if(technicianPendingComplaintQuery.isLoading) return <Loading />
    if(technicianPendingComplaintQuery.isError) return technicianPendingComplaintQuery.error.message

    // console.log(technicianPendingComplaintQuery.data?.pages);
    const pendingComplaints = technicianPendingComplaintQuery.data?.pages.flatMap(page => page.complaints) || [];
    const acceptedComplaints = technitianAcceptedComplaintQuery.data?.pages.flatMap(page => page.complaints) || [];
    // const complaintsMap = {
    //     "": ,
    //     "accepted": acceptedComplaints,
    //     "verified": pendingComplaints
    // };
    const allComplaints = pendingComplaints.concat(acceptedComplaints).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    return (
        <div className={styles.solved_complaints_wrapper}>
            <div className={`p-5 text-2xl font-semibold bg-gray-300 ${styles.complaints}`}>Complaints</div>
            {technicianPendingComplaintQuery.isSuccess && <TempTable   header={complaintHeader}
                                                                       data={allComplaints}
                                                                       Component={TechnicianComplaint}
                                                                       searchParam='complaintId'
                                                                       altsearchParam='title'
                                                                       parser={Number}
                                                                       filterParam='status'
                                                                       options={selectOptions}
                                                                       queries={[technicianPendingComplaintQuery, technitianAcceptedComplaintQuery]}
                                                                       props={{
                                                                           acceptMutation,
                                                                            solvedMutation,
                                                                       }}
                                                            />}
        </div>
    );
};

export default Technician;
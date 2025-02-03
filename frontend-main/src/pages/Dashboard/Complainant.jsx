import styles from './styles.module.css';
import {useInfiniteQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteComplaint, getComplaints} from "@/api/apiCalls.js";
import {complaintHeader, handleScroll, RenderItems} from "@pages/Dashboard/utils.jsx";
import {useState} from "react";
import {toast} from "sonner";
import {onError} from "@/utils/index.js";
import {reverseStatusMap, selectOptions, statusMap, timeGap, UserTypes} from "@/constants.js";
import UserComplaint from "@components/Complaints/UserComplaint.jsx";
import TestTable from "@components/ui/TempTable.jsx";
import Loading from "@components/ui/Loading.jsx";

const subUrl = UserTypes.Complainant;

const complaintsKey = ['complaints', subUrl, 'all'];

const Complainant = () => {
    const queryClient = useQueryClient();

    const options = {
        queryFn: ({queryKey, pageParam = 1}) => getComplaints([
            {
                value: pageParam ,
                name: 'page',
            },
        ], subUrl),
        getNextPageParam: prevData => prevData.nextPage,
    }



    const allComplaintsQuery = useInfiniteQuery({
        queryKey: complaintsKey,
        ...options,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteComplaint,
        onSuccess: () => {
            toast.success('Complaint deleted sucessfully');
            queryClient.invalidateQueries(complaintsKey);
        },
        onError,
    });
    if(allComplaintsQuery.isLoading) return <Loading />
    if(allComplaintsQuery.isError) return allComplaintsQuery.error.message

    const allComplaints = allComplaintsQuery.data?.pages.flatMap(page => page.complaints) || []
    // console.log(allComplaints);
    allComplaints.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return (
        <div className={styles.solved_complaints_wrapper}>
            <div className="p-5 text-2xl font-semibold bg-gray-300">Complaints</div>
            {allComplaintsQuery.isSuccess && <TestTable header={complaintHeader}
                                                        data={allComplaints}
                                                        Component={UserComplaint}
                                                        searchParam='complaintId'
                                                        altsearchParam='title'
                                                        filterParam='status'
                                                        parser={Number}
                                                        options={selectOptions}
                                                        queries={[allComplaintsQuery]}
                                                        props={{
                                                            deleteMutation,
                                                        }}
                                            />}
        </div>
    );
}

export default Complainant;





    // const [filter, setFilter] = useState(-1);
    // const [search, setSearch] = useState('');
    //
    // let timer;
    // const handleSearch = (event) => {
    //     clearTimeout(timer);
    //     timer = setTimeout(() => {
    //         setSearch(event.target.value.toLowerCase());
    //         console.log('searching');
    //     }, timeGap);
    // }

    // const complaintsDiv = (renderableComplaints = []) => {
    //     console.log(`re-rendering for filter  ${filter} : `, renderableComplaints);
    //     return (
    //         <>
    //             <div className={styles.solved_complaints} onScroll={(event) => handleScroll(event, [allComplaintsQuery])}>
    //                 <RenderComplaints renderableComplaints={renderableComplaints} Component={UserComplaint} props={{
    //                     deleteMutation,
    //                 }}/>
    //             </div>
    //
    //         </>
    //     )
    // }

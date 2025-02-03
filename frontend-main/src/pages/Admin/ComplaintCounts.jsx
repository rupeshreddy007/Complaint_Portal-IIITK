import DetailsCard from "@components/ui/DetailsCard.jsx";
import {useQuery} from "@tanstack/react-query";
import {getComplaintCounts} from "@api/apiCalls.js";
import {toast} from "sonner";
import {complaintTypes, statusMap} from "@/constants.js";
import Loading from "@components/ui/Loading.jsx";

const ComplaintCounts = () => {
    const dataQuery = useQuery({
        queryKey: ['complaint', 'counts'],
        queryFn: getComplaintCounts,
        onError: () => {
            toast.error('Error fetching complaint counts');
        }
    })
    const {data, isLoading, isError} = dataQuery;
    if (isLoading) return <Loading/>;
    if (isError) return <div>Error fetching data</div>;
    const { complaintCounts } = data;
    return (
        <div className='flex gap-2 p-10 h-fit justify-between flex-wrap shadow-lg rounded-md'>
            <DetailsCard isLoading={isLoading}  title={'Accepted'} content={complaintCounts[statusMap.Accepted]}/>
            <DetailsCard isLoading={isLoading}  title={'Solved'} content={complaintCounts[statusMap.Solved]}/>
            <DetailsCard isLoading={isLoading}  title={'Pending'} content={complaintCounts[statusMap.Pending]}/>
            <DetailsCard isLoading={isLoading}  title={'Verified'} content={complaintCounts[statusMap.Verified]}/>
            <DetailsCard isLoading={isLoading}  title={'Rejected'} content={complaintCounts[statusMap.Rejected]}/>
        </div>);
}

export default ComplaintCounts;
import {useInfiniteQuery} from "@tanstack/react-query";
import {getComplaints} from "@api/apiCalls.js";
import Complaint from '@components/Complaints/Complaint.jsx';
import TempTable from "@components/ui/TempTable.jsx";
import Loading from "@components/ui/Loading.jsx";
import {complaintHeader} from "@pages/Dashboard/utils.jsx";
import {selectOptions, UserTypes} from "@/constants.js";

const subUrl = UserTypes.Admin;
const Complaints = () => {
    const complaintsQuery = useInfiniteQuery({
        queryKey: ["Admin", "complaints"],
        queryFn: ({ pageParam = 1}) => getComplaints([{
            name: 'page',
            value: pageParam
        }], subUrl),
        getNextPageParam: prevPage => prevPage.nextPage ? prevPage.nextPage : null,
    })

    const {data, isError, isLoading} = complaintsQuery;

    if (isLoading) return <Loading />
    if (isError) return <div>Error fetching data</div>
    const flattenedData = data.pages.flatMap(complaints => complaints.complaints ) // change according to the data
    // console.log('flattenedData ', flattenedData);
    return (
        <div style={{
            height: '70vh',
        }}>

        <TempTable data={flattenedData}
                   Component={Complaint}
                   searchParam={'complaintId'}
                   altsearchParam={'title'}
                   filterParam='status'
                   parser={Number}
                   options={selectOptions}
                   queries={[complaintsQuery]}
                   header={complaintHeader}
        />
        </div>
    );
}

export default Complaints;
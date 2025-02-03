import VerifierComplaint from "@components/Complaints/VerifierComplaint.jsx";
import styles from "./styles.module.css";
import {useInfiniteQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {getComplaints, rejectComplaint, verifyComplaint} from "@/api/apiCalls.js";
import {complaintHeader, handleScroll, RenderItems} from "@pages/Dashboard/utils.jsx";
import {toast} from "sonner";
import complaintStyle from "@components/styles/complaint.module.css";
import TempTable from "@components/ui/TempTable.jsx";
import Loading from "@components/ui/Loading.jsx";
import {onError} from "@/utils/index.js";
import {UserTypes} from "@/constants.js";

const subUrl = UserTypes.Verifier;

const key = ["complaints", subUrl];
const Verifier = () => {
    const queryClient = useQueryClient();


    const verifierComplaintQuery = useInfiniteQuery({
        queryKey: key,
        queryFn: ({queryKey, pageParam = 1}) =>
            getComplaints(
                [
                    {
                        value: pageParam,
                        name: "page",
                    },
                ],
                subUrl
            ),
        getNextPageParam: (prevPage) => prevPage.nextPage,
    });

    const verifyMutation = useMutation({
        mutationFn: verifyComplaint,
        onSuccess: () => {
            toast.success('Verified complaint successfully')
            queryClient.invalidateQueries(key);
        },
        onError,
    });
    const rejectMutation = useMutation({
        mutationFn: rejectComplaint,
        onSuccess: () => {
            toast.success('Rejected complaint successfully')
            queryClient.invalidateQueries(key);
        },
        onError,
    });

    const {data, isLoading, isError, isFetching, hasNextPage, error, isSuccess} = verifierComplaintQuery;

    if(isLoading) return <Loading />
    if(isError) return error.message

    const complaints = data?.pages.flatMap(page => page.complaints) || [];

    return (
        <div className={styles.solved_complaints_wrapper}>
            <div className={`p-5 text-2xl font-semibold bg-gray-300 ${styles.complaints}`}>Complaints</div>

            {isSuccess && <TempTable
                            data={complaints}
                            header={complaintHeader}
                            Component={VerifierComplaint}
                            searchParam={'complaintId'}
                            altsearchParam={'title'}
                            queries={[verifierComplaintQuery]}
                            props={{
                                rejectMutation,
                                verifyMutation
                            }} /> }
        </div>
    );
};

export default Verifier;
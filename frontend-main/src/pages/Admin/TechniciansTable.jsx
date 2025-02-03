import Table from "@components/ui/Table.jsx";
import {complaintTypes, UserTypes} from "@/constants.js";
import UserCard from "@components/ui/UserCard.jsx";
import {getUsers} from "@api/apiCalls.js";
import {useInfiniteQuery} from "@tanstack/react-query";
import Loading from "@components/ui/Loading.jsx";
import TempTable from "@components/ui/TempTable.jsx";
import userCard from "@components/ui/UserCard.jsx";
import {complainantHeader} from "@pages/Dashboard/utils.jsx";


const TechniciansTable = () => {
    const techniciansQuery = useInfiniteQuery({
        queryKey: ['technicians'],
        queryFn: ({pageParam = 1}) => getUsers(pageParam, UserTypes.Technician),
        getNextPageParam: lastPage => lastPage.nextPage,
    });
    const {data, error, isLoading, isError} = techniciansQuery;
    if (isLoading) return <Loading />;
    if (isError) return <div>Error: {error.message}</div>;
    if (!data) return <div>No data</div>;

    const flatData = data.pages.flatMap(page => page.users);
    // console.log(flatData);
    return (
        <TempTable Component={userCard}
                   data={flatData}
                   queries={[techniciansQuery]}
                   header={complainantHeader(UserTypes.Technician)}
                   searchParam={'displayName'}
                   altsearchParam={'email'}
        />
    );
}

export default TechniciansTable;
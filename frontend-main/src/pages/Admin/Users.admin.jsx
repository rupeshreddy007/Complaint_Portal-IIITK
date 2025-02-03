import Table from "@components/ui/Table.jsx";
import {useInfiniteQuery} from "@tanstack/react-query";
import {getUsers} from "@api/apiCalls.js";
import {UserTypes} from "@/constants.js";
import userCard from "@components/ui/UserCard.jsx";
import TempTable from "@components/ui/TempTable.jsx";
import {complainantHeader} from "@pages/Dashboard/utils.jsx";
import Loading from "@components/ui/Loading.jsx";

const Users = () => {

    const usersQuery = useInfiniteQuery({
        queryKey: ["Admin", "users"],
        queryFn: ({pageParam = 1}) => getUsers(pageParam, UserTypes.Complainant),
        getNextPageParam: prevPage => prevPage.nextPage ? prevPage.nextPage : null,
    })
    const {data, isError, isLoading} = usersQuery;

    if (isLoading) return <Loading />
    if (isError) return <div>Error fetching data</div>
    const flattenedData = data.pages.flatMap(pages => pages.users ) // change according to the data
    // const flattenedData = Array.from({ length: 20 }, (v, i) => {
    //
    //     return {
    //         displayName: 'John doe',
    //         email: 'JohnDoe@gmail.com',
    //         rollNo: '2022Bcy0031',
    //         role: 0,
    //     }
    // });
    const header = complainantHeader(UserTypes.Complainant);
    return (
        // <Table title='Complainants (Users)' Component={userCard} />
        <TempTable data={flattenedData}
                   Component={userCard}
                   searchParam={'displayName'}
                   altsearchParam={'rollNo'}
                   header={header}
                   queries={[usersQuery]}
                   styles={{
                       height: '70vh',
                   }}
        />
    );
}

export default Users;
import complaintStyle from "@components/styles/complaint.module.css";
import userStyle from "@components/styles/user.module.css";
import {UserTypes} from "@/constants.js";

export const loadMore = (complaintsQuery) => {
    if (complaintsQuery.hasNextPage) {
        complaintsQuery.fetchNextPage()
    }
}
export const handleScroll = (event, querysArray) => {
    // console.log('reached handleScroll');
    event.preventDefault();
    event.stopPropagation();
    const {scrollTop, clientHeight, scrollHeight} = event.target;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
        querysArray.forEach((queryInstance) => loadMore(queryInstance));
    }
}

export const RenderItems = ({data , Component, Header, props}) => {
    return (
        <>
            <div
                className='w-full'
            >
                {Header && Header}

                {data.map((item, index) => {
                    return (
                        <Component
                            index={index}
                            {...props}
                            item={item}
                            key={item.complaintId ? item.complaintId : item.googleId}
                        />
                    );
                })}
            </div>
        </>
    )
}

export const complaintHeader = (
    <div className={complaintStyle.complaint}>
        <div>Sl No</div>
        <div>Complaint ID</div>
        <div>Created At</div>
        <div>Title</div>
        <div>Status</div>
        <div>Action</div>
    </div>
);

const smallMap = {
    [UserTypes.Complainant] : 'Roll No',
    [UserTypes.Verifier] : 'Role',
    [UserTypes.Technician] : 'Domain',
}
export const complainantHeader = (role) => {

    return (
    <div className={userStyle.user}>
        <div>Sl No</div>
        <div>Name</div>
        <div>Email</div>
        <div>{smallMap[role]}</div>
        {/*<div>Actions</div>*/}
    </div>
)};
import {reverseComplaintTypes, reverseUserTypes, UserTypes} from "@/constants.js";
import styles from '../styles/user.module.css'
// const smallMap = {
//     [UserTypes.Complainant] : 'rollNo',
//     [UserTypes.Verifier] : 'role',
//     [UserTypes.Technician] : 'domain',
// }

const parsingMap = {
    [UserTypes.Complainant] : (item) => item['rollNo'],
    [UserTypes.Verifier] : (item) => reverseUserTypes[(item['role'])],
    [UserTypes.Technician] : (item) => reverseComplaintTypes[(item['domain'])],
}
const UserCard = ( { item, index } ) => {
    const { domain, role, isBlocked, displayName, email } = item;
    // console.log('item ', item);
    // console.log('role: ', role);

    return (
        <div className={` ${styles.user} ${isBlocked ? 'bg-gray-500' : ''} rounded-md shadow-lg`}>
            <div>{index}</div>
            <div>{displayName}</div>
            <div>{email}</div>
            <div>{parsingMap[role](item)}</div>
            {/*<div>{}</div>*/}

        </div>
    );
}

export default UserCard;
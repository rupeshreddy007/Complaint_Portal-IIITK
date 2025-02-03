import Complaints from "@pages/Admin/Complaints.admin.jsx";
import Users from "@pages/Admin/Users.admin.jsx";
import {useState} from "react";


const filteredComponents = {
    users: Users,
    complaints: Complaints,
}

const Tables = () => {
    const [filter, setFilter] = useState('users');
    const Component = filteredComponents[filter];
    return (
        <div
            style={{
                minHeight: "95vh",
                width: "100%",
            }}
                className='flex p-10'
        >
            <div
                className='flex w-full p-16 shadow-lg rounded-lg flex-col '
            >
                <select
                    className='w-fit p-1 mx-1 text-base border-2 border-black rounded'
                    onChange={(event) => {
                    setFilter(event.target.value)
                }}>
                    <option value='users'>Complainants (users)</option>
                    <option value='complaints'>Complaints</option>
                </select>
                {Component ? <Component /> : "Dont mess with anything" }

            </div>
        </div>
    );
}

export default Tables;
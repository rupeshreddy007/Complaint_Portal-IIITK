import DetailsCard from "@components/ui/DetailsCard.jsx";
import VerifiersTable from "@pages/Admin/VerifiersTable.jsx";
import TechniciansTable from "@pages/Admin/TechniciansTable.jsx";
import {useState} from "react";
import ComplaintCounts from "@pages/Admin/ComplaintCounts.jsx";

const filteredComponents = {
        verifiers: VerifiersTable,
        technicians: TechniciansTable,
}

const MainDashboard = () => {
    const [filter, setFilter] = useState('verifiers');
    const Component = filteredComponents[filter];
    return (
        <div className=' w-full p-20 flex flex-col ' style={{
            height: '95vh',
        }}>
            <ComplaintCounts />
            <div className='flex gap-2 justify-around flex-wrap my-6 rounded-md'
                 style={{
                     maxHeight: '75%',
                 }}
            >
                <div
                    style={{
                        maxHeight: '55vh',
                        width: "100%",
                    }}
                    className='flex'
                >
                    <div
                        className='flex w-full shadow-lg rounded-lg flex-col '
                    >
                        <select
                            className='w-fit p-1 mx-1 text-base'
                            onChange={(event) => {
                                setFilter(event.target.value)
                            }}>
                            <option value='verifiers'>Verifiers</option>
                            <option value='technicians'>Technicians</option>
                        </select>
                        {Component ? <Component/> : "Dont mess with anything"}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainDashboard;
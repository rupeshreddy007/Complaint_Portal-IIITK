import { useState } from "react";
import MainDashboard from "./MainDashboard";
import AddUsers from "./AddUsers";
import Tables from "./Tables";
import { Link } from "react-router-dom";
import Statistics from "./Statistics";
import dashboard from '@/assets/dashboard.svg';
import tables from '@/assets/tables.svg';
import statistics from '@/assets/statistics.svg';
import add from '@/assets/addUsers.svg';


const routes = [
    {
        title: "Dashboard",
        component: "MainDashboard",
        icon: dashboard
    },
    {
        title: "Add Users",
        component: "Addusers",
        icon: add
    },
    {
        title: "Tables",
        component: "Tables",
        icon: tables
    },
    // {
    //     title: "Statistics",
    //     component: "Statistics",
    //     icon: statistics
    // }
];


const SideBar = ({setComponent}) => {
    const [openSidenav, setOpenSidenav] = useState(false);
    return (
        <div className="flex">
        <aside
            style={{
                height: "90vh",
                zIndex: '10',
            }}
            className={`my-5 mx-3 flex items-center h-screen duration-200 ease-in-out}`}
            >
            <div className={`${openSidenav ? 'p-10 m-2' : 'p-2 m-6'} flex flex-col justify-center h-fit rounded-2xl shadow-lg gap-10 overflow-hidden`}
            style={{
                width: openSidenav ? 'max-content' : '2.5rem',
                transition: 'width 1s ease-in-out',
            }}
            >
                {routes.map(({ title, component, icon }, index) => (
                    <ul onClick={() => setComponent(component)} key={index} className="mb-4 flex justify-items-start cursor-pointer items-center gap-3"
                    >
                        <img src={icon} />
                        { title && (
                            <li
                                // style={{
                                //     display: openSidenav ? "block" : "none",
                                // }}
                            >
                                {title}
                            </li>
                        )}
                    </ul>
                ))}
            </div>
        </aside>
        <button onClick={() => setOpenSidenav(prev => !prev)}>
                    {openSidenav ? "<" : ">"}
        </button>
                </div>
    );
};

export default SideBar;

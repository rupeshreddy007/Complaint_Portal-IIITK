import styles from './styles.module.css';
import SideBar from './Sidebar';
import { useState } from 'react';
import MainDashboard from './MainDashboard';
import AddUsers from './AddUsers';
import Tables from './Tables';
import Statistics from './Statistics';

const componentsMap = {
    MainDashboard,
    Addusers: AddUsers,
    Tables,
    Statistics,
};

const Dashboard = () => {
    const [Component, setComponent] = useState('MainDashboard');
    const RenderComponent = componentsMap[Component];
    return (
        <div className='flex'>
            <SideBar setComponent={setComponent} />
            <RenderComponent />
        </div>
    );
}

export default Dashboard;

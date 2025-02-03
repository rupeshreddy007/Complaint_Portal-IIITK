import styles from './styles.module.css';
import {useNavigate} from "react-router-dom";
import UserDetails from "./UserDetails.jsx";
import Complainant from "./Complainant.jsx";
import Technician from "./Technician.jsx";
import Verifier from "./Verifier.jsx";
import { useUser } from '@/contexts/UserContextProvider.jsx';
import { UserTypes } from '@/constants.js';
import {useEffect} from "react";
import Admin from "@pages/Admin/";
import Loading from "@components/ui/Loading.jsx";

const dashBoardMaps = {
    [UserTypes.Complainant] : Complainant,
    [UserTypes.Technician]: Technician,
    [UserTypes.Verifier] : Verifier,
    [UserTypes.Admin] : Admin,
}


const Dashboard = () => {
    const navigate = useNavigate();
    const { user, requested } = useUser();

    if(!requested) return <Loading />;
    useEffect(() => {
        if(!user) {
            navigate('/login/', {replace: true});
        }
    }, []);

    if (!user) return null;
    if (user?.role === UserTypes.Admin) return (<Admin/>);
    const Component = dashBoardMaps[user?.role || UserTypes.Complainant];

    return (
        <>
            <div className={styles.dashboard}>
                <UserDetails/>
                <Component/>
            </div>
        </>
    );
};

export default Dashboard;

import Navbar from "../components/Navbar";
import {Outlet} from "react-router-dom";
import ComplaintButton from "@components/ui/ComplaintButton.jsx";
import {auLinks, subs, unAuLinks} from "@/constants.js";
import {useUser} from "@/contexts/UserContextProvider.jsx";


const IndexLayout = () => {
    const {user} = useUser();
    const links = user ? auLinks[user.role] : [];
    return (
        <>
            <Navbar auLinks={links} unAuLinks={unAuLinks} subs={subs}/>
            <Outlet/>
        </>
    );
};

export default IndexLayout;
import {useLocation, useNavigate} from "react-router-dom";
import {useUser} from "@/contexts/UserContextProvider.jsx";
import React from "react";
import styles from '../styles.module.css'
import { pages, UserTypes } from "@/constants";

const   ActualHome = () => {
    const { user} = useUser();
    const navigate = useNavigate();
    const handleCLick = () => {
        if (user) {
            navigate(pages.registerComplaint);
        } else {
            navigate(pages.login);
        }
    }
    return (
        <div id="home" className={`${styles.home} flex flex-row items-start justify-between p-10 pt-36 bg-gray-200`}  >
            <div className="flex flex-col w-1/2 gap-4">
                <div className="text-4xl font-bold text-blue-900">
                Welcome to Campus Concerns, A Platform for submit complaints and get resolutions
                </div>
                <div className="text-base text-gray-800">
                The Student Complaint Management System, designed to prioritize your feedback and concerns throughout your academic journey. At Indian Institute Of Information Technology Kottayam, we value transparency, timely action, and confidentiality in handling your complaints. Using this system, you can easily submit complaints, track their progress, and expect prompt resolutions to ensure a positive and enriching experience for all students.
                </div>
                { (user && user.role === UserTypes.Complainant || !user) && <button className="p-3 text-base font-semibold text-white bg-orange-600 rounded hover:shadow-md hover:shadow-orange-300 w-fit" onClick={handleCLick}>Register your Grievance</button>}
            </div>
            <img src="assests/hero-banner.png" alt="" width={300} height={300} className="mr-12" />
        </div>
    );
}

export default ActualHome;
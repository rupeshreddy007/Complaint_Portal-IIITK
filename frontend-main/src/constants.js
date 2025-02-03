import { acceptComplaint } from "@api/apiCalls";
import axios from "axios";

export const UserTypes = {
    Complainant: 0,
    Verifier: 1,
    Technician: 2,
    Admin: 3,
};
export const reverseUserTypes = {
    [0]: "Complainant",
    [1]: "Verifier",
    [2]: "Technician",
    [3]: "Admin",
};

export const statusMap = {
    Pending: 0,
    Verified: 1,
    Accepted: 2,
    Solved: 3,
    Rejected: 4,
};

export const reverseStatusMap = {
    0: "Pending",
    1: "Verified",
    2: "Accepted",
    3: "Solved",
    4: "Rejected",
};

export const Headers = {
    UserType: "type",
    UserFirstName: "f_name",
    UserLastName: "l_name",
    UserUName: "u_name",
};

export const complaintTypes = {
    Electrical: 0,
    Plumbing: 1,
    IT: 2,
    Others: 3,
};

export const reverseComplaintTypes = {
    [0]: "Electrical",
    [1]: "plumbing",
    [2]: "IT",
    [3]: "Others",
};

export const buildingsMap = {
    Mess: 0,
    "Admin Block": 1,
    "Academic Block": 2,
    "new Academic Block": 3,
    "Meenachil Hostel": 4,
    "Sahayadri Hostel": 5,
    "Manimala Hostel": 6,
    "Annaimudi Hostel": 7,
    "Anna residency": 8,
};
export const reverseBuildingsMap = {
    [0]: "Mess",
    [1]: "Admin Block",
    [2]: "Academic Block",
    [3]: "new Academic Block",
    [4]: "Meenachil Hostel",
    [5]: "Sahayadri Hostel",
    [6]: "Manimala Hostel",
    [7]: "Annaimudi Hostel",
    [8]: "Anna residency",
};

export const pages = {
    login: "/login",
    dashboard: "/user/dashboard",
    registerComplaint: "/user/complaint-register",
    error: "/error",
    loginError: "/login-error",
    verify: "/verify",
    verifyError: "/verify-error",
    verifySuccess: "/verify-success",
    technician: "/technician",
    technicianError: "/technician-error",
    technicianSuccess: "/technician-success",
    admin: "/admin",
    adminError: "/admin-error",
    adminSuccess: "/admin-success",
    access_forbidden: "/access-forbidden",
    complaint: "/user/complaint",
};

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

// export const apiRoutes = {
//     registerComplaint: "/api/grievance/register",
//     createUser: "/api/grievance/auth/createUser",
//     getComplaints: "/api/grievance/complaints",
//     getComplaintWithId: "/api/grievance/complaint",
//     deleteComplaint: "/api/grievance/delete",
//     uploadProof: "/api/grievance/upload",
//     verifyComplaint: "/api/grievance/verify",
//     rejectComplaint: "/api/grievance/reject",
//     acceptComplaint: "/api/grievance/accept",
//     solveComplaint: "/api/grievance/solve",
//     getUser: "/api/grievance/auth/pinguser",
//     getUsers: "/api/grievance/auth/users",
//     getComplaintCounts: '/api/grievance/complaintcount',
//     backendUrl,
//     // login:`${backendUrl}/api/v1/auth/google`,
//     login: `${backendUrl}/grievance/auth/google`,
//     // deleteComplaint: '/api/complaints/delete',
// };

export const apiRoutes = {
    registerComplaint: `${backendUrl}/grievance/register`,
    createUser: `${backendUrl}/grievance/auth/createUser`,
    getComplaints: `${backendUrl}/grievance/complaints`,
    getComplaintWithId: `${backendUrl}/grievance/complaint`,
    deleteComplaint: `${backendUrl}/grievance/delete`,
    uploadProof: `${backendUrl}/grievance/upload`,
    verifyComplaint: `${backendUrl}/grievance/verify`,
    rejectComplaint: `${backendUrl}/grievance/reject`,
    acceptComplaint: `${backendUrl}/grievance/accept`,
    solveComplaint: `${backendUrl}/grievance/solve`,
    getUser: `${backendUrl}/grievance/auth/pinguser`,
    getUsers: `${backendUrl}/grievance/auth/users`,
    getComplaintCounts: `${backendUrl}/grievance/complaintcount`,
    backendUrl,
    // login:`${backendUrl}/api/v1/auth/google`,
    login: `${backendUrl}/grievance/auth/google`,
    // deleteComplaint: '/api/complaints/delete',
};

// export const apiRoutes = {
//     registerComplaint: "/api/register",
//     getComplaints: "/api/complaints",
//     getComplaintWithId: "/api/complaint",
//     uploadProof: "/api/upload",
//     verifyComplaint: "/api/complaints/verify",
//     acceptComplaint: "/api/complaints/accept",
//     getUser: "/api/auth/login/success",
//     backendUrl,
//     // login:`${backendUrl}/api/v1/auth/google`,
//     login: `${backendUrl}/auth/google`,
//     // deleteComplaint: '/api/complaints/delete',
// };

export const customAxios = axios.create({
    withCredentials: true,
});

export const unAuLinks = [
    {
        name: "Home",
        path: "/",
    },
];

const verTechLinks = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Dashboard",
        path: "/user/dashboard",
    },
];

const userSpecificLinks = [
    {
        name: "Register Complaint",
        path: "/user/complaint-register",
    },
];
export const auLinks = {
    [UserTypes.Complainant]: [...verTechLinks, ...userSpecificLinks],
    [UserTypes.Verifier]: verTechLinks,
    [UserTypes.Technician]: verTechLinks,
    [UserTypes.Admin]: verTechLinks,
};

export const subs = {
    Home: [
        { name: "About", path: "/#about" },
        // { name: "Contact", path: "/#contact" },
    ],
};

export const timeGap = 150;

export const statusStylesMap = {
    [statusMap.Pending]: "rounded-md px-2 bg-amber-100 text-amber-700",
    [statusMap.Verified]: "rounded-md px-2 bg-orange-100 text-red-700",
    [statusMap.Accepted]: "rounded-md px-2 bg-blue-200 text-blue-700",
    [statusMap.Solved]: "rounded-md px-2 bg-green-200 text-black",
    [statusMap.Rejected]: "rounded-md px-2 bg-red-200 text-gray-700",
};

export const selectOptions = [
    {
        value: -1,
        name: "All",
    },
    ...Object.entries(reverseStatusMap).map(([key, value]) => ({
        value: key,
        name: value,
    })),
];

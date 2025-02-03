import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiRoutes, customAxios, UserTypes } from "@/constants.js";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

export const userContext = createContext({
    user: null,
    setUser: () => {},
});

const tempUser = {
    displayName: "Admin",
    email: "Admin@admin.com",
    role: UserTypes.Admin,
};

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [requested, setRequested] = useState(false);

    const userQuery = useQuery({
        queryFn: async () => {
            const response = await customAxios.get(apiRoutes.getUser);
            return response.data;
        },
        queryKey: ["user"],
        retry: 1,
    });

    const { data, isError } = userQuery;
    useEffect(() => {
        if (isError) {
            setRequested(true);
            // setUser(tempUser); //temporary
        }
        if (data) {
            setUser(() => data);
            // console.log(data);
            setRequested(true);
        }
    }, [isError, data]);

    return (
        <userContext.Provider value={{ user, setUser, requested }}>
            {children}
        </userContext.Provider>
    );
};

export const useUser = () => useContext(userContext);

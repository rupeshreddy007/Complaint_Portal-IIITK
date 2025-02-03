import styles from "./styles.module.css";
import form from "@pages/Form/index.jsx";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { getDate, onError } from "@/utils/index.js";
import {
    apiRoutes,
    buildingsMap,
    complaintTypes,
    customAxios,
    pages,
} from "@/constants";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContextProvider.jsx";
import InputCard from "@components/ui/InputCard.jsx";

const sendData = async ([complaintData, file]) => {
    if (!complaintData || !file) throw new Error("Not a well structured form");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify(complaintData));
    const response = await customAxios.post(
        apiRoutes.registerComplaint,
        formData
    );
    if (response.data["status"] === "error") {
        throw new Error("bad request");
    }
    return response.data;
};

// const sendFile = async (file) => {
//     if (!file) throw new Error('No file');
//
//     const fileForm = new FormData();
//     fileForm.append('file', file);
//     const response = await customAxios.post(apiRoutes.uploadProof, fileForm, {
//         'Content-Type': 'multipart/form-data',
//     });
//     if (response.data['status'] === 'error') {
//         throw new Error('bad request');
//     }
//     return response.data
// }

const formatAsaRequest = (complaint) => {
    return {
        complaint,
    };
};

const getFormData = (e) => {
    e.preventDefault();
    const form = e.target;
    /*
            complaint from frontend format = {
                title: String,
                description: String,
                mobile: String,
                compliantType: String,
                location: {
                    buildingName: String,
                    roomNo: String,
                    floorNo: String,
                },
            }
        */
    const formData = {
        title: form.title.value,
        complaintType: complaintTypes[form.type.value],
        location: {
            buildingName: form.building.value,
            roomNo: form.roomNo.value || "",
            floorNo: form.floorNo.value || "",
        },
        mobile: form.mobile.value,
        description: form.description.value,
    };
    const file = form.proof.files[0];
    return [formData, file];
};

const Card =
    "flex flex-col gap-3 mx-5 my-3  border border-gray-300 rounded-lg shadow-lg";
const heading =
    "p-5 text-2xl  font-semibold bg-blue-600 text-white  rounded-t-lg";
const selectCSS =
    "py-2 pl-2 pr-6 text-base border border-gray-400 rounded shadow focus:outline-none w-fit";

const clearForm = (event) => {
    const form = event.target;
    form.mobile.value = "";

    form.title.value = "";
    form.description.value = "";
    form.type.value = "";

    form.building.value = "";
    form.roomNo.value = " ";
    form.floorNo.value = " ";

    form.proof.value = "";
};

const checkPrerequsets = (event) => {
    const num = event.target.mobile.value;
    if (num.length !== 10 || isNaN(num)) {
        toast.error("Enter a valid mobile number");
        event.preventDefault();
        return false;
    }
    return true;
};

const ComplaintForm = () => {
    // const fileMutation = useMutation({
    //     mutationFn: sendFile,
    //     onSuccess: (responseData) => {
    //         toast.success('Registered complaint successfully');
    //     },
    //     onError
    // })

    const dataMutation = useMutation({
        mutationFn: sendData,
        onSuccess: () => {
            toast.success("Registered complaint successfully");
        },
        onError,
    });

    const { user } = useUser();
    if (user === null) {
        return <></>;
    }
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const [formData, file] = getFormData(event);
    //     // console.log(formData, file);
    //     const complaint = formatAsaRequest(formData);
    //     try {
    //         await dataMutation.mutateAsync([complaint, file]);
    //     } catch (err) {}
    //     document.querySelector('form').reset();
    //     console.log('resetted');
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!checkPrerequsets(event)) return;
        const [formData, file] = getFormData(event);
        const complaint = formatAsaRequest(formData);
        try {
            await dataMutation.mutateAsync([complaint, file]);
        } catch (err) {}
        clearForm(event);
    };

    return (
        <div className="flex flex-col">
            <div className="self-center m-5 text-3xl font-bold text-zinc-800">
                Register Your Complaint
            </div>
            <form
                action=""
                id="complaint-form"
                className="flex flex-col"
                onSubmit={handleSubmit}
            >
                {/* Personal Details */}
                <div className={Card}>
                    <div className={heading}>Personal Details</div>
                    <div className="flex flex-col gap-5 p-5">
                        <div className="flex flex-row flex-wrap gap-10">
                            <InputCard
                                name={"name"}
                                LabelName={"Name:"}
                                value={user.displayName}
                                typeInput={"text"}
                                disabled
                                styles={" bg-gray-200"}
                            />
                            <InputCard
                                name={"rollNumber"}
                                LabelName={"Roll No:"}
                                value={user.rollNo}
                                typeInput={"text"}
                                disabled
                                styles={" bg-gray-200"}
                            />
                        </div>
                        <InputCard
                            name={"email"}
                            LabelName={"Email:"}
                            value={user.email}
                            typeInput={"email"}
                            disabled
                            styles={" bg-gray-200 w-96"}
                        />
                        <InputCard
                            props={{
                                pattern: "[0-9]{10}",
                            }}
                            name={"mobile"}
                            LabelName={"Mobile Number (Optional)"}
                            styles={"w-fit"}
                            typeInput={"number"}
                            placeholder={"Enter Your Number"}
                        />
                    </div>
                </div>
                {/* Compliant Details */}
                <div className={Card}>
                    <div className={heading}>Complaint Details</div>
                    <div className="flex flex-col gap-5 p-5">
                        <div className="flex flex-row flex-wrap gap-10">
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="complianttype"
                                    className="text-base font-medium"
                                >
                                    Selcet Compliant category{" "}
                                    <span className="text-red-600">*</span>
                                </label>
                                <select name="type" className={selectCSS}>
                                    {Object.keys(complaintTypes).map(
                                        (type, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={type}
                                                    className=""
                                                >
                                                    {type
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        type.slice(1)}
                                                </option>
                                            );
                                        }
                                    )}
                                </select>
                            </div>
                            <InputCard
                                name={"title"}
                                LabelName={"Title"}
                                typeInput={"text"}
                                required
                                placeholder={"Compliant Title"}
                                styles={"w-fit"}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="description"
                                className="text-base font-medium capitalize"
                            >
                                Complaint description{" "}
                                <span className="text-red-600">*</span>
                            </label>
                            <textarea
                                name={"description"}
                                placeholder={"Enter Compliant Description"}
                                rows={5}
                                className="w-2/5 p-2 text-base border border-gray-900 rounded shadow"
                            />
                        </div>
                    </div>
                </div>
                {/* Location  */}
                <div className={Card}>
                    <div className={heading}>Complaint Loaction</div>
                    <div className="flex flex-col gap-5 p-5">
                        <div className="flex flex-row flex-wrap gap-10">
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="BuildingName"
                                    className="text-base font-medium"
                                >
                                    Selcet location{" "}
                                    <span className="text-red-600">*</span>
                                </label>
                                <select
                                    name="building"
                                    className={selectCSS}
                                    required
                                >
                                    {Object.keys(buildingsMap).map(
                                        (building, index) => (
                                            <option
                                                key={index}
                                                value={buildingsMap[building]}
                                            >
                                                {building}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                            <InputCard
                                name={"roomNo"}
                                LabelName={"Room No"}
                                typeInput={"text"}
                                placeholder={"Room Number"}
                            />
                            <InputCard
                                name={"floorNo"}
                                LabelName={"Floor No"}
                                typeInput={"text"}
                                placeholder={"Floor Number"}
                            />
                        </div>
                    </div>
                </div>
                {/* Upload File     */}
                <div className={Card}>
                    <div className={heading}>Upload File</div>
                    <div className="flex flex-col gap-2 m-5 w-fit">
                        <label
                            htmlFor="proof"
                            className="text-base font-semibold"
                        >
                            Upload supporting documents(Image or Video){" "}
                            <span className="text-red-600">*</span>
                        </label>
                        <input
                            name="proof"
                            className=""
                            accept={
                                ".jpg, .jpeg, .png, .gif, .bmp, .webp, .mp4, .webm, .ogg, .ogv"
                            }
                            type={"file"}
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-center gap-5 mx-6 mt-4 mb-10">
                    <InputCard
                        name={"submit"}
                        typeInput={"submit"}
                        styles="text-xl font-medium text-white bg-green-600 cursor-pointer hover:shadow-green-500"
                        value={"submit"}
                    />
                    <InputCard
                        name={"reset"}
                        typeInput={"reset"}
                        styles={
                            "text-xl font-medium text-white bg-red-600 cursor-pointer hover:shadow-orange-500"
                        }
                        value={"reset"}
                    />
                </div>
            </form>
        </div>
    );
};

export default ComplaintForm;

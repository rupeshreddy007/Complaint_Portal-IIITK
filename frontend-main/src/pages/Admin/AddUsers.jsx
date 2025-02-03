import InputCard from "@components/ui/InputCard.jsx";
import {complaintTypes, UserTypes} from "@/constants.js";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {createUser} from "@api/apiCalls.js";
import {toast} from "sonner";
import axios from "axios";

const AddUsers = () => {
    const [type, setType] = useState(UserTypes.Verifier);
    const createMutation = useMutation({
        mutationFn:createUser,
        onError: (error) => {
            axios.isAxiosError(error) ? toast.error(error.response.data.message) : toast.error('An error occurred in creating user');
        },
        onSuccess: (data) => {
            toast.success('User created successfully');
        }
    })
    const handleSubmit = async (event) => {
            event.preventDefault();
            const form = event.target;
            const data = {
                email: form.mail.value,
                role: type,
                domain: Number(form.domain?.value),
            }
            // console.log(data);
            await createMutation.mutateAsync(data);
    };
    return (
        <div style={{
            minHeight: '95vh',
            width: '100%',
        }} className='flex justify-center items-center'>
            <form
                onSubmit={handleSubmit}
                action=''
                className='rounded-md shadow-lg p-16 pb-20 flex flex-col justify-center items-center gap-10'>
                <div className='flex justify-center items-end gap-20'>
                    <InputCard props={{size: 30}}  name='mail' placeholder='Enter a email' LabelName='Email'/>
                    <select onChange={(event) => setType(Number(event.target.value))} className='p-1 text-base border-2 border-black rounded' name='role' id='role'>
                        <option value={`${UserTypes.Verifier}`}>Verifier</option>
                        <option value={`${UserTypes.Technician}`}>Technician</option>
                    </select>
                </div>
                {
                    type === UserTypes.Technician && (
                        <select name='domain' className='p-2 text-base border-2 border-black rounded'>
                            {Object.keys(complaintTypes).map((type, index) => (
                                <option key={index} value={complaintTypes[type]}
                                               >{type}</option>))
                            }
                        </select>
                    )
                }
                <div className='flex gap-5'>
                    <button type='submit' className='bg-green-600  text-white p-2 rounded-md'>Add User</button>
                    <button type='reset' className='bg-red-500 text-white p-2 rounded-md'>Reset</button>
                </div>
            </form>
        </div>
    );
    }

export default AddUsers;
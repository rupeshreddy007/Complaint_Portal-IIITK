import styles from "./styles.module.css";
import React from "react";
const Contact = () => {
    return (
        <div id="contact" className="flex flex-col gap-6 p-10 pt-5">
            <p className="text-4xl font-semibold text-center text-blue-900">Contact</p>
            <div
                className={`flex items-center flex-wrap justify-center gap-20`}
            >
                <div className="flex flex-col gap-2 w-72">
                    <span className="text-2xl font-semibold">Address</span>
                    <span className="text-base ">
                        Indian Institute Of Information Technology Valavoor -
                        Chakkampuzha Rd, Valavoor, Nechipuzhoor, Kerala 686635
                    </span>
                </div>
                <div className="flex flex-col gap-1.5">
                    <div className="flex flex-row items-center gap-1">
                        <div className="text-xl font-semibold ">Email:</div>
                        <div className="text-base ">admin@iiitkottayam.ac.in</div>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <div className="text-xl font-semibold ">Contact Number:</div>
                        <div className="text-base ">+91-04822 202 100</div>
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <div className="text-xl font-semibold ">Social Media:</div>
                        <div className="flex flex-row gap-3 ">
                            <a href="">
                            <img src="assests/SVGS/facebook.svg" height={35} width={35} />
                            </a>
                            <div className="border border-gray-500 " ></div>
                            <a href="">
                            <img src="assests/SVGS/instragram.svg" height={35} width={35} />
                            </a>
                            <div className="border border-gray-500 " ></div>
                            <a href="">
                            <img src="assests/SVGS/linkedan.svg" height={35} width={35} />
                            </a>
                            <div className="border border-gray-500 " ></div>
                            <a href="">
                            <img src="assests/SVGS/twitter.svg" height={35} width={35} />
                            </a>

                        </div>
                    </div>
                </div>
                <div>
                    <img src={'assests/IIIT-Kottayam.png'} alt="Logo" height={250} width={250}
                        style={{
                            backgroundBlendMode: "multiply",
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Contact;

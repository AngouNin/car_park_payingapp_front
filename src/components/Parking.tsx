import React from "react";
import "./index.css";
import SelectLabels from "./Rates";
import risk from "./assets/Risk.gif";
import ColorCheckboxes from "./Checkbox";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
// import { useHistory } from 'react-router-dom';

interface ChildProps {
  sendDataToParent: (data: string) => void;
  displayPayingTab: (data: boolean) => void;
}
const Parking: React.FC<ChildProps> = ({ sendDataToParent, displayPayingTab}) => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [isChecked, setIsChecked] = useState(false);
  const [licensePlate, setLicensePlate] = useState<string>(() => { 
    // Retrieve the input value from localStorage on component mount 
    return localStorage.getItem('licensePlate') || ''; 
  }); 

  
  // const history = useHistory(); // Get the history object from react-router-dom


  const sendDataToParentOnClick = () => {
    const data = "paying";
    sendDataToParent(data);
  };
  useEffect(() => {
    const getCurrentTime = (): string => {
      const now = new Date();
      return now.toLocaleTimeString();
    };

    const calculateEndTime = (time: string): string => {
      const current = new Date();
      const endTime = new Date(current.getTime() + 3 * 60 * 60 * 1000); // Adding 3 hours
      return endTime.toLocaleTimeString();
    };

    setCurrentTime(getCurrentTime());
    setEndTime(calculateEndTime(currentTime));
  }, []);

  const handleCheckboxChange = (isChecked: boolean) => {
    setIsChecked(isChecked);
  };


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    // setLicensePlate(value);
    // Check if the input field is not empty

    if (value === '') {
      // Allow entering space key when licensePlate is empty
      setLicensePlate(' ');
      // setIsChecked(false); // Disable the Pay Now button
      displayPayingTab(false); // Deactivate the Paying tab
    } else {
    if (value !== '') {
      setLicensePlate(value);
      // setIsChecked(true); // Enable the Pay Now button 
      displayPayingTab(true); // Activate the Paying tab
    } else {
      setLicensePlate(''); // Clear the license plate value
      // setIsChecked(false); // Disable the Pay Now button
      displayPayingTab(false); // Deactivate the Paying tab
    }}
  };

  // const handleUnload = () => {
  //   localStorage.removeItem('licensePlate');
  // };

  // useEffect(() => {
  //   window.addEventListener('beforeunload', handleUnload);
  //   window.addEventListener('unload', handleUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleUnload);
  //     window.removeEventListener('unload', handleUnload);
  //   };
  // }, []);
  

  return (
    <div className="payment w-full flex flex-col h-screen">
      <div className="flex flex-row justify-between">
        <div className="text-[#091C62] p-1 text-2xl">License Plate *</div>
        <form className="license-plate ml-20" action="/action_page.php">
          <input
            type="text"
            className="input-placeholder"
            placeholder="License Plate"
            name="search"
            required  
            value={licensePlate}
            onChange={handleInputChange}
          ></input>
        </form>
      </div>
      <div className="flex flex-row justify-between my-4">
        <div className="text-[#091C62] p-1 text-2xl">Rates</div>
        <div className="">
          <SelectLabels />
        </div>
      </div>
      <div className="flex flex-col mt-3 risk-area self-center items-center w-full">
        <div className="flex flex-row ">
          <div className="mr-5">
            <img src={risk} alt="Risk" className="risk-img"></img>
          </div>
          <p className="text-2xl text-[#091C62]">
            Disclaimer ― Park at Your Own Risk
          </p>
        </div>
        <div className="text-[20px] text-[#091C62] mt-4">
          {" "}
          This facility and or its agents are not responsible for any loss or
          damage which might be sustained by any vehicles while on this
          premises. Vehicles parked here are done so at vehicle owner’s own
          risk.{" "}
        </div>
      </div>
      <div className="flex mt-4 items-center">
        <div className="">
          <ColorCheckboxes onCheckboxChange={handleCheckboxChange}/>
        </div>
        <p className="text-[#091C62] font-bold mx-5">
          I accept the Terms of Service*
        </p>
      </div>
      <div className="flex flex-row w-full justify-around">
        <div className=" ">
          <p className="text-[#091C62] text-left font-bold mx-2 my-3">
            Parking Time
          </p>
          <div className="flex bg-[#F5F5F5] w-72 h-10 justify-center items-center border">
            <p className="text-[#FA551D]  mx-5">{`${currentTime} - ${endTime}`}</p>
          </div>
        </div>
        <div className=" ">
          <p className="text-[#091C62] text-left font-bold mx-2 my-3">
            Parking Price
          </p>
          <div className="flex bg-[#F5F5F5] w-72 h-10 justify-center items-center border">
            <p className="text-[#FA551D] font-[400] mx-5">$15</p>
          </div>
        </div>
      </div>
      <div className="mt-8 text-white w-full">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FA551D",
            "&:hover": {
              backgroundColor: "#FA551D", // Optional: Changes the background color on hover to a darker red
            },
            color: "white",
            fontSize: "20px",
            borderRadius: "10px",
            width: "100%",
          }}
          onClick={isChecked ? sendDataToParentOnClick : undefined}
          disabled={!isChecked}
        >
          Pay Now
        </Button>
      </div>
      <div className="parking-footer flex flex-col self-center ">
        <div className="text-1xl mt-12">
          © 2024 CityParkLot. All rights reserved.
        </div>
        <div className="footer-link flex self-center">
          <a href="/" className="text-1xl text-[#091C62] mx-2 underline my-1">
            Terms of Service
          </a>
          <a href="/" className="text-1xl text-[#091C62] mx-2 underline my-1">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default Parking;

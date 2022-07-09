import React, { useEffect, useState } from "react";
import { CloseIcon } from "@chakra-ui/icons";

const UpdateVolunteerForm = params => {

  type UserInfo = {
    emailAddress: string,
    fullName: string,
    discordTag: string,
    orgEmail: string,
    department_division: string,
  };

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [emailAddress, setEmail] = useState<string>("");
  const [fullName, setName] = useState<string>("");
  const [discordTag, setTag] = useState<string>("");
  const [orgEmail, setOrgEmail] = useState<string>("");
  const [department_division, setDepartmentDivision] = useState<string>("");

  useEffect(() => {
   params.getUser(params.updateUserID).then((result:any) => {
       setUserInfo(result)
   })
  }, [])

  useEffect(() => {
    if (userInfo?.emailAddress != null) {
        setEmail(userInfo.emailAddress)
    }
    if (userInfo?.fullName != null) {
        setName(userInfo.fullName)
    }
    if (userInfo?.discordTag != null) {
        setTag(userInfo.discordTag)
    }
    if (userInfo?.orgEmail != null) {
        setOrgEmail(userInfo.orgEmail)
    }
    if (userInfo?.department_division != null) {
        setDepartmentDivision(userInfo.department_division)
    }
  }, [userInfo]);

  const submit = (e: Event) => {
    e.preventDefault();
      const req_data = {
        fullName: fullName,
        discordTag: discordTag,
        emailAddress: emailAddress,
        orgEmail: orgEmail,
        department_division: department_division,
      }
      params.updateUser(req_data);
  }

  return (
    <div className="w-screen h-screen fixed left-0 top-0 bg-purple-400 flex-col">
        <div
            className="absolute right-4 top-4 p-2 rounded-xl text-white border-2 border-gray-200 hover:bg-gray-200 hover:border-purple-400 hover:text-purple-400"
            onClick={() => params.setVisible(false)}
        >
            <CloseIcon/>
        </div>
        <form
            className=" flex flex-col items-center justify-center h-full"
            onSubmit={submit}
        >
        <div className="w-1/2 h-1/2 border-white border-2 p-4 rounded-md my-2 flex flex-col justify-center">
            <span className="text-3xl block text-center text-yellow-200">
                Edit Volunteer
            </span>
            <div className="grid grid-flow-row grid-rows-5 justify-center items-center w-full gap-y-6">
            <div className="flex flex-row items-center w-full justify-center">
                <label className="text-white text-2xl">Email</label>
                <input
                value={emailAddress}
                className="p-1 rounded-md w-full ml-4 "
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-2 w-full">
                <div className="w-full col-span-1 text-lg flex flex-row items-center">
                <label className="text-white text-xl">Discord</label>
                <input
                    value={discordTag}
                    className="p-1 rounded-md text-md w-full mx-2"
                    onChange={(e) => setTag(e.target.value)}
                />
                </div>
                <div className="w-full col-span-1 text-lg flex flex-row items-center">
                <label className="text-white text-xl">Name</label>
                <input
                    value={fullName}
                    className="p-1 rounded-md text-md w-full mx-2"
                    onChange={(e) => setName(e.target.value)}
                />
                </div>
            </div>
            <div className="flex flex-row items-center w-full justify-center">
                <label className="text-white text-2xl inline-block whitespace-nowrap">
                Organization Email
                </label>
                <input
                value={orgEmail}
                className="p-1 rounded-md text-md w-full ml-4"
                onChange={(e) => setOrgEmail(e.target.value)}
                />
            </div>
            <div className="flex flex-row items-center w-full justify-center">
                <label className="text-white text-2xl inline-block whitespace-nowrap">
                Department(s)
                </label>
                <input
                value={department_division}
                className="p-1 rounded-md text-md w-full ml-4"
                onChange={(e) => setDepartmentDivision(e.target.value)}
                />
            </div>
            <div>
                <button
                type="submit"
                className="border-2 border-white p-2 rounded-xl text-white hover:bg-white hover:text-purple-400 w-full transition-all"
                >
                Submit
                </button>
            </div>
            </div>
        </div>
        </form>
    </div>
  );
};

export default UpdateVolunteerForm;

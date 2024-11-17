import React from "react";
import profilePicture from "../../../public/resources/images/profile_pic.png";
import mailIcon from "../../icons/mail_icon.png";
import groupIcon from "../../icons/group_icon.png";
import { fetchCommittees } from "../../api/baseAPI";
import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";

const ProfileCard = () => {

  const userInfo = localStorage.getItem("autobankauth0user");
  const userObject = userInfo ? JSON.parse(userInfo) : null;

  const auth = useAuth0();
  const { getAccessTokenSilently } = auth;

  const { data, isError } = useQuery({
    queryKey: ["committees"],
    queryFn: () => fetchCommittees(getAccessTokenSilently),
  });

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  console.log(userObject);

  return (
    <div className="w-64 bg-[#669782] text-white p-8 min-h-max rounded-xl ml-10 mt-20">
      <div className="flex flex-col items-center">
        <img src={profilePicture} alt="" />
        <h2 className="text-2xl mb-2 mt-5">{userObject.name}</h2>
        <div className="flow-root my-3">
          <img src={mailIcon} alt="" className="float-left size-5 mr-2"/>
          <p className="text-sm float-right">{userObject.email}</p>
        </div>
        <div className="flow-root mb-2">
          <img src={groupIcon} alt="" className="float-left size-5 mr-2"/>
          {data && data.length ? data.map((committee: any, index: number) => {
              const capitalizedName = committee.name.charAt(0).toUpperCase() + committee.name.slice(1);
              return (
                  <span key={index}>
                      {capitalizedName}{index < data.length - 1 && ", "}
                  </span>
              );
          }) : null}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

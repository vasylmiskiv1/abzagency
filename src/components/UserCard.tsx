import { useEffect, useState } from "react";

import { isUserImageValid } from "../api/usersApi";

import defaultCover from '../assets/default-cover.jpg';

import Tooltip from "./Tooltip";

const UserCard = ({ user }: UserProps) => {
  const [isImageValid, setIsImageValid] = useState(false);

  useEffect(() => {
    isUserImageValid(user.photo, setIsImageValid);
  }, [])

  return (
    <div className="p-5 bg-white flex flex-col items-center rounded-xl xl:w-[415px] lg:w-[296px] md:w-[345px] max-sm: w-[355px]">
      <img className="rounded-full mb-5" src={isImageValid ? user.photo : defaultCover} alt="user-img" />
      <Tooltip text={user.name} />
      <p className="pt-5 pb-1 break-all">{user.position}</p>
      <Tooltip text={user.email} />
      <p className="mt-1 break-all">{user.phone}</p>
    </div>
  );
};

export default UserCard;

import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

import getToken from "../api/tokenApi";
import { getFirstUsers, getUsersChunk } from "../api/usersApi";

import Button from "../components/Button";
import User from "../components/UserCard";
import CreateUser from "./CreateUser";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<number>(2);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    setIsLoadingUsers(true);

    if (!sessionStorage.getItem("abzagency_token")) {
      getToken();
    }

    getFirstUsers(setUsers, setIsLoadingUsers, setTotalPages);
  }, []);

  const handleGetUsersChunk = () => {
    getUsersChunk(nextPage, setUsers, setNextPage, setIsLoadingUsers);
  };

  const handleGetFirstUsers = () => {
    getFirstUsers(setUsers, setIsLoadingUsers, setTotalPages);
  }

  return (
    <>
      <div id="users" className="text-center pt-36">
        <h1 className="text-5xl max-sm:px-10">Working with GET request</h1>
        {isLoadingUsers ? (
          <div className="mt-6 flex justify-center">
            <TailSpin
              height="50"
              width="50"
              color="#0891b2"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <>
            <div className="mt-12 flex flex-wrap xl:justify-between lg:gap-6 md:gap-4 justify-center max-sm: gap-6">
              {users.length ? (
                users.map((user) => <User user={user} key={user.id} />)
              ) : (
                <div className="text-2xl">User list is empty</div>
              )}
            </div>
            <div
              className={`${
                (nextPage > totalPages || !users.length) && `hidden`
              }`}
            >
              <Button
                text="Show more"
                type="button"
                onDownloadUsers={handleGetUsersChunk}
              />
            </div>
          </>
        )}
      </div>
      <CreateUser onGetUsers={handleGetFirstUsers}/>
    </>
  );
};

export default Users;

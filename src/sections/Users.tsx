import { useEffect, useState } from "react";

import { getToken } from "../api/tokenApi";
import { getFirstUsers, getUsersChunk } from "../api/usersApi";

import Button from "../components/Button";
import Spinner from "../components/Spinner";
import User from "../components/UserCard";
import CreateUser from "./CreateUser";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<number>(2);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    if (!sessionStorage.getItem("abzagency_token")) {
      getToken();
    }

    getFirstUsers(setUsers, setIsLoadingUsers, setTotalPages);
  }, []);

  const handleUpdateFirstUsers = () => {
    getFirstUsers(setUsers, setIsLoadingUsers, setTotalPages);
  };

  const handleGetUsersChunk = () => {
    getUsersChunk(nextPage, setUsers, setNextPage, setIsLoadingUsers);
  };

  return (
    <>
      <div id="users" className="relative text-center pt-36">
        <h1 className="text-5xl max-sm:px-10">Working with GET request</h1>
        {isLoadingUsers && <Spinner usersLength={users.length} />}
        <div className="mt-12 flex flex-wrap xl:justify-between lg:gap-6 md:gap-4 justify-center max-sm: gap-6">
          {users.length
            ? users.map((user) => <User user={user} key={user.id} />)
            : null}
          {!users.length && !isLoadingUsers && (
            <div className="text-2xl">User list is empty</div>
          )}
        </div>
        {users.length && nextPage !== totalPages ? (
          <Button
            text="Show more"
            type="button"
            onDownloadUsers={handleGetUsersChunk}
          />
        ) : null}
      </div>
      <CreateUser onUpdateUsers={handleUpdateFirstUsers} />
    </>
  );
};

export default Users;

export const getFirstUsers = (
  setUsers: any,
  setIsLoadingUsers: any,
  setTotalPages: any
) => {
  fetch(
    `${process.env.REACT_APP_USERS_API_URL}?page=1&count=${process.env.REACT_APP_USERS_QUANTITY}`
  )
    .then((response) => response.json())
    .then((data) => {
      setUsers(data.users);
      setTotalPages(data.total_pages);
    })
    .catch((error) => console.log(error))
    .finally(() => setIsLoadingUsers(false));
};

export const getUsersChunk = (
  page: any,
  setUsers: any,
  setCurrentPage: any,
  setIsLoadingUsers: any
) => {
  fetch(
    `${process.env.REACT_APP_USERS_API_URL}?page=${page}&count=${process.env.REACT_APP_USERS_QUANTITY}`
  )
    .then((response) => response.json())
    .then((data) => {
      setUsers((users: any) => [...users, ...data.users]);
      setCurrentPage((currentPage: any) => currentPage + 1);
    })
    .catch((error) => console.log(error))
    .finally(() => setIsLoadingUsers(false));
};

export const getFirstUsers = (
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  setIsLoadingUsers: React.Dispatch<React.SetStateAction<boolean>>,
  setTotalPages: React.Dispatch<React.SetStateAction<number>>
) => {
  setIsLoadingUsers(true);

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
  page: number,
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  setIsLoadingUsers: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLoadingUsers(true);

  fetch(
    `${process.env.REACT_APP_USERS_API_URL}?page=${page}&count=${process.env.REACT_APP_USERS_QUANTITY}`
  )
    .then((response) => response.json())
    .then((data) => {
      setUsers((users) => [...users, ...data.users]);
      setCurrentPage((page: number) => page + 1);
    })
    .catch((error) => console.log(error))
    .finally(() => setIsLoadingUsers(false));
};

export const addUser = (
  formData: FormData,
  setIsShowedSuccess: React.Dispatch<React.SetStateAction<boolean>>,
  setImage: React.Dispatch<React.SetStateAction<ImageFile | null | undefined>>,
  setIsShowedLoader: React.Dispatch<React.SetStateAction<boolean>>,
  resetForm: () => void,
  onUpdateUsers: () => void
) => {
  fetch(`${process.env.REACT_APP_USERS_API_URL}`, {
    method: "POST",
    headers: {
      Token: sessionStorage.getItem("abzagency_token") || "",
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        setIsShowedSuccess(true);
        onUpdateUsers();
        resetForm();
        setImage(null);
      }
    })
    .finally(() => {
      setIsShowedLoader(false);
    })
    .catch((e) => console.log(e));
};

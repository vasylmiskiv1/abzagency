const getToken = () => {
  fetch(`${process.env.REACT_APP_TOKEN_API_URL}`)
    .then((response) => response.json())
    .then((tokenData) =>
      sessionStorage.setItem("abzagency_token", tokenData.token)
    );
};

export default getToken;
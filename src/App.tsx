import Greeting from "./sections/Greeting";

import Header from "./components/Header";
import PageContainer from "./containers/pageContainer";
import Users from "./sections/Users";

import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Header />
      <PageContainer>
        <Greeting />
        <Users />
      </PageContainer>
      <ToastContainer />
    </>
  );
};

export default App;

import Greeting from "./sections/Greeting";

import Header from "./components/Header";
import PageContainer from "./containers/pageContainer";
import Users from "./sections/Users";

const App = () => {
  return (
    <>
      <Header />
      <PageContainer>
        <Greeting />
        <Users />
      </PageContainer>
    </>
  );
};

export default App;

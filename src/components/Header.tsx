import logoPath from "../assets/logo.svg";
import PageContainer from "../containers/pageContainer";
import Button from "./Button";

const Header = () => {
  return (
    <div className="text-dark bg-white lg:px-16 py-4 md:px-10 py-4 max-sm:px-4 py-2">
      <PageContainer>
        <nav className="container m-auto flex justify-between">
          <div>
            <img className="w-[120px]" src={logoPath} alt="logo" />
          </div>
          <ul className="flex items-center gap-4">
            <li>
              <Button type="link" text="Users" link="#users" />
            </li>
            <li>
              <Button type="link" text="Sign up" link="#create-user" />
            </li>
          </ul>
        </nav>
      </PageContainer>
    </div>
  );
};

export default Header;

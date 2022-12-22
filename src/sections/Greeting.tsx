import fieldImage from "../assets/field.jpeg";
import Button from "../components/Button";

const Main = () => {
  return (
    <div className="relative text-background text-center">
      <div className="absolute z-10 flex flex-col justify-center m-auto inset-x-0 xl:mt-60 lg:mt-44 lg:max-w-[420px] md:mt-24 max-w-[420px] max-sm:max-w-[345px] mt-12">
        <h1 className="text-4xl align-center">
          Test assignment for front-end developer
        </h1>
        <p className="text-lg mt-6 text-base xl:text-lg max-sm:text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, aliquip ex ea commodo consequat. Duis aute irure dolor
          in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur
        </p>
        <div className="mt-10">
          <Button type="link" text="Sign In" link="#create-user" />
        </div>
      </div>
      <img
        className="w-full brightness-50 object-cover xl:h-[870px] lg:h-[650px] md:h-[540px] sm: h-[450px]"
        src={fieldImage}
        alt="field"
      />
    </div>
  );
};

export default Main;

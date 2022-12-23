import fieldImage from "../assets/field.jpeg";
import Button from "../components/Button";

const Greeting = () => {
  return (
    <div className="relative text-background text-center">
      <div className="absolute z-10 flex flex-col justify-center m-auto inset-x-0 xl:mt-60 lg:mt-44 lg:max-w-[420px] md:mt-24 max-w-[380px] max-sm:max-w-[317px] mt-12">
        <h1 className="text-4xl align-center">
          Test assignment for front-end developer
        </h1>
        <p className="text-lg mt-6 text-base xl:text-lg max-sm:text-center">
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
        <div className="mt-10">
          <Button text="Sign In" link="#create-user" />
        </div>
      </div>
      <img
        className="w-full brightness-50 object-cover xl:h-[870px] lg:h-[650px] md:h-[540px] sm: h-[510px]"
        src={fieldImage}
        alt="field"
      />
    </div>
  );
};

export default Greeting;

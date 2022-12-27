import { TailSpin } from "react-loader-spinner";

const Spinner = ({ usersLength }: SpinnerProps) => {
  return (
    <div
      className={`mt-6 flex justify-center ${
        usersLength && `absolute inset-x-0 bottom-72`
      }`}
    >
      <TailSpin
        height="70"
        width="70"
        color="#0891b2"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  );
};

export default Spinner;

const Button = ({
  text,
  type,
  link,
  disabled,
  onSubmit,
  onDownloadUsers,
}: ButtonProps) => {
  const LinkButton = () => (
    <a
      href={link}
      className="bg-primary text-dark rounded-full hover:bg-primary-hover transition-all cursor-pointer xl:px-8 py-2 lg:px-8 py-2 md:px-6 py-2 max-sm:px-6 px-2"
    >
      {text}
    </a>
  );

  const SubmitFormButton = () => (
    <button
      type={type}
      disabled={disabled}
      onClick={onSubmit}
      className={`${
        disabled
          ? `bg-disabled text-background`
          : `bg-primary hover:bg-primary-hover transition-all cursor-pointer`
      } mt-8 m-auto text-dark px-8 py-2 rounded-full`}
    >
      {text}
    </button>
  );

  const GetUsersButton = () => (
    <button
      type={type}
      disabled={disabled}
      onClick={onDownloadUsers}
      className={`${
        disabled
          ? `bg-disabled`
          : `bg-primary hover:bg-primary-hover transition-all cursor-pointer`
      } mt-14 m-auto text-dark px-8 py-2 rounded-full`}
    >
      {text}
    </button>
  );

  return (
    <>
      {type === "submit" && <SubmitFormButton />}
      {type === "button" && <GetUsersButton />}
      {!type && <LinkButton />}
    </>
  );
};

export default Button;

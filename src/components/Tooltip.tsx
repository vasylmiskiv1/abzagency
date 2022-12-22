const Tooltip = ({ text }: TooltipProps): JSX.Element => {
  return (
    <div className="w-full group relative inline-block">
      <p className="w-full break-all text-ellipsis whitespace-nowrap overflow-hidden cursor-pointer">
        {text}
      </p>
      <span
        className="invisible mt-4 group-hover:visible opacity-0
       group-hover:opacity-100 transition bg-black rounded-md text-white whitespace-nowrap px-4 py-2
       absolute"
      >
        {text}
      </span>
    </div>
  );
};

export default Tooltip;

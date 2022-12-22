interface ContainerProps {
  children: React.ReactNode;
}

const pageContainer = ({ children }: ContainerProps) => {
  return <div className="container m-auto xl:px-28">{children}</div>;
};

export default pageContainer;

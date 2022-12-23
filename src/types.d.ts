interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: number;
  photo: string;
}

interface PositionFromServer {
  id: number;
  name: string;
}
interface FormikValues {
    name: string;
    email: string,
    phone: string,
    position: string,
    photo: string,
}

interface ImageFile extends File {
  lastModified: number;
}

type UserProps = {
  user: User;
}

type TooltipProps = {
  text: string;
}

type CreateUserProps = {
  onGetUsers: () => void;
}

type ButtonProps = {
  text: string;
  type?: "submit" | "button";
  link?: string;
  disabled?: boolean;
  onSubmit?: (e: React.FormEvent) => void;
  onDownloadUsers?: () => void;
}

type ContainerProps = {
  children: React.ReactNode;
}

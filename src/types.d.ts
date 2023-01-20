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

interface PositionToUpdate extends PositionFromServer {
  isChecked: boolean;
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

type ContainerProps = {
  children: React.ReactNode;
}

type UserProps = {
  user: User;
}

type TooltipProps = {
  text: string;
}

type CreateUserProps = {
  onUpdateUsers: () => void;
}

type ButtonProps = {
  text: string;
  type?: "submit" | "button";
  link?: string;
  disabled?: boolean;
  onSubmit?: (e: React.FormEvent) => void;
  onDownloadUsers?: () => void;
}

type SpinnerProps = {
  usersLength: number;
}


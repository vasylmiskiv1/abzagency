interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: number;
  photo: string;
}

type UserProps = {
  user: User;
}

type TooltipProps = {
  text: string;
}
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: number;
  photo: string;
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
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface Props {
  isActive?: boolean;
  Icon: IconType;
  linkTo: string;
  name: string;
  children?: React.ReactNode;
  className?: string;
}

const SidebarTile = ({ isActive = false, Icon, linkTo, name, children, className }: Props) => {
  return (
    <>
      <Link
        to={linkTo}
        relative="path"
        className={`${
          isActive ? "bg-purple-100" : ""
        } flex flex-row gap-2 items-center hover:bg-purple-100 py-3 px-4 transition-colors duration-200 ease-in-out rounded-lg ${className}`}
      >
        <Icon className="text-2xl" />
        <p className="font-normal">{name}</p>
      </Link>

      {children && children}
    </>
  );
};

export default SidebarTile;

import { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface Props {
  isActive?: boolean;
  Icon: IconType;
  name: string;
}

const SidebarTile = ({ isActive = false, Icon, name }: Props) => {
  const linkPath = name.toLowerCase().split(" ").join("-");

  return (
    <Link
      to={`./${linkPath}`}
      relative="path"
      className={`${
        isActive ? "bg-purple-100" : "bg-white"
      } flex flex-row gap-2 items-center hover:bg-purple-100 py-3 px-4`}
    >
      <Icon className="text-2xl" />
      <p className="font-normal">{name}</p>
    </Link>
  );
};

export default SidebarTile;

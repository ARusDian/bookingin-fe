import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  linkBack?: string;
}

const FormHead = ({title, linkBack}: Props) => {
  return (
    <div className="flex max-w-2xl justify-between mx-auto items-center relative">
      <Link
        to={linkBack ?? ".."}
        relative="path"
        className="absolute flex items-center gap-2 font-roboto hover:text-purple-500"
        preventScrollReset
      >
        <IoMdArrowBack className="text-xl" />
        <span>Back</span>
      </Link>
      <p className="text-2xl font-semibold text-center mb-4 flex-1">{title}</p>
      <p></p>
    </div>
  );
};

export default FormHead;

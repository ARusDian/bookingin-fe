import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  linkBack?: string;
  rightSide?: React.ReactNode;
}

const FormHead = ({title, linkBack, rightSide}: Props) => {
  return (
    <div className="flex max-w-2xl justify-between mx-auto items-center relative">
      <Link
        to={linkBack ?? ".."}
        relative="path"
        className="flex items-center gap-2 font-roboto hover:text-purple-500 w-40"
        preventScrollReset
      >
        <IoMdArrowBack className="text-xl" />
        <span>Back</span>
      </Link>
      <p className="text-2xl font-semibold text-center mb-4 flex-1">{title}</p>
      <div className="w-40">
        {rightSide && rightSide}
      </div>
    </div>
  );
};

export default FormHead;

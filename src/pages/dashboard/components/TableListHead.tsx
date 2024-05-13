import { IoMdAdd, IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

interface Props {
  linkTo: string;
  title: string;
  button?: {
    linkTo: string;
    text: string;
  };
}

const TableListHead = ({ linkTo, title, button }: Props) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <Link
          to={linkTo}
          relative="path"
          className="text-2xl font-medium flex items-center gap-2 hover:text-purple-800"
        >
          <IoMdArrowBack />
          {title}
        </Link>
        {button ? (
          <Link
            to={button.linkTo}
            relative="path"
            className="flex items-center space-x-1 bg-purple-200 font-medium px-4 py-2 rounded-lg hover:bg-purple-300"
          >
            <IoMdAdd className="text-xl" />
            <span>{button.text}</span>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default TableListHead;

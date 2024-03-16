import FormModal from "@pages/dashboard/components/FormModal";
interface Props {
  open: number | null;
  onClose: () => void;
  deleteHandler: () => void;
  state: {
    id: number;
    name: string;
    isLoading: boolean;
  };
  cancel?: () => void;
}

const DeleteFromTable = ({
  open,
  onClose,
  state,
  cancel,
  deleteHandler,
}: Props) => {
  return (
    <FormModal open={!!open} onClose={onClose}>
      <div className="flex flex-col space-y-4 w-96">
        <p className="text-lg font-medium">
          Are you sure want to delete {state.name} with id {state.id}?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={cancel ?? onClose}
            className="px-4 py-2 bg-red-200 font-medium items-center space-x-1 rounded-lg hover:bg-red-300"
          >
            No
          </button>
          <button
            disabled={state.isLoading}
            onClick={deleteHandler}
            className="px-4 py-2 bg-green-200 font-medium items-center space-x-1 rounded-lg hover:bg-green-300"
          >
            Yes
          </button>
        </div>
      </div>
    </FormModal>
  );
};

export default DeleteFromTable;

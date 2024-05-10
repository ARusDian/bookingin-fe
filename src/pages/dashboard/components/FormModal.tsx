import { Modal, ModalProps } from "@mui/material";

type FormModalProps<T> = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  data?: T;
} & ModalProps;

function FormModal<T>({
  open,
  onClose,
  children,
  ...props
}: FormModalProps<T>) {
  return (
    <Modal open={open} onClose={onClose} {...props} className="">
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-4 rounded-lg mx-auto">
        {children}
      </div>
    </Modal>
  );
}

export default FormModal;

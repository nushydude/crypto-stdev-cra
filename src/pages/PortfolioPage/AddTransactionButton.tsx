import { useState } from 'react';
import Modal from '../../components/Modal';
import AddTransactionForm from '../../containers/AddTransactionForm';

interface Props {
  onSuccess?: () => void;
}

const AddTransactionButton = ({ onSuccess }: Props) => {
  const [isModalDisplayed, setIsModalDisplayed] = useState(false);

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        type="button"
        onClick={() => setIsModalDisplayed(true)}
      >
        Add transaction
      </button>

      {isModalDisplayed && (
        <Modal onClose={() => setIsModalDisplayed(false)}>
          <div className="max-w-4xl mx-auto">
            <AddTransactionForm
              onSuccess={() => {
                setIsModalDisplayed(false);
                onSuccess && onSuccess();
              }}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default AddTransactionButton;

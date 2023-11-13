import AddTransactionFormComp, {
  SubmitValues,
} from '../components/AddTransactionForm';
import { config } from '../config';
import useUser from '../hooks/useUser';
import { fetchWithToken } from '../utils/fetchWithToken';

interface Props {
  onSuccess?: () => void;
}

const AddTransactionForm = ({ onSuccess }: Props) => {
  const { accessToken, setAccessToken, fetchAccessToken } = useUser();

  const handleSubmit = async (values: SubmitValues) => {
    if (accessToken) {
      await fetchWithToken({
        url: `${config.API_URI}/api/transactions`,
        options: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            transaction: values,
          }),
        },
        accessToken,
        refreshAccessToken: fetchAccessToken,
        setAccessToken,
      });

      onSuccess && onSuccess();
    }
  };

  return <AddTransactionFormComp onSubmit={handleSubmit} />;
};

export default AddTransactionForm;

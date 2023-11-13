import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { config } from '../../config';
import useUser from '../../hooks/useUser';
import { fetchWithToken } from '../../utils/fetchWithToken';
import { formatCurrency } from '../../utils/formatCuyrrency';
import AddTransactionButton from './AddTransactionButton';

const Transactions = () => {
  const { accessToken, setAccessToken, fetchAccessToken } = useUser();
  const [transactions, setTransactions] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchTransactions = useCallback(() => {
    fetchWithToken({
      url: `${config.API_URI}/api/transactions`,
      options: {
        method: 'GET',
      },
      accessToken,
      refreshAccessToken: fetchAccessToken,
      setAccessToken,
    })
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        setIsLoading(false);
      })
      .catch((err) => setErrorMessage(err.message));
  }, [accessToken, fetchAccessToken, setAccessToken]);

  useEffect(() => {
    if (accessToken) {
      fetchTransactions();
    }
  }, [accessToken, fetchAccessToken, setAccessToken, fetchTransactions]);

  return (
    <div>
      <AddTransactionButton onSuccess={() => fetchTransactions()} />

      {isLoading && <div>Loading...</div>}

      {errorMessage && <div className="text-red-100">{errorMessage}</div>}

      {!isLoading && !errorMessage && (
        <>
          <div className="grid grid-cols-4 border-b-2">
            <div className="font-bold">Date/Time</div>
            <div className="font-bold">Coin</div>
            <div className="font-bold"># Coins</div>
            <div className="font-bold">Total</div>
          </div>
          {transactions.map((transaction) => (
            <div key={transaction.id} className="grid grid-cols-4">
              <div>
                {format(new Date(transaction.timestamp), 'yyyy-MM-dd HH:mm')}
              </div>
              <div>{transaction.coin}</div>
              <div>{transaction.numCoins}</div>
              <div>
                {formatCurrency(
                  transaction.totalAmountPaid,
                  transaction.currency,
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Transactions;

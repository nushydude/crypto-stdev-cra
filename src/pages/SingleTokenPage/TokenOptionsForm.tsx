import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FieldValues } from './types';
import { TokensSelector } from '../../components/TokensSelector';
import HistoricalSelectedPairs from './HistoricalSelectedPairs';

type Props = {
  defaultValues: Partial<FieldValues>;
  allowSubmission: boolean;
  onSubmit: (fieldValues: FieldValues) => void;
  onValueChange: (value: Partial<FieldValues>) => void;
  historicalPairs: string[];
  removePair: (pair: string) => void;
};

export const TokenOptionsForm = ({
  defaultValues,
  allowSubmission = true,
  onSubmit,
  onValueChange,
  historicalPairs,
  removePair,
}: Props) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FieldValues>({ defaultValues });

  // Subscribe to form value changes
  useEffect(() => {
    const subscription = watch(onValueChange);
    return () => subscription.unsubscribe();
  }, [watch, onValueChange]);

  const handleClickOnPair = (symbol: string) => {
    const currentValues = getValues();
    const nextValues = { ...currentValues, symbol };

    // This should call onValueChange as well because of the above subscription.
    setValue('symbol', symbol);

    onSubmit(nextValues);
  };

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data))}
      data-testid="form-symbol-interval-limit"
      className="grid gap-2 grid-cols-1 mb-4"
    >
      <div className="mb-2 md:mb-4">
        <label htmlFor="symbol" className="mb-1 block">
          Symbol
        </label>
        <Controller
          control={control}
          name="symbol"
          render={({ field: { onChange, value } }) => (
            <TokensSelector selectedValue={value} onChange={onChange} />
          )}
        />

        {errors.symbol && (
          <p className="text-red-400 text-sm">This field is required</p>
        )}
      </div>

      <div className="mb-2 md:mb-4">
        <HistoricalSelectedPairs
          selectedPairs={historicalPairs}
          onPairClick={handleClickOnPair}
          removePair={removePair}
        />
      </div>

      <div className="mb-2 md:mb-4">
        <label htmlFor="interval" className="mb-1 block">
          Interval
        </label>
        <div className="relative">
          <select
            data-testid="input-interval"
            className="appearance-none w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            {...register('interval', { required: true })}
          >
            <option value="15m">15 minutes</option>
            <option value="1h">1 hour</option>
            <option value="4h">4 hours</option>
            <option value="1d">1 day</option>
            <option value="1w">1 week</option>
            <option value="1m">1 month</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-blue-500">
            ▼
          </div>
        </div>

        {errors.interval && (
          <p className="text-red-400 text-sm">This field is required</p>
        )}
      </div>

      <div className="mb-2 md:mb-4">
        <label htmlFor="limit" className="mb-1 block">
          Limit
        </label>
        <input
          data-testid="input-limit"
          id="limit"
          type="number"
          className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          {...register('limit', { required: true })}
        />
        {errors.limit && (
          <p className="text-red-400 text-sm">This field is required</p>
        )}
      </div>

      <button
        data-testid="submit-button"
        type="submit"
        disabled={!allowSubmission}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

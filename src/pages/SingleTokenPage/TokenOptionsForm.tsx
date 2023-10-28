import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FieldValues } from './types';
import { Form, FormGroup } from './TokenOptionsForm.styles';
import { TokensSelector } from '../../components/TokensSelector';

type Props = {
  defaultValues: Partial<FieldValues>;
  allowSubmission: boolean;
  onSubmit: (fieldValues: FieldValues) => void;
  onValueChange: (value: Partial<FieldValues>) => void;
};

export const TokenOptionsForm = ({
  defaultValues,
  allowSubmission = true,
  onSubmit,
  onValueChange,
}: Props) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues });

  useEffect(() => {
    const subscription = watch(onValueChange);
    return () => subscription.unsubscribe();
  }, [watch, onValueChange]);

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="form-symbol-interval-limit"
    >
      <FormGroup>
        <label htmlFor="symbol">Symbol</label>
        <Controller
          control={control}
          name="symbol"
          render={({ field: { onChange, value } }) => (
            <TokensSelector selectedValue={value} onChange={onChange} />
          )}
        />

        {errors.symbol && <p>This field is required</p>}
      </FormGroup>

      <FormGroup>
        <label htmlFor="interval">Interval</label>
        <select
          data-testid="input-interval"
          {...register('interval', { required: true })}
        >
          <option value="15m">15 minutes</option>
          <option value="1h">1 hour</option>
          <option value="4h">4 hours</option>
          <option value="1d">1 day</option>
          <option value="1w">1 week</option>
          <option value="1m">1 month</option>
        </select>

        {errors.interval && <p>This field is required</p>}
      </FormGroup>

      <FormGroup>
        <label htmlFor="limit">Limit</label>
        <input
          data-testid="input-limit"
          id="limit"
          type="number"
          {...register('limit', { required: true })}
        />
        {errors.limit && <p>This field is required</p>}
      </FormGroup>

      <button
        data-testid="submit-button"
        type="submit"
        disabled={!allowSubmission}
      >
        Submit
      </button>
    </Form>
  );
};

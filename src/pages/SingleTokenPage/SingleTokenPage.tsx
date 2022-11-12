import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import qs from "query-string";
import { RouteComponentProps, useLocation, useHistory } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { KLineChart } from "../../components/KLineChart";
import { Chart as ChartJS, registerables } from "chart.js";
import { calculateStandardDeviation } from "../../utils/calculateStandardDeviation";
import { calculateMean } from "../../utils/calculateMean";
import { Interval } from "../../types/interval";
import { FETCH_STATUS } from "../../consts/FetchStatus";
import { useBinanceKLine } from "../../hooks/useBinanceKline";
import { DCAInfo } from "../../components/DCAInfo";
ChartJS.register(...registerables);

const Container = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 10px 10px 20px;
`;

const DataContainer = styled.div`
  padding: 10px;
  border: 1px solid babyblue;
  background: azure;
  flex-grow: 1;
`;

const Form = styled.form`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 1fr;
  margin-bottom: 20px;

  p {
    margin: 0;
  }

  label {
    display: block;
    margin-bottom: 4px;
  }

  input {
    width: 300px;
    padding: 10px;

    @media (max-width: 690px) {
      width: 100%;
    }
  }

  button {
    padding: 10px;
    width: 300px;

    @media (max-width: 690px) {
      width: 100%;
    }
  }
`;

const Heading = styled.h1`
  margin-bottom: 16px;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
`;

type FieldValues = {
  symbol: string;
  interval: Interval;
  limit: number;
};

type KLineData = {
  openTime: string;
  openPrice: number;
  volume: number;
};

const getDefaults = (parsed: qs.ParsedQuery<string>): FieldValues => {
  let symbol = "BTCBUSD";
  let interval: Interval = "4h";
  let limit = 100;

  if (typeof parsed.symbol === "string") {
    symbol = parsed.symbol;
  }

  if (typeof parsed.interval === "string") {
    interval = parsed.interval as Interval;
  }

  if (typeof parsed.limit === "string") {
    limit = parseInt(parsed.limit);
  }

  return { symbol, interval, limit };
};

interface Props extends RouteComponentProps {}

export const SingleTokenPage: React.FC<Props> = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: getDefaults(qs.parse(window.location.search)),
  });

  const { data, fetchStatus, refetch } = useBinanceKLine([
    getDefaults(qs.parse(window.location.search)),
  ]);

  const onSubmit = (data: FieldValues) => {
    refetch([data]);
  };

  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    const subscription = watch((value) => {
      const newValues = { ...value } as Record<string, string>;
      const params = new URLSearchParams(newValues);
      history.replace({
        pathname: location.pathname,
        search: params.toString(),
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, history, location.pathname]);

  const klineData: Array<KLineData> = data.length > 0 ? data[0].klineData : [];
  const prices = klineData.map((d) => d.openPrice);
  const standardDeviation = calculateStandardDeviation(prices);
  const mean = calculateMean(prices);
  const targetPrice = mean - standardDeviation;
  const avgPrice = data.length > 0 ? data[0].avgPrice : 0;
  const shouldDCA = avgPrice < targetPrice;

  return (
    <Container>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        data-testid="form-symbol-interval-limit"
      >
        <FormGroup>
          <label htmlFor="symbol">Symbol</label>
          <input
            data-testid="input-symbol"
            id="symbol"
            {...register("symbol", { required: true })}
          />
          {errors.symbol && <p>This field is required</p>}
        </FormGroup>

        <FormGroup>
          <label htmlFor="interval">Interval</label>
          <input
            data-testid="input-interval"
            id="interval"
            {...register("interval", { required: true })}
          />
          {errors.interval && <p>This field is required</p>}
        </FormGroup>

        <FormGroup>
          <label htmlFor="limit">Limit</label>
          <input
            data-testid="input-limit"
            id="limit"
            type="number"
            {...register("limit", { required: true })}
          />
          {errors.limit && <p>This field is required</p>}
        </FormGroup>

        <button
          data-testid="submit-button"
          type="submit"
          disabled={fetchStatus === FETCH_STATUS.fetching}
        >
          Submit
        </button>
      </Form>

      {/* Display the results and graph */}
      <DataContainer data-testid="data-container">
        <Heading>Result:</Heading>
        {fetchStatus === FETCH_STATUS.success && (
          <>
            {/* <p>Standard Deviation = USD {standardDeviation.toFixed(2)}</p>
            <p>Mean = USD {mean.toFixed(2)}</p> */}
            <DCAInfo
              targetPrice={targetPrice}
              avgPrice={avgPrice}
              shouldDCA={shouldDCA}
            />
            <KLineChart data={klineData} mean={avgPrice} />
          </>
        )}
        {fetchStatus === FETCH_STATUS.fetching && (
          <LoadingWrapper>
            <BeatLoader />
          </LoadingWrapper>
        )}
        {fetchStatus === FETCH_STATUS.idle && (
          <p>Click submit to fetch latest kline data.</p>
        )}
        {fetchStatus === FETCH_STATUS.error && (
          <p>An error occurred while fetching kline data.</p>
        )}
      </DataContainer>
    </Container>
  );
};

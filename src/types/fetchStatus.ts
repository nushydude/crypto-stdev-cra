import { FETCH_STATUS } from '../consts/FetchStatus';

export type FetchStatus = (typeof FETCH_STATUS)[keyof typeof FETCH_STATUS];

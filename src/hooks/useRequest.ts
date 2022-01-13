import { message } from 'antd';
import { AxiosError, AxiosResponse } from "axios"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useMountedState } from "react-use"
import { standardErrorHandler, unauthorizedHandler, SUCCESS as s, UNAUTHORIZED as u } from '../utils/request';

export type Schema<S> = (v?: S) => S
export type FuncReturnPromise<S> = (...args: any[]) => Promise<AxiosResponse<standard.PartialResponse<S>>>

export const SUCCESS = s

export const UNAUTHORIZED = u

export const useRequest = <S, T extends FuncReturnPromise<S>>(fn: T, schema: Schema<S>, showTips = true, auth = true ): [T, S, boolean, Error | undefined] => {
  const initialValue = useMemo(() => schema(), [schema]);
  const isMounted = useMountedState();
  const lastCallId = useRef(0);

  const [axiosRes, setAxiosRes] = useState<AxiosResponse<standard.PartialResponse<S>> | undefined>(undefined);
  const [axiosError, setAxiosError] = useState<AxiosError | undefined>(undefined);
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  const error = useMemo(() => standardErrorHandler(axiosError, axiosRes), [axiosError, axiosRes]);

  const callback = useCallback((...args: Parameters<T>) => {
    const callId = ++lastCallId.current;
    setLoading(true);

    return fn(...args).then((res) => {
      // console.log('res', res)
      const value = schema(res.data.data);

      if (isMounted() && callId === lastCallId.current) {
        setValue(value);
        setLoading(false);
        setAxiosRes(res);
      }

      return res;
    }).catch((error: AxiosError) => {
      // console.log('error', error)
      if (isMounted() && callId === lastCallId.current) {
        setLoading(false);
        setAxiosError(error)
      }

      return error;
    })
  }, [schema, fn, isMounted]);

  useEffect(() => {
    if (error) {
      showTips && message.error(error.message);
      setAxiosError(undefined)
    }
  }, [error, showTips])

  useEffect(() => {
    auth && unauthorizedHandler(axiosError);
  }, [axiosError, axiosError?.response?.status, auth]);

  return [callback as T, value, loading, error];
}

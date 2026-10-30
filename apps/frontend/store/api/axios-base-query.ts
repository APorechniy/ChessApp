import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosRequestConfig } from 'axios'
import { api } from '../../network/instance'

export type AxiosBaseQueryError = {
  status?: number
  data?: unknown
  message: string
}

type AxiosBaseQueryArgs = {
  url: string
  method?: AxiosRequestConfig['method']
  body?: unknown
  params?: AxiosRequestConfig['params']
  headers?: AxiosRequestConfig['headers']
}

export const axiosBaseQuery: BaseQueryFn<AxiosBaseQueryArgs, unknown, AxiosBaseQueryError> =
  async ({ url, method = 'GET', body, params, headers }) => {
    try {
      const result = await api({ url, method, data: body, params, headers })
      return { data: result.data }
    } catch (err) {
      const e = err as AxiosBaseQueryError

      return { error: { status: e.status, data: e.data, message: e.message ?? 'Request failed' } }
    }
  }
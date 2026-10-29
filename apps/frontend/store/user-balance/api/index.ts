import { baseApi } from '../../api/base-api'

type GetUserBalanceResponse = { balance: number; }

export const userBalanceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserBalance: builder.query<GetUserBalanceResponse, void>({
            query: (params) => ({
                url: '/balance/',
                params: params ?? undefined,
            }),
            providesTags: ["UserBalance"]
        })
    }),
})

export const {
    useGetUserBalanceQuery,
    useLazyGetUserBalanceQuery
} = userBalanceApi
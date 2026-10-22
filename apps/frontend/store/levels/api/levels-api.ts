import { baseApi } from '../../api/base-api'
import type { Level } from '../types'

type GetLevelsResponse = { levelsList: Level[] }

export const levelsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getLevels: builder.query<GetLevelsResponse, void>({
            query: () => ({ url: '/levels/' }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.levelsList.map(({ id }) => ({ type: 'Levels' as const, id })),
                        { type: 'Levels' as const, id: 'LIST' },
                    ]
                    : [{ type: 'Levels' as const, id: 'LIST' }],
        }),
    }),
})

export const {
    useGetLevelsQuery,
    useLazyGetLevelsQuery
} = levelsApi
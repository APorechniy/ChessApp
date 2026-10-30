import { baseApi } from '../../api/base-api'
import type { ChessOpening, ChessOpeningWithoutId } from '../types'

type GetChessOpeningsResponse = { chessOpeningsList: ChessOpening[]; }

type CreateChessOpeningParams = {
    chessOpening: ChessOpeningWithoutId
}

type CreateChessOpeningResponse = {
    isCreatedChessOpening: boolean;
};

export const chessOpeningsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getChessOpenings: builder.query<GetChessOpeningsResponse, void>({
            query: () => ({
                url: '/chess-openings/'
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.chessOpeningsList.map(({ id }) => ({ type: 'ChessOpenings' as const, id })),
                        { type: 'ChessOpenings' as const, id: 'LIST' },
                    ]
                    : [{ type: 'ChessOpenings' as const, id: 'LIST' }],
        }),
        createChessOpening: builder.mutation<CreateChessOpeningResponse, CreateChessOpeningParams>({
            query: ({ chessOpening }) => ({
                url: '/chess-openings/',
                method: 'POST',
                body: { chessOpening },
            }),
            invalidatesTags: [{ type: 'ChessOpenings', id: 'LIST' }],
        }),
    }),
})

export const {
    useGetChessOpeningsQuery,
    useLazyGetChessOpeningsQuery,
    useCreateChessOpeningMutation
} = chessOpeningsApi
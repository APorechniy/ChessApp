import { baseApi } from '../../api/base-api'
import type { ChessGame, ChessGameWithoutId } from '../types'

type GetChessGamessResponse = { chessGamesList: ChessGame[]; }

type GetChessGamesParams = {
    chessOpeningId?: string
}

type CreateChessGameParams = {
    chessGame: ChessGameWithoutId
}

type CreateChessGameResponse = {
    isCreatedChessGame: boolean
}

export const chessGamesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getChessGames: builder.query<GetChessGamessResponse, GetChessGamesParams | void>({
            query: (params) => ({
                url: '/chess-games/',
                params: params ?? undefined,
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.chessGamesList.map(({ id }) => ({ type: 'ChessGames' as const, id })),
                        { type: 'ChessGames' as const, id: 'LIST' },
                    ]
                    : [{ type: 'ChessGames' as const, id: 'LIST' }],
        }),
        createChessGame: builder.mutation<CreateChessGameResponse, CreateChessGameParams>({
            query: ({ chessGame }) => ({
                url: '/chess-games/',
                method: 'POST',
                body: { chessGame },
            }),
            invalidatesTags: [{ type: 'ChessGames', id: 'LIST' }],
        }),
    }),
})

export const {
    useGetChessGamesQuery,
    useLazyGetChessGamesQuery,
    useCreateChessGameMutation
} = chessGamesApi
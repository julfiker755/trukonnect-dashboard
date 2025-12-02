import { tagTypes } from '@/redux/tag-types';
import { baseApi } from '../baseApi';
import { buildResponse } from '@/lib/api-response';

export const financialApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFinancial: build.query({
      query: (arg?: Record<string, any>) => ({
        url: `/admin/finance/allList`,
        method: 'GET',
        params: arg,
      }),
      providesTags: [tagTypes.a_financial],
      transformResponse: (response: any) => {
        return buildResponse(response.data);
      },
    }),
    finanStatusUp: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/admin/finance/update/${id}`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [tagTypes.a_financial],
    }),
  }),
});

export const { useGetFinancialQuery, useFinanStatusUpMutation } = financialApi;

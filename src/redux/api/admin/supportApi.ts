import { tagTypes } from '@/redux/tag-types';
import { baseApi } from '../baseApi';
import { buildResponse } from '@/lib/api-response';

//  ====== Communication Tools =========
export const supportApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSuppTask: build.query({
      query: (arg?: Record<string, any>) => ({
        url: `/admin/support/allsupporttask`,
        method: 'GET',
        params: arg,
      }),
      providesTags: [tagTypes.a_support],
      transformResponse: (response: any) => {
        return buildResponse(response.data);
      },
    }),
    bulkNotiStore: build.mutation({
      query: (data) => {
        return {
          url: '/admin/bulk/notification',
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const { useGetSuppTaskQuery } = supportApi;

import { tagTypes } from '@/redux/tag-types';
import { baseApi } from '../baseApi';
import { buildResponse } from '@/lib/api-response';

//  ====== Support & Disputes =========
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
    getSuppDts: build.query({
      query: (id) => ({
        url: `/admin/support/task/details/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.a_support_dts],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    rejectStore: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/admin/support/rejectedtask/${id}`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [tagTypes.a_support],
    }),
    approveStore: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/admin/support/approvedtask/${id}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: [tagTypes.a_support],
    }),
  }),
});

export const {
  useGetSuppTaskQuery,
  useGetSuppDtsQuery,
  useRejectStoreMutation,
  useApproveStoreMutation,
} = supportApi;

import { buildResponse } from '@/lib/api-response';
import { tagTypes } from '../../tag-types';
import { baseApi } from '../baseApi';

export const reviewerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getReviewer: build.query({
      query: (arg?: Record<string, any>) => ({
        url: `/admin/reviewer/all`,
        method: 'GET',
        params: arg,
      }),
      providesTags: [tagTypes.a_reviewer],
      transformResponse: (response: any) => {
        return buildResponse(response.data);
      },
    }),
    storeReviewer: build.mutation({
      query: (data) => ({
        url: '/admin/reviewer/add',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [tagTypes.a_reviewer],
    }),
    singleReviewer: build.query({
      query: (id) => ({
        url: `/admin/reviewer/view/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.a_sin_reviewer],
      transformResponse: (res: any) => {
        return res.data;
      },
    }),
    acReviewer: build.mutation({
      query: ({ id, data }: any) => ({
        url: `/admin/reviewer/action/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [tagTypes.a_reviewer, tagTypes.a_sin_reviewer],
    }),
  }),
});

export const {
  useGetReviewerQuery,
  useStoreReviewerMutation,
  useSingleReviewerQuery,
  useAcReviewerMutation,
} = reviewerApi;

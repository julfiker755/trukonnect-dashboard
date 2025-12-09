import { tagTypes } from '@/redux/tag-types';
import { baseApi } from '../baseApi';
import { buildResponse } from '@/lib/api-response';

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query({
      query: (arg?: Record<string, any>) => ({
        url: `/admin/management/user/list`,
        method: 'GET',
        params: arg,
      }),
      providesTags: [tagTypes.a_user],
      transformResponse: (response: any) => {
        return buildResponse(response.data);
      },
    }),
    getuserManDts: build.query({
      query: (id) => ({
        url: `/admin/management/performer/details/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.a_single_user],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    sendToken: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/admin/management/send/token/${id}`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [tagTypes.a_single_user],
    }),
    changeStatus: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/admin/management/change/status/${id}`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [tagTypes.a_user, tagTypes.a_single_user],
    }),
    getReferrals: build.query({
      query: (id) => ({
        url: `/admin/management/all/referrals/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.a_user],
      transformResponse: (response: any) => {
        return buildResponse(response.data);
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetuserManDtsQuery,
  useSendTokenMutation,
  useChangeStatusMutation,
  useGetReferralsQuery,
} = userApi;

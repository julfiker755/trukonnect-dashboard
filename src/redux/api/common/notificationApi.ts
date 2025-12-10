import { buildResponse } from '@/lib/api-response';
import { tagTypes } from '../../tag-types';
import { baseApi } from '../baseApi';

export const notificationApi= baseApi.injectEndpoints({
  endpoints: (build) => ({
     getNotify: build.query({
      query: () => ({
        url: "/notification/center",
        method: "GET",
      }),
      providesTags: [tagTypes.a_notification],
      transformResponse: (res: any) => {
        return buildResponse(res?.data)
      },
    }),
   markNotify: build.mutation({
      query: (id: string) => ({
        url: `/notification/markAsRead/${id}`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.a_notification],
    }),
   markAllNotify: build.mutation({
      query: () => ({
        url: `/notification/markAllAsRead`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.a_notification],
    }),
  }),
});

export const {
 useGetNotifyQuery,
 useMarkNotifyMutation,
 useMarkAllNotifyMutation
} = notificationApi


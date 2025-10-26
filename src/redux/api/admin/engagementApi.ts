import { tagTypes } from '../../tag-types';
import { baseApi } from '../baseApi';

export const engagementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSoMedia: build.query({
      query: (arg?: Record<string, any>) => ({
        url: `/admin/social-media/all`,
        method: 'GET',
        params: arg,
      }),
      providesTags: [tagTypes.socialMedia],
    }),
    storeSoMedia: build.mutation({
      query: (data) => ({
        url: '/admin/social-media/add',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [tagTypes.socialMedia],
    }),
    getEngment: build.query({
      query: (id, arg?: Record<string, any>) => ({
        url: `/admin/engagements/all/${id}`,
        method: 'GET',
        params: arg,
      }),
      providesTags: [tagTypes.engagement],
    }),
    storeEngment: build.mutation({
      query: (data) => ({
        url: '/admin/engagements/add',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [tagTypes.engagement],
    }),
    updateEngment: build.mutation({
      query: ({ id, data }) => ({
        url: `/admin/engagements/edit/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [tagTypes.engagement],
    }),
    deleteEngment: build.mutation({
      query: (id) => ({
        url: `/admin/engagements/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.engagement],
    }),
  }),
});

export const {
  useGetSoMediaQuery,
  useStoreSoMediaMutation,
  useGetEngmentQuery,
  useStoreEngmentMutation,
  useUpdateEngmentMutation,
  useDeleteEngmentMutation,
} = engagementApi;

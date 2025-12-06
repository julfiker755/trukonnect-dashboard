import { tagTypes } from '@/redux/tag-types';
import { baseApi } from '../baseApi';

export const mediaApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMedia: build.query({
      query: (arg?: Record<string, any>) => ({
        url: `/admin/promo/links`,
        method: 'GET',
        params: arg,
      }),
      providesTags: [tagTypes.a_media],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    mediaStore: build.mutation({
      query: (data) => {
        return {
          url: '/admin/promo/links',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [tagTypes.a_media],
    }),
    deleteMedia: build.mutation({
      query: (id) => ({
        url: `/admin/promo/links/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.a_media],
    }),
  }),
});

export const { useMediaStoreMutation, useDeleteMediaMutation, useGetMediaQuery } = mediaApi;

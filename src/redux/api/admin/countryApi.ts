import { tagTypes } from '../../tag-types';
import { baseApi } from '../baseApi';

export const countryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCountry: build.query({
      query: (arg?: Record<string, any>) => ({
        url: `/admin/all-countrie`,
        method: 'GET',
        params: arg,
      }),
      providesTags: [tagTypes.country],
    }),
    storeCountry: build.mutation({
      query: (data) => {
        return {
          url: '/admin/add-countrie',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [tagTypes.country],
    }),
    deleteCountry: build.mutation({
      query: (id) => ({
        url: `/admin/delete-countrie/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.country],
    }),
    updateCountry: build.mutation({
      query: ({ id, data }) => ({
        url: `admin/edit-countrie/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [tagTypes.country],
    }),
  }),
});

export const {
  useGetCountryQuery,
  useStoreCountryMutation,
  useDeleteCountryMutation,
  useUpdateCountryMutation,
} = countryApi;

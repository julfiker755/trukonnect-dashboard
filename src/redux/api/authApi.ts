import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (data) => {
        return {
          url: "/auth/signin",
          method: "POST",
          body:data,
        };
      },
      invalidatesTags: [tagTypes.profile],
    }),
    forgotPassword: build.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body:data,
      }),
    }),
    otpVarify: build.mutation({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body:data,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
    newPassword: build.mutation({
      query: (data) => ({
        url: "/auth/set-new-password",
        method: "POST",
        body:data,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
    changePassword: build.mutation({
      query: (data) => ({
        url: "/auth/set-new-password",
        method: "POST",
        body:data,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
    // resetPassword: build.mutation({
    //   query: (data) => ({
    //     url: "/auth/reset-password",
    //     method: "POST",
    //     data,
    //   }),
    // }),
    // getProfile: build.query({
    //   query: () => ({
    //     url: "/auth/get-profile",
    //     method: "GET",
    //   }),
    //   providesTags: [tagTypes.profile],
    // }),
    // updateProfile: build.mutation({
    //   query: (data) => ({
    //     url: "/auth",
    //     method: "PATCH",
    //     ContentType: "multipart/form-data",
    //     data,
    //   }),
    //   invalidatesTags: [tagTypes.profile],
    // }),

  }),
});

export const {
  useSignInMutation,
  useForgotPasswordMutation,
  useOtpVarifyMutation,
  useNewPasswordMutation,
  useChangePasswordMutation
} = authApi;

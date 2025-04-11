import { Habit } from "@/lib/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_MAIN_URL;

export const habitsApi = createApi({
  reducerPath: "habitsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/habits` }),
  tagTypes: ["Habits"],
  endpoints: (builder) => ({
    getHabits: builder.query<Habit[], void>({
      query: () => "",
      providesTags: ["Habits"],
    }),
    createHabit: builder.mutation<Habit, Partial<Habit>>({
      query: (newHabit) => ({
        url: "",
        method: "POST",
        body: newHabit,
      }),
      invalidatesTags: ["Habits"],
    }),
    updateHabit: builder.mutation<Habit, Partial<Habit>>({
      query: ({ id, ...patch }) => ({
        url: `/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Habits"],
    }),
    toggleHabitStatus: builder.mutation<Habit, { id: number; isCompleted: boolean }>({
      query: ({ id, isCompleted }) => ({
        url: `/${id}`,
        method: "PUT",
        body: { isCompleted },
      }),
      invalidatesTags: ["Habits"],
    }),
    deleteHabit: builder.mutation({
      query: (id: number) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Habits"],
    }),
  }),
});

export const {
  useGetHabitsQuery,
  useCreateHabitMutation,
  useUpdateHabitMutation,
  useToggleHabitStatusMutation,
  useDeleteHabitMutation,
} = habitsApi;

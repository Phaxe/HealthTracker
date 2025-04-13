"use client";

import { Box, Button, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import {
  useGetHabitsQuery,
  useCreateHabitMutation,
} from "./Redux/slices/habitApiSlice";
import HabitsCard from "@/components/HabitsComponents/HabitsCard/HabitsCard";
import { useState, useMemo } from "react";
import HabitModal from "@/components/HabitsComponents/HabitModal/HabitModal";
import { Habit } from "@/lib/types";
import ProtectedLayout from "@/components/ProtectedLayout";
import SearchInput from "@/components/SearchInput/SearchInput";

export default function Home() {
  // Fetching habits from the API using RTK Query
  const { data: habits = [], isLoading, isError } = useGetHabitsQuery();
  // Mutation function to create a new habit
  const [createHabit] = useCreateHabitMutation();

  // State to manage modal visibility for adding a new habit
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // State for handling search input
  const [searchQuery, setSearchQuery] = useState("");

  // As we are doing all the coming function in real time it can help to add notification system
  // for the user in case of sucsess of fail

  // Function to handle adding a new habit
  const handleAddHabit = async (habit: Partial<Habit>) => {
    try {
      await createHabit(habit).unwrap(); // Calls API to create a new habit
    } catch (error) {
      console.error("Failed to create habit:", error);
    }
  };

  // Memoized function to filter habits based on search query
  const filteredHabits = useMemo(() => {
    if (!searchQuery) return habits; // If no search input, return all habits

    const query = searchQuery.toLowerCase();
    return habits.filter(
      (habit) =>
        habit.habit.toLowerCase().includes(query) ||
        habit.description.toLowerCase().includes(query)
    );
  }, [habits, searchQuery]);

  // Show loading state while habits are being fetched
  // This can be improved to be a loader indicator
  if (isLoading) {
    return (
      <ProtectedLayout>
        <Box sx={{ p: 3 }}>
          <Typography>Loading habits...</Typography>
        </Box>
      </ProtectedLayout>
    );
  }

  // Show error message if fetching habits fails
  // Can display a more clear error messages for the user why this happened
  if (isError) {
    return (
      <ProtectedLayout>
        <Box sx={{ p: 3 }}>
          <Typography color="error">Error loading habits</Typography>
        </Box>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <Box>
        {/* Header section with title and add habit button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            flexDirection: { xs: "column", sm: "row" }, // Stack items vertically on small screens
            gap: 2, // Add spacing between the elements
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontSize: { xs: "1.5rem", sm: "2rem" }, // Adjust font size for small screens
            }}
          >
            My Habits
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsAddModalOpen(true)} // Open modal to add habit
            sx={{
              width: { xs: "100%", sm: "auto" }, // Make button full width on small screens
              maxWidth: "200px", // Add a max width for large screens
            }}
          >
            Add Habit
          </Button>
        </Box>

        {/* Search input for filtering habits */}
        <Box sx={{ mb: 4 }}>
          <SearchInput
            onSearch={setSearchQuery}
            placeholder="Search by name or description..."
          />
        </Box>

        {/* Display habits in a responsive grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {filteredHabits.map((habit) => (
            <HabitsCard key={habit.id} habit={habit} /> // Render habit cards
          ))}
        </Box>

        {/* Modal for adding a new habit */}
        <HabitModal
          open={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddHabit}
          mode="add"
        />
      </Box>
    </ProtectedLayout>
  );
}

'use client';

// Import MUI components for layout and styling
import { Box, Typography } from '@mui/material';

// Import Redux hook for fetching habits data
import { useGetHabitsQuery } from '../Redux/slices/habitApiSlice';

// Import custom components
import HabitChart from '@/components/Charts/HabitChart';
import MainLayout from '@/components/MainLayout';

export default function StatisticsPage() {
  // Fetch habits data using RTK Query
  const { data: habits, isLoading, error } = useGetHabitsQuery();

  // Loading state - shows a loading message while data is being fetched
  if (isLoading) {
    return (
      <MainLayout>
        <Box p={3}>
          <Typography>Loading statistics...</Typography>
        </Box>
      </MainLayout>
    );
  }

  // Error state - shows an error message if data fetching fails
  if (error) {
    return (
      <MainLayout>
        <Box p={3}>
          <Typography color="error">Error loading statistics</Typography>
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Box p={3}>
        {/* Page title */}
        <Typography variant="h4" gutterBottom>
          Habit Statistics
        </Typography>

        {/* Responsive grid layout for habit charts */}
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',           // 1 column on mobile
              sm: 'repeat(2, 1fr)', // 2 columns on tablet
              md: 'repeat(3, 1fr)'  // 3 columns on desktop
            },
            gap: 3,                // Spacing between charts
            width: '100%'          // Full width container
          }}
        >
          {/* Map through habits and render a chart for each */}
          {habits?.map((habit) => (
            <Box key={habit.id} sx={{ width: '100%' }}>
              {/* HabitChart component displays completion data and streaks */}
              <HabitChart habit={habit} />
            </Box>
          ))}
        </Box>
      </Box>
    </MainLayout>
  );
} 
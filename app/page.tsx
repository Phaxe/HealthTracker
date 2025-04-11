"use client";

import { Box, Button, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useGetHabitsQuery, useCreateHabitMutation } from './Redux/slices/habitApiSlice';
import HabitsCard from '@/components/HabitsCard/HabitsCard';
import { useState, useMemo } from 'react';
import HabitModal from '@/components/HabitModal/HabitModal';
import { Habit } from '@/lib/types';
import MainLayout from '@/components/MainLayout';
import SearchInput from '@/components/SearchInput/SearchInput';

export default function Home() {
  const { data: habits = [], isLoading, isError } = useGetHabitsQuery();
  const [createHabit] = useCreateHabitMutation();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddHabit = async (habit: Partial<Habit>) => {
    try {
      await createHabit(habit).unwrap();
    } catch (error) {
      console.error('Failed to create habit:', error);
    }
  };

  const filteredHabits = useMemo(() => {
    if (!searchQuery) return habits;
    
    const query = searchQuery.toLowerCase();
    return habits.filter(habit => 
      habit.habit.toLowerCase().includes(query) || 
      habit.description.toLowerCase().includes(query)
    );
  }, [habits, searchQuery]);

  if (isLoading) {
    return (
      <MainLayout>
        <Box sx={{ p: 3 }}>
          <Typography>Loading habits...</Typography>
        </Box>
      </MainLayout>
    );
  }

  if (isError) {
    return (
      <MainLayout>
        <Box sx={{ p: 3 }}>
          <Typography color="error">Error loading habits</Typography>
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Box>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4 
        }}>
          <Typography variant="h4" component="h1">
            My Habits
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Habit
          </Button>
        </Box>

        <Box sx={{ mb: 4 }}>
          <SearchInput 
            onSearch={setSearchQuery}
            placeholder="Search by name or description..."
          />
        </Box>

        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)'
          },
          gap: 3
        }}>
          {filteredHabits.map((habit) => (
            <HabitsCard key={habit.id} habit={habit} />
          ))}
        </Box>

        <HabitModal
          open={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddHabit}
          mode="add"
        />
      </Box>
    </MainLayout>
  );
}

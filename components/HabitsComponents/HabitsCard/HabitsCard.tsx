'use client'; 

// Import necessary MUI components for the card UI
import { 
  Card, 
  CardContent, 
  Typography, 
  Box,
  IconButton,
  CardActions,
  Chip,
  Button
} from '@mui/material';

// Import icons for the UI elements
import {  Edit, Delete } from '@mui/icons-material';

// Import Redux mutation hooks for habit management
import { useDeleteHabitMutation, useUpdateHabitMutation } from '@/app/Redux/slices/habitApiSlice';
import { useState, useEffect } from 'react';
import { Habit, HabitCardProps } from '@/lib/types';
import { useMidnightRerender } from '@/lib/hooks';
import dynamic from 'next/dynamic';


const HabitModal = dynamic(() => import('../HabitModal/HabitModal'), { 
  ssr: false 
});

export default function HabitsCard({ habit }: HabitCardProps) {
  const tick = useMidnightRerender(); // use it to keep things fresh at midnight

  
  // State for managing the edit modal visibility
  const [isEditing, setIsEditing] = useState(false);
  // State for tracking today's completion status
  const [isCompletedToday, setIsCompletedToday] = useState(false);
  
  // Redux mutation hooks for updating and deleting habits
  const [updateHabit] = useUpdateHabitMutation();
  const [deleteHabit] = useDeleteHabitMutation();

  // Helper function to get today's date in YYYY-MM-DD format and to get local date 
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; 
  };

  useEffect(() => {
    const today = getTodayDate();
  
    // Normalize all habit completion dates just to be safe
    const todayExists = habit.completion.some(c => {
      const entryDate = c.date?.split('T')[0]; // Ensure we're only comparing the date part
      return entryDate === today;
    });
  
    setIsCompletedToday(todayExists);
  }, [habit.completion,tick]);

  // Handler for toggling habit completion status
  const handleToggleComplete = async () => {
    try {
      const today = getTodayDate();
      const updatedCompletion = [...habit.completion];
      
      if (isCompletedToday) {
        // Remove today's date from completion array
        const index = updatedCompletion.findIndex(c => c.date === today);
        if (index !== -1) {
          updatedCompletion.splice(index, 1);
        }
      } else {
        // Add today's date to completion array
        updatedCompletion.push({ date: today });
      }

      // Update the habit with new completion data
      await updateHabit({
        id: habit.id,
        completion: updatedCompletion
      }).unwrap();
    } catch (error) {
      console.error('Failed to update habit:', error);
    }
  };

  // Handler for editing habit details
  const handleEdit = async (updatedHabit: Partial<Habit>) => {
    try {
      // Merge existing habit ID with updated data and save
      await updateHabit({
        id: habit.id,
        ...updatedHabit
      }).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update habit:', error);
    }
  };

  // Handler for deleting a habit
  const handleDelete = async () => {
    try {
      // Convert string ID to number as required by the API
      await deleteHabit((habit.id)).unwrap();
    } catch (error) {
      console.error('Failed to delete habit:', error);
    }
  };

  // If habit is completed today, don't render the card
  if (isCompletedToday) {
    return null;
  }

  // Render the habit card UI
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-4px)', // Subtle hover animation
          transition: 'transform 0.2s ease-in-out'
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Header section with habit name and completion checkbox */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" component="div">
            {habit.habit}
          </Typography>

        </Box>
        {/* Habit description */}
        <Typography variant="body2" color="text.secondary">
          {habit.description}
        </Typography>
        {/* Status chip showing completion state */}
        <Box mt={2}>
          <Chip 
            label={isCompletedToday ? "Completed" : "Pending"} 
            color={isCompletedToday ? "success" : "default"}
            size="small"
          />
        </Box>
      </CardContent>
      {/* Action buttons for edit and delete */}
      <CardActions className='flex items-center justify-between '>
        <IconButton onClick={() => setIsEditing(true)} size="small">
          <Edit color="primary" />
        </IconButton>
        <IconButton onClick={handleDelete} size="small">
          <Delete color="error" />
        </IconButton>
        <Button
        variant="contained"
        
        onClick={handleToggleComplete}
        size="small"
        className='bg-blue-500 items-end self-end'
      >
        {isCompletedToday ? "Completed" : "Complete"}
      </Button>
      </CardActions>
      {/* Edit modal - shown when isEditing is true */}
      <HabitModal
        open={isEditing}
        onClose={() => setIsEditing(false)}
        onSubmit={handleEdit}
        mode="edit"
        initialData={habit}
      />
    </Card>
  );
}
'use client'; // Essential for client-side interactivity in Next.js 13+

// Import necessary MUI components for the card UI
import { 
  Card, 
  CardContent, 
  Typography, 
  Box,
  Checkbox,
  IconButton,
  CardActions,
  Chip
} from '@mui/material';

// Import icons for the UI elements
import { CheckCircle, Circle, Edit, Delete } from '@mui/icons-material';

// Import Redux mutation hooks for habit management
import { useDeleteHabitMutation, useUpdateHabitMutation } from '@/app/Redux/slices/habitApiSlice';
import { useState, useEffect } from 'react';
import HabitModal from '../HabitModal/HabitModal';
import { Habit } from '@/lib/types';

// Define the props interface for the HabitsCard component
interface HabitCardProps {
  habit: Habit;
}

export default function HabitsCard({ habit }: HabitCardProps) {
  // State for managing the edit modal visibility
  const [isEditing, setIsEditing] = useState(false);
  // State for tracking today's completion status
  const [isCompletedToday, setIsCompletedToday] = useState(false);
  
  // Redux mutation hooks for updating and deleting habits
  const [updateHabit] = useUpdateHabitMutation();
  const [deleteHabit] = useDeleteHabitMutation();

  // Helper function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Effect to find and set today's completion status whenever habit.completion changes
  useEffect(() => {
    const today = getTodayDate();
    // Check if today's date exists in the completion array
    const todayExists = habit.completion.some(c => c.date === today);
    setIsCompletedToday(todayExists);
  }, [habit.completion]);

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
      await deleteHabit(Number(habit.id)).unwrap();
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
          <Checkbox
            checked={isCompletedToday}
            onChange={handleToggleComplete}
            icon={<Circle />}
            checkedIcon={<CheckCircle />}
          />
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
      <CardActions>
        <IconButton onClick={() => setIsEditing(true)} size="small">
          <Edit color="primary" />
        </IconButton>
        <IconButton onClick={handleDelete} size="small">
          <Delete color="error" />
        </IconButton>
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
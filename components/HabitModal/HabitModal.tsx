'use client';

import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField,
  Box
} from '@mui/material';
import { useState, useEffect } from 'react';
import {  HabitModalProps } from '@/lib/types';



export default function HabitModal({ 
  open, 
  onClose, 
  onSubmit, 
  mode, 
  initialData 
}: HabitModalProps) {
  const [formData, setFormData] = useState({
    habit: '',
    description: ''
  });

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        habit: initialData.habit,
        description: initialData.description
      });
    } else {
      setFormData({
        habit: '',
        description: ''
      });
    }
  }, [mode, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {mode === 'add' ? 'Add New Habit' : 'Edit Habit'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              autoFocus
              required
              label="Habit Name"
              name="habit"
              value={formData.habit}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {mode === 'add' ? 'Add' : 'Save'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 
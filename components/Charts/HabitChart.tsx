'use client';

import { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import { Habit } from '@/lib/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface HabitChartProps {
  habit: Habit;
  title?: string;
}

export default function HabitChart({ habit, title }: HabitChartProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Calculate streak
  const streak = useMemo(() => {
    if (!habit.completion || habit.completion.length === 0) {
      return { current: 0, max: 0 };
    }

    const dates = habit.completion.map(c => new Date(c.date));
    dates.sort((a, b) => b.getTime() - a.getTime()); // Sort in descending order
    
    let currentStreak = 0;
    let maxStreak = 0;
    let tempStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if today is completed
    const todayStr = today.toISOString().split('T')[0];
    const isTodayCompleted = habit.completion.some(c => c.date === todayStr);
    
    if (isTodayCompleted) {
      currentStreak = 1;
      tempStreak = 1;
    }
    
    // Calculate streaks
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      date.setHours(0, 0, 0, 0);
      
      if (i === 0) {
        tempStreak = 1;
        maxStreak = 1;
        continue;
      }
      
      const prevDate = dates[i - 1];
      const dayDiff = Math.floor((prevDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      
      if (dayDiff === 1) {
        tempStreak++;
        maxStreak = Math.max(maxStreak, tempStreak);
        
        // If this is the first date after today, update current streak
        if (i === 0 && isTodayCompleted) {
          currentStreak = tempStreak;
        }
      } else {
        tempStreak = 1;
      }
    }
    
    return { current: currentStreak, max: maxStreak };
  }, [habit.completion]);

  // Prepare chart data
  const chartData = useMemo(() => {
    const dates = habit.completion.map(c => c.date);
    dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    
    return {
      labels: dates,
      datasets: [
        {
          label: 'Completion',
          data: dates.map(() => 1),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.1,
        },
      ],
    };
  }, [habit.completion]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: isDarkMode ? '#fff' : '#666',
          font: {
            size: isMobile ? 10 : isTablet ? 12 : 14
          }
        },
      },
      title: {
        display: true,
        text: title || habit.habit,
        color: isDarkMode ? '#fff' : '#666',
        font: {
          size: isMobile ? 14 : isTablet ? 16 : 18
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
        ticks: {
          stepSize: 1,
          color: isDarkMode ? '#fff' : '#666',
          font: {
            size: isMobile ? 10 : isTablet ? 12 : 14
          }
        },
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        ticks: {
          color: isDarkMode ? '#fff' : '#666',
          font: {
            size: isMobile ? 10 : isTablet ? 12 : 14
          },
          maxRotation: isMobile ? 45 : 0,
          autoSkip: true,
          maxTicksLimit: isMobile ? 5 : isTablet ? 7 : 10
        },
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: { xs: 1, sm: 1.5 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 1, sm: 1.5 },
        bgcolor: isDarkMode ? 'background.paper' : 'background.default',
        maxWidth: '400px',
        margin: '0 auto'
      }}
    >
      <Box sx={{ 
        height: { 
          xs: '150px', 
          sm: '180px', 
          md: '200px' 
        },
        width: '100%'
      }}>
        <Line options={options} data={chartData} />
      </Box>
      {streak.current > 0 && (
        <Box sx={{ textAlign: 'center' }}>
          <Typography 
            variant="overline" 
            sx={{ 
              color: 'primary.main',
              fontWeight: 'bold',
              letterSpacing: '0.1em',
              mb: 0.5,
              fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' }
            }}
          >
            STREAK
          </Typography>
  
          {streak.max > streak.current && (
            <Typography 
              variant="body2" 
              sx={{ 
                color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary',
                mt: 0.5,
                fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.875rem' }
              }}
            >
              Longest: {streak.max} {streak.max === 1 ? 'day' : 'days'}
            </Typography>
          )}
        </Box>
      )}
    </Paper>
  );
} 
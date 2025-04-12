'use client';

import { useTheme } from './ThemeProvider';
import { IconButton, useTheme as useMuiTheme } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';

export default function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();

  return (
    <IconButton 
      onClick={toggleTheme} 
      sx={{
        color: muiTheme.palette.text.primary,
        '&:hover': {
       backgroundColor: 'transparent'
        },
      }}
    >
      {mode === 'dark' ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
}
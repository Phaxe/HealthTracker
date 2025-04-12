"use client";

import { Box, useTheme } from '@mui/material';
import Sidebar from './Sidebar/Sidebar';
import { useUser } from '@auth0/nextjs-auth0/client';
import LoginPage from './LoginPage';


interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { user, isLoading } = useUser();
  const theme = useTheme();


  if (isLoading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        bgcolor: theme.palette.background.default
      }}>
        Loading...
      </Box>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      bgcolor: theme.palette.background.default 
    }}>
      <Sidebar />
      <Box 
        component="main" 
        sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: 'calc(100% - 10px)',
          ml: '10px',
          p: { xs: 2, sm: 3, md: 4 },
          overflow: 'auto'
        }}
      >
        <Box sx={{ 
          flex: 1,
          maxWidth: '1400px',
          width: '100%',
          mx: 'auto'
        }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
} 
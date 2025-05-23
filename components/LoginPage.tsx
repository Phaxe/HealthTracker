"use client";

import { Box, Button, Typography, Paper, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  // Access the current theme using MUI's useTheme hook
  const theme = useTheme();
  // useRouter hook from Next.js to navigate
  const router = useRouter();

  // Handler for logging in, which redirects the user to the login route
  const handleLogin = () => {
    // Redirects the user to the /api/auth/login route for logging in
    router.push("/api/auth/login");
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            width: "100%",
            maxWidth: 400,
            bgcolor: theme.palette.background.paper,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Habit Tracker
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            gutterBottom
          >
            Track your daily habits and build a better routine. Please log in to
            continue.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleLogin}
            sx={{
              mt: 2,
              px: 4,
              py: 1.5,
            }}
          >
            Log In / Sign Up
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}

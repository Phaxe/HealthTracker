/**
 * SearchInput Component
 * 
 * A reusable search input component with debounced search functionality.
 * Features:
 * - Debounced search with 500ms delay
 * - Material-UI TextField with search icon
 * - Theme-aware styling
 * - Customizable placeholder text
 */

'use client';

import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

interface SearchInputProps {
  /** Callback function to handle search queries */
  onSearch: (query: string) => void;
  /** Optional placeholder text for the input field */
  placeholder?: string;
}

export default function SearchInput({ 
  onSearch, 
  placeholder = 'Search habits...' 
}: SearchInputProps) {
  // Local state to manage the input value
  const [searchQuery, setSearchQuery] = useState('');
  // Access the current theme for consistent styling
  const theme = useTheme();

  // Implement debounced search
  useEffect(() => {
    // Set a timer to delay the search execution
    const debounceTimer = setTimeout(() => {
      // Call the parent's search handler with current query
      onSearch(searchQuery);
    }, 500); // 500ms delay

    // Cleanup: cancel the timer if the component unmounts
    // or if searchQuery changes before the delay is complete
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, onSearch]);

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder={placeholder}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      // Theme-aware styling for the input field
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: theme.palette.background.paper,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
          },
        },
      }}
      // Add search icon to the input field
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
      }}
    />
  );
} 
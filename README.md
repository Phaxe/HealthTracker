# Habit Tracker Application

A modern habit tracking application built with Next.js, Material-UI, and Redux Toolkit. This application helps users track their daily habits, view statistics, and maintain streaks.

## Features

- 🔐 Authentication with Auth0
- 📊 Habit tracking with completion status
- 📈 Statistics and streak tracking
- 🎨 Dark/Light mode support
- 📱 Fully responsive design
- 🔍 Search functionality
- 📊 Interactive charts for habit visualization

## Project Structure

```
habit/
├── app/
│   ├── Redux/
│   │   └── slices/
│   │       ├── habitApiSlice.ts    # RTK Query API slice for habits
│   │       └── store.ts            # Redux store configuration
│   ├── statistics/
│   │   └── page.tsx                # Statistics page with charts
│   ├── layout.tsx                  # Root layout with Auth0 provider
│   └── page.tsx                    # Main page with habit list
├── components/
│   ├── Charts/
│   │   └── HabitChart.tsx         # Reusable chart component
│   ├── HabitsCard/
│   │   └── HabitsCard.tsx         # Habit card component
│   ├── HabitModal/
│   │   └── HabitModal.tsx         # Modal for adding/editing habits
│   ├── MainLayout.tsx
│   ├── SearchInput/
│   │   └── SearchInput.tsx        # Search component
│   ├── Sidebar/
│   │   └── Sidebar.tsx            # Navigation sidebar
│   ├── Theme/
│   │   └── ThemeProvider.tsx      # Theme Folder provider
        └── ThemeSwitcher.tsx 
├── lib/
│   └── types.ts                   # TypeScript type definitions
├── public/                        # Static assets
└── styles/                        # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Auth0 account (for authentication)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd habit
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with the following variables:
```env
AUTH0_SECRET='your-auth0-secret'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='your-auth0-domain'
AUTH0_CLIENT_ID='your-auth0-client-id'
AUTH0_CLIENT_SECRET='your-auth0-client-secret'
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Key Features Explained

### Authentication
- Uses Auth0 for secure authentication
- Protected routes ensure only authenticated users can access the app
- User profile information displayed in the sidebar

### Habit Management
- Create, edit, and delete habits
- Track daily completion status
- View completion history
- Search and filter habits

### Statistics
- Interactive charts showing habit completion over time
- Streak tracking (current and longest streaks)
- Responsive grid layout for charts
- Dark/light mode support for better visibility

### Theme System
- Material-UI based theming
- Dark/light mode toggle
- Consistent styling across components
- Responsive design for all screen sizes

## Technologies Used

- **Frontend Framework**: Next.js
- **UI Library**: Material-UI (MUI)
- **State Management**: Redux Toolkit
- **Charts**: Chart.js with react-chartjs-2
- **Authentication**: Auth0
- **Styling**: MUI's styled-components and Tailwind CSS
- **Type Checking**: TypeScript

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

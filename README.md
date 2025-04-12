Habit Tracker Application

A modern habit tracking application built with Next.js, Material-UI, and Redux Toolkit. This application helps users track their daily habits, view statistics, and maintain streaks.

Notes

-Initially, I used ShadCN for styling and UI components, but as per the recommendation to use MUI, I removed ShadCN and continued with MUI only.

-My original idea was to toggle each HabitCard as complete/incomplete. However, with the streak system, I decided to hide completed habits and show only pending ones. The toggle logic still exists, but the user interface currently only allows marking as complete (not undoing).

-All habit-related UI and logic can be found in the HabitComponents folder inside the components directory.

-I also created a custom hook to reset daily habits at midnight (12 AM), but I haven't tested it yet.

-I integrated a sidebar component from a previous side project to handle navigation, theme switching, and user authentication (login/logout). It also displays the user's name and profile image.

Features

🔐 Authentication with Auth0

📊 Habit tracking with completion status

📈 Statistics and streak tracking

🎨 Dark/Light mode support

📱 Fully responsive design

🔍 Search functionality

📊 Interactive charts for habit visualization

habit/
├── app/
│   ├── api/
│   │   └── auth/[auth0]/route.ts       # Auth0 route handler
│   ├── redux/
│   │   ├── slices/
│   │   │   └── habitSlice.ts          # Redux habit slice
│   │   ├── store.ts                   # Redux store setup
│   │   └── provider.tsx               # Redux provider component
│   ├── statistics/
│   │   └── page.tsx                   # Statistics page with charts
│   ├── layout.tsx                    # Root layout with Auth0 provider
│   ├── page.tsx                      # Main landing/dashboard page
│   ├── global.css                    # Global styles
│   ├── lib/
│   │   ├── hook.ts                   # Custom hooks
│   │   ├── types.ts                  # TypeScript types
│   │   └── utils.ts                  # Utility functions
├── components/
│   ├── HabitComponents/
│   │   ├── HabitsCard.tsx            # Habit card component
│   │   ├── HabitModal.tsx            # Modal for adding/editing habits
│   │   └── HabitsCharts.tsx          # Habit charts component
│   ├── SearchInput/
│   │   └── SearchInput.tsx           # Search input component
│   ├── Sidebar/
│   │   └── Sidebar.tsx                 # App sidebar navigation
│   ├── ProtectedLayout.tsx           # Layout wrapper for protected routes  
│   ├── loginPage.tsx                 # Login page UI          
│   ├── Theme/
│   │   ├── ThemeProvider.tsx         # MUI theme provider
│   │   └── ThemeSwitcher.tsx         # Dark/light mode toggle
├── public/                           # Static assets
      
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

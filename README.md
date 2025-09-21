# BusTracker - Real-time Bus Tracking Frontend

A modern React-based frontend for a bus tracking platform inspired by AbhiBus.com. This application provides real-time bus tracking, ETA display, and dual login portals for both passengers and bus operators.

## Features

### 🚌 For Passengers
- **Real-time Bus Tracking**: Live GPS updates and accurate location data
- **Route Search**: Find buses between cities with detailed route information
- **ETA Display**: Precise arrival times based on current traffic conditions
- **Interactive Dashboard**: Easy-to-use interface for tracking multiple buses
- **Mobile Responsive**: Optimized for all device sizes

### 🚛 For Bus Operators
- **Fleet Management**: Monitor and manage your entire bus fleet
- **Real-time Status Updates**: Update bus status (on-time, delayed, early, cancelled)
- **Route Management**: View and manage bus routes and schedules
- **Analytics Dashboard**: Track performance metrics and statistics
- **Live Activity Feed**: Monitor recent activities and updates

### 🎨 UI/UX Features
- **Dark/Light Mode**: Toggle between dark and light themes with system preference detection
- **Modern Design**: Clean, professional interface inspired by modern web applications
- **Smooth Animations**: Subtle transitions and hover effects for better user experience
- **Accessibility**: Keyboard navigation and screen reader friendly design

## Technology Stack

- **React 18** - Modern React with hooks and functional components
- **React Router 6** - Client-side routing
- **Vite** - Fast build tool and development server
- **Lucide React** - Beautiful, customizable icons
- **CSS3** - Modern styling with Flexbox and Grid
- **Date-fns** - Date manipulation utilities

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bus_monitoring
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Navbar.jsx      # Navigation bar component
├── contexts/           # React contexts
│   └── AuthContext.jsx # Authentication context
├── data/              # Mock data and utilities
│   └── mockData.js    # Sample bus and route data
├── pages/             # Page components
│   ├── Home.jsx       # Landing page
│   ├── Login.jsx      # Dual login page
│   ├── PassengerDashboard.jsx  # Passenger interface
│   ├── OperatorDashboard.jsx   # Operator interface
│   └── BusTracking.jsx        # Real-time tracking page
├── utils/             # Utility functions
├── App.jsx            # Main app component
├── App.css            # Global styles
├── index.css          # Base styles
└── main.jsx           # Entry point
```

## Features Overview

### Authentication System
- Dual login system for passengers and operators
- Persistent authentication using localStorage
- Protected routes based on user type
- Demo mode with any email/password combination

### Theme System
- **CSS Custom Properties**: Dynamic theming using CSS variables
- **System Preference Detection**: Automatically detects user's OS theme preference
- **Persistent Theme**: Remembers user's theme choice across sessions
- **Smooth Transitions**: Animated theme switching for better UX
- **Comprehensive Coverage**: All components support both light and dark themes

### Real-time Tracking
- Simulated real-time updates every 10-30 seconds
- Live ETA calculations
- Bus status monitoring (on-time, delayed, early, cancelled)
- Speed and location tracking

### Responsive Design
- Mobile-first approach
- Optimized for tablets and desktops
- Touch-friendly interface
- Accessible design patterns

### Mock Data
- Sample bus routes and schedules
- Realistic bus tracking data
- Multiple operators (KSRTC, APSRTC, MSRTC)
- Various bus types and capacities

## Usage

### For Passengers
1. Visit the homepage and click "Start Tracking"
2. Choose "Passenger" login type
3. Enter any email and password (demo mode)
4. Search for buses by departure and destination cities
5. View available buses with real-time ETAs
6. Click "Track Bus" to see detailed tracking information

### For Operators
1. Choose "Bus Operator" login type
2. Enter operator name, email, and password
3. Access the operator dashboard
4. Monitor fleet status and performance
5. Update bus statuses as needed
6. View route management and analytics

## Customization

### Adding New Bus Routes
Edit `src/data/mockData.js` to add new routes, buses, or operators:

```javascript
export const mockBuses = [
  {
    id: 'BUS006',
    number: 'KA-06-KL-1111',
    route: 'Bangalore to Kochi',
    operator: 'KSRTC',
    // ... other properties
  }
]
```

### Styling
The application uses CSS custom properties and utility classes. Main styles are in:
- `src/index.css` - Base styles and utilities
- `src/App.css` - Component-specific styles

### Adding Real API Integration
Replace mock data functions in `src/data/mockData.js` with actual API calls:

```javascript
export const getBusById = async (id) => {
  const response = await fetch(`/api/buses/${id}`)
  return response.json()
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Inspired by AbhiBus.com
- Icons by Lucide React
- Design system inspired by modern web applications

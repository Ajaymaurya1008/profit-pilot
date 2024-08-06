# Profit Pilot

Profit Pilot is a mobile application built with Expo and React Native, designed to help users manage their finances, track transactions, and visualize their spending habits.

## App Preview

![Home Screen](./assets/screenshots/Home.jpg)
![Statistics Screen](./assets/screenshots/Stats.jpg)
![Scanner Screen](./assets/screenshots/QR.jpg)
![Transactions Screen](./assets/screenshots/BottomSheet.jpg)

## Getting Started

To run this project locally:

1. Clone the repository

   ```bash
   git clone https://github.com/Ajaymaurya1008/profit-pilot.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Expo development server:
   ```bash
   npx expo start
   ```

## About the Project

Profit Pilot is a comprehensive financial management app that provides users with tools to track their expenses, manage multiple accounts, and analyze their spending patterns. The app features a clean, modern UI with intuitive navigation and real-time updates.

## Features

- Multi-currency account management
- Transaction tracking and categorization
- QR code scanner for quick payments
- Statistical analysis of spending habits
- Secure local data storage

## Libraries Used

- Expo
- React Native
- expo-router for navigation
- @gorhom/bottom-sheet for modal interfaces
- react-native-chart-kit for data visualization
- expo-secure-store for secure local storage
- lottie-react-native for animations
- react-native-element-dropdown for dropdown components

## Project Structure

The project follows a typical Expo file structure:

- `app/`: Contains the main application screens and navigation setup
- `components/`: Reusable React components
- `constants/`: Application-wide constants and data
- `assets/`: Images, fonts, and other static assets

## Key Components

### Card Component

The Card component displays account information and balance. It accepts `item` and `full` props to customize its appearance.

### TransactionItem Component

This component renders individual transaction items in a list. It takes an `item` prop containing transaction details.

## Screens

### Home Screen

The main dashboard screen displaying account overview and recent transactions.

### Statistics Screen

Provides graphical representation of user's financial data.

### Scanner Screen

Implements QR code scanning functionality for quick payments or information retrieval.

## Data Management

The app uses `expo-secure-store` for local data persistence. Transaction data is stored securely on the device.

## Styling

The app uses a combination of inline styles and StyleSheet objects for consistent styling across components.

## Contributing

Contributions to Profit Pilot are welcome. Please ensure to follow the existing code style and add unit tests for any new features.

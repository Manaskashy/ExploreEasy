# 🌍 ExploreEasy - Your Ultimate Travel Companion

ExploreEasy is a premium, feature-rich travel companion application built with React Native. It empowers travelers to plan, discover, and book their dream vacations with ease, featuring an AI-powered trip planner and seamless destination exploration.


## ✨ Features

- **🤖 AI Trip Planner**: Personalized itineraries generated using advanced AI logic to match your travel preferences.
- **🗺️ Global Discovery**: Explore detailed guides for top destinations including Bali, Dubai, Singapore, Thailand, Maldives, and more.
- **🏨 Seamless Booking**: Integrated booking system for flights, hotels, and local experiences.
- **📸 Social Discovery**: Share and discover travel stories from a vibrant community of explorers.
- **🔐 Secure Authentication**: Robust login and signup flow with password recovery options.
- **👤 Personalized Profile**: Manage your travel preferences, saved destinations, and booking history.
- **💳 Integrated Payments**: Secure payment processing for all your travel needs.
- **📍 Interactive Maps**: Visualize your destinations and planned routes with integrated map support.

## 🚀 Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) (v0.78.1)
- **Navigation**: [React Navigation v7](https://reactnavigation.org/)
- **UI Components**: 
  - `react-native-linear-gradient` for premium aesthetics
  - `react-native-vector-icons` (AntDesign, Ionicons, etc.)
  - `react-native-responsive-screen` for adaptive layouts
- **State & Storage**: `@react-native-async-storage/async-storage`
- **Maps**: `react-native-maps`
- **Styling**: Modern, responsive CSS-in-JS patterns

## 📁 Project Structure

```text
ExploreEasy/
├── src/
│   ├── assets/         # Images, fonts, and static resources
│   ├── Context/        # State management and context providers
│   ├── navigation/     # Stack and Tab navigation configurations
│   ├── Screen/         # Main application screens (25+ screens)
│   │   ├── AITripPlanner.tsx
│   │   ├── MainScreen.tsx
│   │   ├── Booking.tsx
│   │   └── ... (Destination Specific Screens)
│   └── styles/         # Global styles and theme definitions
├── App.tsx             # Application entry point
└── index.js            # Entry point for Metro bundler
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (>= 18)
- React Native CLI
- Android Studio / Xcode

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Manaskashy/ExploreEasy.git
   cd ExploreEasy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup (Mac only)**
   ```bash
   cd ios && pod install && cd ..
   ```

### Running the App

- **Start Metro Bundler**
  ```bash
  npm start
  ```

- **Run on Android**
  ```bash
  npm run android
  ```

- **Run on iOS**
  ```bash
  npm run ios
  ```

## 📱 Screenshots

| Home Screen | AI Planner | Destination Detail |
| :---: | :---: | :---: |
| ![Home](https://via.placeholder.com/200x400?text=Home+Screen) | ![Planner](https://via.placeholder.com/200x400?text=AI+Planner) | ![Detail](https://via.placeholder.com/200x400?text=Destination) |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ for travelers everywhere.

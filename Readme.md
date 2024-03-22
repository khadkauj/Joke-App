# React Native Jokes App

## Overview

This is a simple React Native app that displays programming jokes fetched from the "Official Joke API". The app allows users to view jokes and refresh the list of jokes. Additionally, there's an option to exit the app gracefully.

## Features

- Fetches programming jokes from the "Official Joke API".
- Displays a list of jokes with setup and punchline.
- Provides a refresh button to fetch new jokes.

## Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/khadkauj/Joke-App
   ```

2. Install dependencies:

   ```bash
   cd react-native-jokes-app
   npm install
   ```

3. Run the app:

   ```bash
   npx expo start
   ```

4. Explore the app:
   - View the list of programming jokes.
   - Tap on a joke to view its details.
   - Use the refresh button to fetch new jokes.

## Dependencies

- `axios`: For making HTTP requests to fetch jokes from the API.
- `@react-navigation/native`: For navigation within the app.
- `@react-navigation/stack`: For creating a stack navigator.
- `react-native`: The core framework for building the app.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

#!/bin/bash

# Define the base path for better readability
BASE_PATH="/Volumes/Mayorana/code/similar/tafseel"

echo "Removing @react-native-firebase/app android build directory..."
rm -Rf "$BASE_PATH/node_modules/@react-native-firebase/app/android/build"

echo "Removing @react-native-community/viewpager android build directory..."
rm -Rf "$BASE_PATH/node_modules/@react-native-community/viewpager/android/build"

# Remove the android app build directory
echo "Removing main android app build directory..."
rm -Rf "$BASE_PATH/android/app/build"
rm -Rf /Volumes/Mayorana/code/similar/tafseel/node_modules/@react-native/gradle-plugin/.gradle/8.0.1/executionHistory/executionHistory.lock

# Move to the android directory and run the gradlew clean command
echo "Running gradlew clean..."
cd "$BASE_PATH/android" && ./gradlew clean

# Return to the main directory and run yarn android
echo "Going back to the main directory and starting yarn android..."
cd "$BASE_PATH" && yarn android

echo "Done!"

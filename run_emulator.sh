#!/bin/bash

# Find the path to the Android SDK
sdk_path=$(which adb)
sdk_path=$(dirname "$(dirname "$sdk_path")")

if [ -z "$sdk_path" ]; then
  echo "Error: Android SDK not found. Make sure it's installed and added to your PATH."
  exit 1
fi

# Check if any Android Virtual Devices (AVDs) are available
avd_list="$("$sdk_path/emulator/emulator" -list-avds)"

if [ -z "$avd_list" ]; then
  echo "Error: No Android Virtual Devices (AVDs) found."
  exit 1
fi

# Select the first available AVD (you can modify this logic as needed)
selected_avd=$(echo "$avd_list" | head -n 1)

# Run the emulator with the selected AVD
"$sdk_path/emulator/emulator" "@$selected_avd" -gpu host
# "$sdk_path/emulator/emulator" "@$selected_avd" -gpu host -dns-server 8.8.8.8
# "$sdk_path/emulator/emulator" "@$selected_avd" -gpu host -dns-server 10.0.2.3

exit 0


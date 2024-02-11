# Start


yarn global add dotenv-cli


## Android

ENVFILE=.env.staging yarn android && ENVFILE=.env yarn start
ENVFILE=.env.staging yarn android
ENVFILE=.env.production yarn android

cd android && ENVFILE=.env ./gradlew assembleRelease

. ~/devtools/go-jdk17-nodelatestLTS
java --version
nvm use 18
./gradlew clean


## IOS

ENVFILE=.env.staging yarn ios && ENVFILE=.env yarn start
ENVFILE=.env.staging yarn ios
ENVFILE=.env.production yarn ios


Follow crashlytics on ios :

xcrun simctl spawn booted log stream --level debug --style compact | grep -i crash


# Start

yarn global add dotenv-cli


ENVFILE=.env.staging yarn ios && ENVFILE=.env.staging yarn start
ENVFILE=.env.staging yarn ios
ENVFILE=.env.production yarn ios

cd android && ENVFILE=.env.staging ./gradlew assembleRelease


Follow crashlytics on ios :

xcrun simctl spawn booted log stream --level debug --style compact | grep -i crash

. ~/devtools/go-jdk17-nodelatestLTS
java --version
nvm use 18
./gradlew clean


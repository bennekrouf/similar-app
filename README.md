# Start

ENVFILE=.env.local yarn ios
ENVFILE=.env.staging yarn ios
ENVFILE=.env.production yarn ios

cd android && ENVFILE=.env.staging ./gradlew assembleRelease

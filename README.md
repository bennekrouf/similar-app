# Start

ENVFILE=.env.local yarn android
ENVFILE=.env.staging yarn android
ENVFILE=.env.production yarn android

cd android && ENVFILE=.env.staging ./gradlew assembleRelease

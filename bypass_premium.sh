#!/bin/sh

adb shell mount -o remount,rw /
# enable premium - thanks to https://github.com/williamtcastro/carthing-non-premium-spotify
adb shell "echo \"finished\" > /var/lib/qt-superbird-app/settings/onboarding_status"
adb shell "echo \"finished\" > /var/lib/qt-superbird-app/settings/setup_state"
adb shell "echo \"true\" > /var/lib/qt-superbird-app/settings/can_use_superbird"
adb shell supervisorctl restart superbird
adb shell supervisorctl restart chromium
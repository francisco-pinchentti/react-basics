#!/bin/bash

node -v 2>/dev/null;
if [ $? -ne 0 ]; then echo "Please install NodeJS v10.4+"; echo "the suggested way is following: https://github.com/creationix/nvm"; exit 1;fi;

echo "Installing dependencies...";
npm install;

echo "Starting...";
npm start;

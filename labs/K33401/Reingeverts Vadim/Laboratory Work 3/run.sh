#!/bin/bash 
# Makes it so it doesn't matter from which path script is called
script_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P ) # https://stackoverflow.com/a/24112741
cd "$script_path"

# Main microservice
export MAIN_HOST="127.0.0.1"
export MAIN_PORT=3010

# Depot microservice
export DEPOT_HOST="127.0.0.1"
export DEPOT_PORT=3020

# 'CTRL + C' (or 'q') kills only one of 
# the vite servers when bash's '&' is used
npx kill-port $MAIN_PORT
npx kill-port $DEPOT_PORT

# Running in parralel
cd "$script_path/mainService" && npm run dev -- --host $MAIN_HOST --port $MAIN_PORT &
cd "$script_path/depotService" && npm run dev -- --host $DEPOT_HOST --port $DEPOT_PORT



#!/usr/bin/env bash
# Usage:
#       ./deploy [-f]
#   Using -f switch force pushes on heroku master.


usage()
{
    printf "USAGE: ./deploy [-f]\n"
}

current_branch=$(git symbolic-ref --short -q HEAD)

# Check the validity of the args
if [[ -n $1 && $1 = '-f' ]]
then
    printf "Forcing deployment\n"
    gitcmd="git push heroku $current_branch:master -f"
elif [[ -n $1 && $1 != '-f' ]]
then
    printf "Second parameter can only be -f\n"
    exit 1
else
    printf "Deploying\n"
    gitcmd="git push heroku $current_branch:master"
fi

printf "\nExecuting: %s...\n" "$gitcmd"
$($gitcmd)
printf "\nDone\n"

exit 0

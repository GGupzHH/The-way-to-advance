echo 'start'
read -p "Enter branch name >" branchName
read -p "Enter commit message >" message
if [ $(git branch --list $branchName) ]; then
    echo "Branch name $branchName already exists."
    read -p "Enter branch name >" branchName
fi
git checkout -b $branchName
npm run build:intranet
git add -A
git commit -m "$message"
git checkout dev
git pull
git merge $branchName --no-ff -m "$message"
git push
read -p "Delete this branch, please input the option ==> Yes: 1 | No: 2 >" deleteFlag
if [ "$deleteFlag" -eq "1" ]; then
    git branch -D $branchName
else
    exit 8
fi
echo 'end'

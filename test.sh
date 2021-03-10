cd /home/ec2-user
sudo rm -Rf temp
mkdir temp
cd /home/ec2-user/analyticsDb
~/.nvm/versions/node/v15.11.0/bin/node src/getDbBackupData.js
LOG_FILE="$(date +"%Y_%m_%d_%I_%M_%p").log"
touch $LOG_FILE

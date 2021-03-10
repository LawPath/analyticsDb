LOG_FILE="$(date +"%Y_%m_%d_%I_%M_%p").log"
touch $LOG_FILE
cd /home/ec2-user
cd /home/ec2-user/analyticsDb
docker-compose down
cd ~
cd data
cp dbms/auth ~/auth
cd ~
sudo rm -Rf temp
sudo rm -Rf logs
sudo rm -Rf data
cd ~
mkdir temp
cd ~
mkdir data
mkdir logs
cd data
mkdir databases
mkdir dbms
cd databases
mkdir graph.db
cd /home/ec2-user/analyticsDb
node ./src/getDbBackupData.js >> $LOG_FILE
cd /home/ec2-user/temp
sudo tar -xvzf graph.tar.gz
cd /home/ec2-user/temp/graph.db/databases/graph.db
ls
sudo mv ./* /home/ec2-user/data/databases/graph.db
cd ~
sudo mv auth /home/ec2-user/data/dbms/auth
docker rm $(docker ps -a -q)
cd /home/ec2-user/analyticsDb
docker-compose up -d

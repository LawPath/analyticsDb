# Lawpath analytics DB

### Cloned version of the production DB to be used for analytics

http://analytics-db.lawpath.com

Service is running on an EC2 instance

Base setup of EC2 requires running `setup-server.sh`

`getDbBackup.js` will get the most recent backup from Graphene and save it in the directory to be accesssed by Neo4j

then run `docker-compose up -d`

cron job has been setup

`0 2 * * * /home/ec2-user/.nvm/versions/node/v13.10.1/bin/node /home/ec2-user/resources/analyticsDb/src/getDbBackupData.js`


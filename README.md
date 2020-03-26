# Lawpath analytics DB

### Cloned version of the production DB to be used for analytics

http://analytics-db.lawpath.com

Service is running on an EC2 instance

Base setup of EC2 requires running `ec2-setup-server.sh`

`getDbBackup.js` will get the most recent backup from Graphene and save it in the directory to be accesssed by Neo4j

to start the container 
- `sudo service docker start`
- `docker-compose up -d`

cron job has been setup

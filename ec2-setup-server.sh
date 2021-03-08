sudo yum update
sudo yum install docker -y
sudo usermod -a -G docker ec2-user
sudo curl -L https://github.com/docker/compose/releases/download/1.21.0/docker-compose-`uname -s`-`uname -m` | sudo tee /usr/local/bin/docker-compose > /dev/null
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose --version
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
node -e "console.log('Running Node.js ' + process.version)"
npm install yarn -g
(crontab -l 2>/dev/null; echo "0 2 * * * /home/ec2-user/.nvm/versions/node/v13.10.1/bin/node /home/ec2-user/resources/analyticsDb/src/getDbBackupData.js") | crontab -
sudo service docker start
docker-compose up -d


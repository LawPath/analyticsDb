require('dotenv').config();
const fetch = require('node-fetch');
const fs = require('fs');
const tar = require('tar');
const os = require('os');
const mkdirp = require('mkdirp');
const getParameters = require('./clients/getParameters');

const download = async (url, destPath) => {
  console.log('downloading backup');
  const res = await fetch(url);
  await new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(destPath);
    res.body.pipe(fileStream);
    res.body.on('error', (err) => {
      reject(err);
    });
    fileStream.on('finish', () => {
      resolve();
    });
  });
};

const getBackupUrl = async (grapheneBaseUrl, headers, prodDbId) => {
  console.log('getting backup url');
  const backupResponse = await fetch(
    `${grapheneBaseUrl}/databases/${prodDbId}/backups`,
    { headers },
  );
  const backups = await backupResponse.json();
  const backupId = backups[0].id;
  const packageRes = await fetch(
    `${grapheneBaseUrl}/databases/${prodDbId}/backups/${backupId}/package`,
    { headers },
  );
  const { backupUrl } = await packageRes.json();
  return backupUrl;
};

const run = async () => {
  try {
    const [grapheneAuthToken, grapheneBaseUrl, prodDbId] = await getParameters([
      'ssm:/Production/analyticsDb/grapheneAuthToken',
      'ssm:/Production/analyticsDb/grapheneBaseUrl',
      'ssm:/Production/analyticsDb/prodDbId',
    ]);

    const headers = {
      api_key: grapheneAuthToken,
    };

    const homedir = os.homedir();
    const backupUrl = await getBackupUrl(grapheneBaseUrl, headers, prodDbId);
    mkdirp(`${homedir}/temp`);
    await download(backupUrl, `${homedir}/temp/graph.tar.gz`);
    mkdirp(`${homedir}/neo4j/data/databases`);
    console.log('extracting tar');
    tar
      .extract({
        file: `${homedir}/temp/graph.tar.gz`,
        cwd: `${homedir}/neo4j/data/databases`,
      })
      .then(() =>
        fs.appendFile(
          `${homedir}/neo4j/logs/download-logs.txt`,
          `Last downloaded ${Date(Date.now()).toString()}\n`,
          (err) => {
            if (err) {
              console.log(err);
            }
            console.log('completed');
          },
        ),
      );
  } catch (err) {
    console.log(err);
  }
};

run();

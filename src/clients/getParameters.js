const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const pattern = /^ssm:(.+)/;
const ssm = new AWS.SSM({ region: process.env.Region });

module.exports = async (parameters) => {
  const Names = parameters.reduce((names, parameter) => {
    const matches = parameter.match(pattern);
    if (matches) {
      names.push(matches[1]);
    }
    return names;
  }, []);
  const decodedParameters =
    Names.length &&
    (await ssm
      .getParameters({
        Names,
        WithDecryption: true,
      })
      .promise());
  return parameters.reduce((names, parameter) => {
    const matches = parameter.match(pattern);
    if (matches) {
      names.push(
        decodedParameters.Parameters.find(
          (decoded) => decoded.Name === matches[1],
        ).Value,
      );
    } else {
      names.push(parameter);
    }
    return names;
  }, []);
};

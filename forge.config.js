/* eslint-disable */
const fs = require('fs');

fs.readFileSync('.env').toString().split('\n').forEach(kvp => {
  const [ key, value ] = kvp.split('=');
  process.env[key] = value;
});

module.exports = {
  packagerConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "uwt_softphone"
      }
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: [
        "darwin"
      ]
    },
    {
      name: "@electron-forge/maker-deb",
      config: {}
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {}
    }
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        draft: false,
        repository: {
          owner: 'United-World-Telecom',
          name: 'uwt-softphone-desktop',
        }
      }
    }
  ]
}
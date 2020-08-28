/* eslint-disable */
const fs = require('fs');
const path = require('path');

fs.readFileSync('.env').toString().split('\n').forEach(kvp => {
  const [ key, value ] = kvp.split('=');
  process.env[key] = value;
});

module.exports = {
  packagerConfig: {
    icon: path.join(__dirname, "src/assets", "gcf.ico"),
    ignore: [
      /\.ts$/,
      /(\/|\\)\..*$/,
      /\.js\.map$/,
      'forge.config.js',
      'package-lock.json',
      'tsconfig.json'
    ]
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "uwt_softphone",
        iconUrl: path.join(__dirname, "src/assets", "gcf.ico"),
        setupIcon: path.join(__dirname, "src/assets", "gcf.ico")
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
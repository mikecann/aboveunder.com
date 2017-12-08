const sync = require('azure-sync');
const path = require('path');
const chalk = require('chalk');

const config = {
    account: "aboveunder",
    accessKey: "SET ME",
    container: {
        name: "web4",
        cache: [{
            match: [], // "path/to/your/file", "path/to/your/file2"
            rule: "no-cache, no-store, must-revalidate"
        }, {
            match: "*",
            rule: "public, max-age=31536000"
        }],
        policy: {
            publicAccessLevel: "blob"
        }
    },
    progress: true, // defaults to false 
    service: {
        properties: {
            Cors: {
                CorsRules: [{
                    MaxAgeInSeconds: 15,
                    AllowedOrigins: ["*"],
                    AllowedMethods: ["GET", "PUT", "OPTIONS"],
                    AllowedHeaders: ["origin", "x-ms-blob-type*", "Content-Type*"],
                    ExposedHeaders: ["origin", "x-ms-blob-type*", "Content-Type*"]
                }]
            }
        },
        overwrite: true // defaults to false 
    },
    sources: [{
        dir: `.`,
        pattern: '/**/*',
        include: false //include folder or not (ex: dist/file.js) 
    }],
    verbose: true // if you want to see the current uploaded file 
};

const azure_conf = {
    account: config.account,
    accessKey: config.accessKey,
    container: {
        name: config.container.name,
        cache: config.container.cache,
        policy: config.container.policy
    },
    progress: true,
    service: config.service,
    sources: [{
        dir: `.`,
        pattern: '/**/*',
        include: false
    }],
    verbose: true
};

process.chdir('./out');

sync(azure_conf)
    .then(() => console.log(chalk.yellow(`Finished`)))
    .catch(err => console.log(chalk.red(`Error found when azure-syncing: ${err}`)));
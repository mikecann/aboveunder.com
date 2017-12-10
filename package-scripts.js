const { series, concurrent, crossEnv } = require("nps-utils");

module.exports = {
  scripts: {
    clean: series('rimraf out', 'rimraf', 'rimraf pages', 'rimraf components'),
    build: {
      ts: "tsc",
      next: "next build",
      default: series.nps("build.ts", "build.next")
    },
    watch: {
      ts: "tsc -w"
    },
    dev: {
      default: concurrent.nps('watch.ts', 'dev.node'),
      node: "node ."
    },
    export: {
      next: "next export",
      staging: crossEnv(`ROOT_URL="https://staging.aboveunder.com" nps export`),
      prod: crossEnv(`ROOT_URL="https://aboveunder.com" nps export`),
      default: series.nps("build", "export.next")
    },
    serve: {
      default: "serve out"
    },
    default: series("build", 'serve'),
    tools: {
      importWp: 'node tools/importWPProducts',
      importFitz: 'node tools/importFitzPrice',
    },
    deploy: {
      default: "node deploy.js",
      staging: series("export.staging", "upload.staging"),
      prod: series("export.prod", "upload.prod"),
    },
    upload: {
      staging: "node upload-azure.js web4",
      prod: "node upload-azure.js web5"
    }
  }
};

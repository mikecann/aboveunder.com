const { series, concurrent, crossEnv } = require("nps-utils");

const snipcartTestKey = "NDYwN2FhNmUtNzZmNy00Y2I4LTkyODUtMDMyOGNhMDIzZTFjNjM2NDc5ODczMzIxNTUyOTU5";
const snipcartLiveKey = "NDdmNDI1NzYtZjhmNC00YzQxLWFjYWItY2U3OWQ5NTMzZWQ2NjM2NDc5ODczMzIxNTUyOTU5";

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
      staging: crossEnv(`ROOT_URL="https://staging.aboveunder.com" SNIPCART_KEY=${snipcartTestKey} nps export`),
      prod: crossEnv(`ROOT_URL="https://aboveunder.com" SNIPCART_KEY=${snipcartLiveKey} nps export`),
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
      staging: series.nps("export.staging", "upload.staging"),
      prod: series.nps("export.prod", "upload.prod"),
    },
    upload: {
      staging: "node upload-azure.js web4",
      prod: "node upload-azure.js web5"
    }
  }
};

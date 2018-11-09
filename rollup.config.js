import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

import pkg from "./package.json";

const cjsOrEs = ({ file, format, babelConfig = {} }) => ({
  input: "src/index.js",
  output: {
    file,
    format
  },
  plugins: [
    babel({
      ...babelConfig,
      exclude: "node_modules/**"
    })
  ],
  external: [
    "axios",
    "date-fns/format",
    "date-fns/is_valid",
    "date-fns/parse",
    "qs"
  ]
});

const umd = ({ minify = false } = {}) => {
  const config = {
    input: "src/index.js",
    output: {
      name: "swedenPrayerTimes",
      file: minify ? pkg.browser.replace(/\.js$/, ".min.js") : pkg.browser,
      format: "umd",
      globals: {
        axios: "axios"
      }
    },
    plugins: [resolve(), commonjs(), babel({ exclude: "node_modules/**" })],
    external: ["axios"]
  };

  if (minify) {
    config.plugins.push(terser());
  }

  return config;
};

export default [
  umd(),
  umd({ minify: true }),
  cjsOrEs({ file: pkg.module, format: "es" }),
  cjsOrEs({
    file: pkg.main,
    format: "cjs",
    babelConfig: {
      babelrc: false,
      presets: [
        [
          "@babel/env",
          {
            modules: false,
            targets: "node 8"
          }
        ]
      ]
    }
  })
];

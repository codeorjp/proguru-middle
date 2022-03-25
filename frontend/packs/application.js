/* eslint-disable @typescript-eslint/no-var-requires */
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "core-js/stable";
import "regenerator-runtime/runtime";

const componentRequireContext = require.context("components", true);
const ReactRailsUJS = require("react_ujs");

ReactRailsUJS.useContext(componentRequireContext);

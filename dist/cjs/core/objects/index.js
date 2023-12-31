"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = exports.CompiledRules = exports.Action = exports.Resource = exports.Scope = void 0;
const scope_1 = require("./scope");
Object.defineProperty(exports, "Scope", { enumerable: true, get: function () { return scope_1.Scope; } });
const resource_1 = require("./resource");
Object.defineProperty(exports, "Resource", { enumerable: true, get: function () { return resource_1.Resource; } });
const action_1 = require("./action");
Object.defineProperty(exports, "Action", { enumerable: true, get: function () { return action_1.Action; } });
const compiledRules_1 = require("./compiledRules");
Object.defineProperty(exports, "CompiledRules", { enumerable: true, get: function () { return compiledRules_1.CompiledRules; } });
const rule_1 = require("./rule");
Object.defineProperty(exports, "Rule", { enumerable: true, get: function () { return rule_1.Rule; } });

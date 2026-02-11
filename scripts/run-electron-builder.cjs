/**
 * 加载 .env 后再执行 electron-builder，确保 CSC_LINK、CSC_KEY_PASSWORD 等变量对签名生效。
 * 会展开路径中的 %USERPROFILE% 等 Windows 环境变量。
 */
require('dotenv').config();
const { execSync } = require('child_process');
const path = require('path');

function expandEnvVars(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/%([^%]+)%/g, (_, name) => process.env[name] ?? `%${name}%`);
}

if (process.env.CSC_LINK) {
  process.env.CSC_LINK = path.resolve(expandEnvVars(process.env.CSC_LINK));
}
if (process.env.WIN_CSC_LINK) {
  process.env.WIN_CSC_LINK = path.resolve(expandEnvVars(process.env.WIN_CSC_LINK));
}

execSync('npx electron-builder', { stdio: 'inherit', env: process.env });

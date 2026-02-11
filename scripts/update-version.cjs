/**
 * 版本信息生成脚本
 * 自动获取当前 git commit hash 前 7 位，写入 version.json
 * 用途：在应用「关于」面板中显示构建版本号
 *
 * 使用方法：node scripts/update-version.cjs
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  // 获取 git commit hash 前 7 位
  const hash = execSync('git rev-parse --short=7 HEAD', {
    encoding: 'utf-8',
  }).trim();

  // 获取当前分支名
  const branch = execSync('git rev-parse --abbrev-ref HEAD', {
    encoding: 'utf-8',
  }).trim();

  const versionInfo = {
    hash,
    branch,
    buildTime: new Date().toISOString(),
  };

  const outputPath = path.join(__dirname, '..', 'version.json');
  fs.writeFileSync(outputPath, JSON.stringify(versionInfo, null, 2) + '\n');

  console.log(`✅ 版本信息已生成: ${hash} (${branch})`);
} catch (error) {
  console.warn('⚠️  无法获取 git 信息，使用默认值');

  // 在非 git 环境下使用默认值
  const fallback = {
    hash: 'unknown',
    branch: 'unknown',
    buildTime: new Date().toISOString(),
  };

  const outputPath = path.join(__dirname, '..', 'version.json');
  fs.writeFileSync(outputPath, JSON.stringify(fallback, null, 2) + '\n');
}

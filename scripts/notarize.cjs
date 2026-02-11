// macOS 公证脚本
// electron-builder 在签名完成后会自动调用此脚本
// 参考：https://github.com/electron/notarize

const { notarize } = require('@electron/notarize');

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;

  // 仅在 macOS 上执行公证
  if (electronPlatformName !== 'darwin') {
    console.log('⏭️  跳过公证：非 macOS 平台');
    return;
  }

  // 检查是否配置了公证所需的环境变量
  if (!process.env.APPLE_API_KEY_ID) {
    console.log('⏭️  跳过公证：未设置 APPLE_API_KEY_ID 环境变量');
    return;
  }

  const appName = context.packager.appInfo.productFilename;
  const appPath = `${appOutDir}/${appName}.app`;

  console.log(`🔐 正在公证: ${appPath}`);
  console.log('⏳ 此过程通常需要 2-10 分钟，请耐心等待...');

  try {
    await notarize({
      // 方式一：使用 App Store Connect API Key（推荐）
      appPath,
      appleApiKey: process.env.APPLE_API_KEY_PATH,
      appleApiKeyId: process.env.APPLE_API_KEY_ID,
      appleApiIssuer: process.env.APPLE_API_ISSUER,

      // 方式二：使用 Apple ID + App 专用密码（已过时，不推荐）
      // appBundleId: 'YourAppID',
      // appleId: process.env.APPLE_ID,
      // appleIdPassword: process.env.APPLE_ID_PASSWORD,
      // teamId: process.env.APPLE_TEAM_ID,
    });

    console.log('✅ 公证成功！');
  } catch (error) {
    console.error('❌ 公证失败:', error.message);
    throw error;
  }
};

// 腾讯云开发的一些API
import cloudbase from '@cloudbase/js-sdk';

import { env } from './constant';

export const app = cloudbase.init({
    env: 'hello-cloudbase-4gwpicbvc7a2c471' // 您的环境id
  })

  export const auth = app.auth({
    persistence: 'local',
});

export const db = app.database();

export const _ = db.command;

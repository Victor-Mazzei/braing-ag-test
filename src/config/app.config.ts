import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  port: parseInt(process.env.PORT) || 3000,
  node_env: process.env.NODE_ENV,
  api_title: process.env.API_TITLE,
  api_description: process.env.API_DESCRIPTION,
  api_version: process.env.API_VERSION
}));

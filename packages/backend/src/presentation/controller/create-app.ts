import type { HealthResponse } from '@app-template/shared';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { getHealth } from '../../application/health/get-health';
import { registerAuthRoute } from './routes/auth-route';
import { registerHealthRoute } from './routes/health-route';

export interface CreateAppOptions {
  frontendOrigin: string;
  authHandler: (request: Request) => Response | Promise<Response>;
  getHealth?: () => HealthResponse;
}

/**
 * Assemble the controller layer application.
 * Routing and request boundaries live here, while use cases stay inside.
 */
export const createApp = (options: CreateAppOptions) => {
  const app = new Hono();
  const getHealthUseCase = options.getHealth ?? getHealth;

  app.use(
    '*',
    cors({
      origin: options.frontendOrigin,
      credentials: true,
    }),
  );

  registerHealthRoute(app, { getHealth: getHealthUseCase });
  registerAuthRoute(app, { authHandler: options.authHandler });

  return app;
};

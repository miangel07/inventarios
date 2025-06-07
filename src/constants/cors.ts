import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
/*     origin: process.env.CORS_ORIGIN?.split(',') || true, */
export const CORS: CorsOptions = {
    origin: process.env.CORS_ORIGIN?.split(',') || true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true
};

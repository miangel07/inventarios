// src/common/utils/imageFileFilter.ts
import { Request } from 'express';

export const imageFileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
): void => {
  if (!file.mimetype.match(/^image\/(jpeg|png|gif|webp|jpg)$/)) {
    return callback(new Error('Solo se permiten archivos de imagen.'), false);
  }
  callback(null, true);
};

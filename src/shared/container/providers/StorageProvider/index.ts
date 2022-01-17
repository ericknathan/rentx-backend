import { container } from 'tsyringe';

import { IStorageProvider } from './IStorageProvider';
import { LocalStorageProvider } from './implementations/LocalStorageProvider';
import { S3StorageProvider } from './implementations/S3StorageProvider';

const diskStorage = {
  local: container.resolve(LocalStorageProvider),
  s3: container.resolve(S3StorageProvider)
}

container.registerInstance<IStorageProvider>(
  'StorageProvider',
  diskStorage[process.env.STORAGE_PROVIDER]
);
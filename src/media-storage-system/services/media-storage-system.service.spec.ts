import { Test, TestingModule } from '@nestjs/testing';
import { MediaStorageSystemService } from './media-storage-system.service';

describe('MediaStorageSystemService', () => {
  let service: MediaStorageSystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaStorageSystemService],
    }).compile();

    service = module.get<MediaStorageSystemService>(MediaStorageSystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

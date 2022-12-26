import { Test, TestingModule } from '@nestjs/testing';
import { ListService } from './todo-list.service';

describe('Service', () => {
  let service: ListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListService],
    }).compile();

    service = module.get<ListService>(ListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TeamRepositoryService } from './team.repository.service';

describe('TeamRepositoryService', () => {
  let service: TeamRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamRepositoryService],
    }).compile();

    service = module.get<TeamRepositoryService>(TeamRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

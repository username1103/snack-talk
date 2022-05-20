import { CommonConfigService } from '@app/common-config';
import { EntityService } from '@app/entity';
import { UtilsService } from '@app/utils';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
  constructor(
    private readonly commonConfigService: CommonConfigService,
    private readonly entityService: EntityService,
    private readonly utilsService: UtilsService,
  ) {}
  getHello(): string {
    return (
      this.commonConfigService.hello() +
      this.entityService.hello() +
      this.utilsService.hello()
    );
  }
}

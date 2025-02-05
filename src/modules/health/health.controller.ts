import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HealthIndicatorResult,
  HealthIndicatorStatus,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

interface IsUp extends HealthIndicatorResult {
  isUp: { status: HealthIndicatorStatus };
}

const isAlwaysUp = (): IsUp => {
  return {
    isUp: {
      status: 'up',
    },
  };
};

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  /**
   * A healthcheck.
   *
   * Be careful of how you check the database. If the database goes down
   * MAY NOT want your entire app to go down as parts of it may continue to
   * function regardless.
   *
   * If this returns not 200 then your orchestartor will start to
   * destroy your containers.
   */
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([isAlwaysUp]);
  }
}

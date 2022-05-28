import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {Organisation} from 'src/model/organisation.entity';
import {Profile} from 'src/model/profile.entity';
import {User} from 'src/model/user.entity';
import {AdminController} from './admin.controller';
import {AdminService} from './admin.service';
import {TokensModule} from 'src/tokens/tokens.module';
import {SharedModule} from 'src/utils/shared.module';

@Module({
  imports: [
    SharedModule,
    TokensModule,
    TypeOrmModule.forFeature([User, Profile, Organisation]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [TypeOrmModule, AdminService],
})
export class AdminModule {}

import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Organisation} from 'src/model/organisation.entity';

import {TokensModule} from 'src/tokens/tokens.module';
import {OrganisationsController} from './organisations.controller';
import {OrganisationsService} from './organisations.service';
import {SharedModule} from 'src/utils/shared.module';
import {Profile} from 'src/model/profile.entity';
import {User} from 'src/model/user.entity';
import {ProfilesModule} from 'src/profiles/profiles.module';
import {UserModule} from 'src/user/user.module';

@Module({
  imports: [
    SharedModule,
    TokensModule,
    ProfilesModule,
    UserModule,
    TypeOrmModule.forFeature([Organisation, Profile, User]),
  ],
  controllers: [OrganisationsController],
  providers: [OrganisationsService],
  exports: [TypeOrmModule, OrganisationsService],
})
export class OrganisationsModule {}

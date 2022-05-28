import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {TeamsService} from './teams.service';
import {TeamsController} from './teams.controller';
import {Team} from 'src/model/team.entity';
import {TokensModule} from 'src/tokens/tokens.module';
import {UserModule} from 'src/user/user.module';
import {ProfilesModule} from 'src/profiles/profiles.module';
import {OrganisationsModule} from 'src/organisations/organisations.module';

@Module({
  imports: [
    TokensModule,
    TypeOrmModule.forFeature([Team]),
    UserModule,
    ProfilesModule,
    OrganisationsModule,
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
  exports: [TypeOrmModule, TeamsService],
})
export class TeamsModule {}

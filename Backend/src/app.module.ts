import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {APP_GUARD} from '@nestjs/core';
import {ThrottlerModule, ThrottlerGuard} from '@nestjs/throttler';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {configService} from 'config/config.service';

import {AdminModule} from './admin/admin.module';
import {AuthModule} from './auth/auth.module';
import {CardModule} from './cards/card.module';
import {EventsModule} from './events/events.module';
import {MeetingModule} from './meetings/meeting.module';
import {OrganisationsModule} from './organisations/organisations.module';
import {ProfilesModule} from './profiles/profiles.module';
import {ProfileSettingsModule} from './profileSettings/profileSettings.module';
import {SubscriptionModule} from './subscription/subscription.module';
import {TeamsModule} from './teams/teams.module';
import {TokensModule} from './tokens/tokens.module';
import {UserModule} from './user/user.module';

import {JwtAuthGuard} from './guards/jwtAuth.guard';
import {SharedModule} from './utils/shared.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ConfigModule.forRoot({isGlobal: true}),
    ThrottlerModule.forRoot({ttl: 30, limit: 90}),
    AdminModule,
    AuthModule,
    CardModule,
    EventsModule,
    MeetingModule,
    OrganisationsModule,
    ProfilesModule,
    ProfileSettingsModule,
    SharedModule,
    SubscriptionModule,
    TokensModule,
    UserModule,
    TeamsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

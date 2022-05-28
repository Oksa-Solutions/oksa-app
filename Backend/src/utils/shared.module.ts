import {Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_TOKEN_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtModule],
  exports: [JwtModule, PassportModule],
})
export class SharedModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt/dist';
import { PassportModule } from '@nestjs/passport/dist';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthMutationResolver } from './resolvers/auth.mutations.resolver';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  providers: [AuthService, AuthMutationResolver, LocalStrategy, JwtStrategy],
  imports: [UserModule, PassportModule, ConfigModule, JwtModule.registerAsync(
    {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService) => ({
        secret: ConfigService.get('JWT_SECRET'),
        signOptions: {expiresIn: '10m' }
      })
    }
  )]
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksResolver } from './links.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { TagModule } from 'src/tag/tag.module';

@Module({
  providers: [LinksResolver, LinksService, PrismaService, AuthService],
  imports: [TagModule], // Import TagModule here
  exports: [LinksService],
})
export class LinksModule {}

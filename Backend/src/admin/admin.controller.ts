import {
  Req,
  Controller,
  Get,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {Request} from 'express';

import {AdminGuard} from 'src/guards/admin.guard';
import {AdminService} from './admin.service';
import {TokensService} from 'src/tokens/tokens.service';

@ApiTags('Admin')
@UseGuards(AdminGuard)
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly tokenService: TokensService,
  ) {}

  @Get('organisations')
  async getOrganisations(@Req() req: Request): Promise<any> {
    try {
      const organisationsRes = await this.adminService.getOrganisations(
        this.tokenService.isSuperAdmin(req),
        this.tokenService.getUuidFromToken(req),
      );
      if (organisationsRes.ok) {
        return organisationsRes.data;
      } else {
        throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
      }
    } catch (err) {
      console.error(err);
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}

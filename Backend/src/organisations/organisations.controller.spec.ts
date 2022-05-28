import {Test, TestingModule} from '@nestjs/testing';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Request} from 'express';

import {TokensService} from '../../src/tokens/tokens.service';
import {mockedConfigService} from '../../src/utils/mocks/config.service';
import {mockedJwtService} from '../../src/utils/mocks/jwt.service';
import {OrganisationsController} from './organisations.controller';
import {OrganisationsService} from './organisations.service';
import {Organisation} from 'src/model/organisation.entity';
import {mockOrganisationRepository} from 'src/utils/mocks/repositories';
import {mockedOrganisationsService} from 'src/utils/mocks/organisations.service';
import {
  createOrganisationOk,
  deleteMeetingOk,
  getSampleOrganisation,
  getSampleUser,
  updateOrganisationOk,
} from 'test/testData';

describe('OrganisationsController', () => {
  let controller: OrganisationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganisationsController],
      providers: [
        OrganisationsService,
        {
          provide: getRepositoryToken(Organisation),
          useValue: mockOrganisationRepository,
        },
        TokensService,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
      ],
    })
      .overrideProvider(OrganisationsService)
      .useValue(mockedOrganisationsService)
      .compile();

    controller = module.get<OrganisationsController>(OrganisationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an organisation', async () => {
    const mockReq = {
      body: createOrganisationOk,
    } as Request;
    expect(await controller.createOrganisation(mockReq.body, mockReq)).toEqual({
      uuid: getSampleOrganisation().uuid,
      name: getSampleOrganisation().name,
      admins: getSampleOrganisation().admins,
      users: getSampleOrganisation().users,
      contactPerson: getSampleOrganisation().contactPerson,
      contactEmail: getSampleOrganisation().contactEmail,
    });
  });

  it('should read an organisation', async () => {
    const uuid = getSampleOrganisation().uuid;
    expect(await controller.readOrganisation({uuid})).toEqual({
      uuid: getSampleOrganisation().uuid,
      name: getSampleOrganisation().name,
      admins: getSampleOrganisation().admins,
      users: getSampleOrganisation().users,
      contactPerson: getSampleOrganisation().contactPerson,
      contactEmail: getSampleOrganisation().contactEmail,
    });
  });

  it('should update an organisation', async () => {
    const mockReq = {
      body: updateOrganisationOk,
    } as Request;
    expect(await controller.updateOrganisation(mockReq.body, mockReq)).toEqual({
      uuid: getSampleOrganisation().uuid,
      name: mockReq.body.name,
      admins: getSampleOrganisation().admins,
      users: getSampleOrganisation().users,
      contactPerson: getSampleOrganisation().contactPerson,
      contactEmail: getSampleOrganisation().contactEmail,
    });
  });

  it('should delete an organisation', async () => {
    const mockReq = {
      body: deleteMeetingOk,
    } as Request;
    expect(await controller.deleteOrganisation(mockReq.body)).toEqual(
      `Deleted organisation with UUID ${mockReq.body.uuid}`,
    );
  });

  // Failing tests
  it('should fail to create an organisation', async () => {
    const mockReq = {
      body: {},
    } as Request;
    await expect(
      controller.createOrganisation(mockReq.body, mockReq),
    ).rejects.toThrowError('Missing key(s)');
  });

  it('should fail to read an organisation', async () => {
    const uuid = '';
    await expect(controller.readOrganisation({uuid})).rejects.toThrowError(
      'Missing key(s)',
    );
  });

  it('should fail to update an organisation', async () => {
    const mockReq = {
      body: {},
    } as Request;
    await expect(
      controller.updateOrganisation(mockReq.body, mockReq),
    ).rejects.toThrowError('Missing key(s)');
  });

  it('should fail to delete an organisation', async () => {
    const mockReq = {
      body: {},
    } as Request;
    await expect(
      controller.deleteOrganisation(mockReq.body),
    ).rejects.toThrowError('Missing key(s)');
  });
});

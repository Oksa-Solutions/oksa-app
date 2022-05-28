import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';

import {Organisation} from 'src/model/organisation.entity';
import {mockOrganisationRepository} from 'src/utils/mocks/repositories';
import {
  createOrganisationOk,
  deleteOrganisationOk,
  getSampleOrganisation,
  readOrganisationOk,
  updateOrganisationOk,
} from 'test/testData';
import {OrganisationsService} from './organisations.service';

describe('OrganisationsService', () => {
  let service: OrganisationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganisationsService,
        {
          provide: getRepositoryToken(Organisation),
          useValue: mockOrganisationRepository,
        },
      ],
    }).compile();

    service = module.get<OrganisationsService>(OrganisationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an organisation', async () => {
    expect(await service.createOrganisation(createOrganisationOk)).toEqual({
      ok: true,
      data: Object.assign(new Organisation(), {
        ...createOrganisationOk,
        uuid: expect.stringMatching(
          /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
        ),
        teams: [],
        createdBy: getSampleOrganisation().lastModifiedBy,
        created: getSampleOrganisation().created,
        lastModified: getSampleOrganisation().lastModified,
      }),
    });
  });

  it('should read an organisation', async () => {
    expect(await service.readOrganisation(readOrganisationOk)).toEqual({
      ok: true,
      data: Object.assign(new Organisation(), getSampleOrganisation()),
    });
  });

  it('should update an organisation', async () => {
    expect(await service.updateOrganisation(updateOrganisationOk)).toEqual({
      ok: true,
      data: Object.assign(getSampleOrganisation(), {
        name: updateOrganisationOk.name,
      }),
    });
  });

  it('should delete an organisation', async () => {
    expect(await service.deleteOrganisation(deleteOrganisationOk)).toEqual({
      ok: true,
      data: `Deleted organisation with UUID ${deleteOrganisationOk.uuid}`,
    });
  });

  // Failing tests
  it('should fail creating an organisation', async () => {
    jest
      .spyOn(mockOrganisationRepository, 'save')
      .mockRejectedValueOnce('Mocked creating organisation failure');
    expect(await service.createOrganisation(createOrganisationOk)).toEqual({
      ok: false,
      data: 'Creating organisation failed',
    });
  });

  it('should fail creating an organisation due organisation already existing', async () => {
    jest.spyOn(mockOrganisationRepository, 'save').mockRejectedValueOnce({
      detail: `Key (name)=(${createOrganisationOk.name}) already exists.`,
    });
    expect(await service.createOrganisation(createOrganisationOk)).toEqual({
      ok: false,
      data: `Organisation with name ${createOrganisationOk.name} already exists`,
    });
  });

  it('should fail reading an organisation', async () => {
    jest
      .spyOn(mockOrganisationRepository, 'findOne')
      .mockRejectedValueOnce('Mocked reading organisation failure');
    expect(await service.readOrganisation(readOrganisationOk)).toEqual({
      ok: false,
      data: 'Reading organisation failed',
    });
  });

  it('should fail updating an organisation', async () => {
    jest
      .spyOn(mockOrganisationRepository, 'save')
      .mockRejectedValueOnce('Mocked updating organisation failure');
    expect(await service.updateOrganisation(updateOrganisationOk)).toEqual({
      ok: false,
      data: 'Updating organisation failed',
    });
  });

  it('should fail deleting an organisation', async () => {
    jest
      .spyOn(mockOrganisationRepository, 'delete')
      .mockRejectedValueOnce('Mocked deleting organisation failure');
    expect(await service.deleteOrganisation(deleteOrganisationOk)).toEqual({
      ok: false,
      data: 'Deleting organisation failed',
    });
  });

  it('should fail deleting an organisation due missing UUID', async () => {
    jest
      .spyOn(mockOrganisationRepository, 'delete')
      .mockResolvedValueOnce({affected: 0});
    expect(await service.deleteOrganisation(deleteOrganisationOk)).toEqual({
      ok: true,
      data: `No organisation with UUID ${deleteOrganisationOk.uuid}`,
    });
  });
});

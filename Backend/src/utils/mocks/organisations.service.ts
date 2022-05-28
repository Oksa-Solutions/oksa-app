import {Organisation} from 'src/model/organisation.entity';
import {createOrganisationDto} from 'src/organisations/dto/createOrganisation.dto';
import {deleteOrganisationDto} from 'src/organisations/dto/deleteOrganisation.dto';
import {readOrganisationDto} from 'src/organisations/dto/readOrganisation.dto';
import {updateOrganisationDto} from 'src/organisations/dto/updateOrganisation.dto';
import {getSampleOrganisation} from 'test/testData';
import {v4 as uuidv4} from 'uuid';

export const mockedOrganisationsService = {
  createOrganisation: jest
    .fn()
    .mockImplementation((dto: createOrganisationDto) => {
      return {
        ok: true,
        data: Object.assign(new Organisation(), {
          uuid: uuidv4(),
          ...getSampleOrganisation(),
          ...dto,
        }),
      };
    }),
  readOrganisation: jest.fn().mockImplementation((dto: readOrganisationDto) => {
    return {
      ok: true,
      data: Object.assign(new Organisation(), {
        uuid: dto.uuid,
        ...getSampleOrganisation(),
      }),
    };
  }),
  updateOrganisation: jest
    .fn()
    .mockImplementation((dto: updateOrganisationDto) => {
      return {
        ok: true,
        data: Object.assign(new Organisation(), {
          ...getSampleOrganisation(),
          ...dto,
        }),
      };
    }),
  deleteOrganisation: jest
    .fn()
    .mockImplementation((dto: deleteOrganisationDto) => {
      return {
        ok: true,
        data: `Deleted organisation with UUID ${dto.uuid}`,
      };
    }),
  updateOrganisationUsers: jest.fn().mockImplementation(() => {
    return {ok: true, data: 'Updating organisation users succeed'};
  }),
  updateOrganisationAdmins: jest.fn().mockImplementation(() => {
    return {ok: true, data: 'Updating organisation admins succeed'};
  }),
};

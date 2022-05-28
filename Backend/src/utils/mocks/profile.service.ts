import {Profile} from 'src/model/profile.entity';
import {createProfileDto} from 'src/profiles/dto/createProfile.dto';
import {deleteProfileDto} from 'src/profiles/dto/deleteProfile.dto';
import {readProfileDto} from 'src/profiles/dto/readProfile.dto';
import {updateProfileDto} from 'src/profiles/dto/updateProfile.dto';
import {getSampleProfile} from 'test/testData';
import {v4 as uuidv4} from 'uuid';

export const mockedProfileService = {
  createProfile: jest.fn().mockImplementation((dto: createProfileDto) => {
    return {
      ok: true,
      data: Object.assign(new Profile(), {
        uuid: uuidv4(),
        ...dto,
      }),
    };
  }),

  readProfile: jest.fn().mockImplementation((dto: readProfileDto) => {
    return {
      ok: true,
      data: Object.assign(new Profile(), {
        uuid: dto.uuid,
        ...getSampleProfile(),
      }),
    };
  }),

  updateProfile: jest.fn().mockImplementation((dto: updateProfileDto) => {
    return {
      ok: true,
      data: Object.assign(new Profile(), {
        ...getSampleProfile(),
        ...dto,
      }),
    };
  }),

  deleteProfile: jest.fn().mockImplementation((dto: deleteProfileDto) => {
    return {
      ok: true,
      data: `Deleted profile with UUID ${dto.uuid}`,
    };
  }),
};

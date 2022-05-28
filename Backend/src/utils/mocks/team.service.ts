import {Team} from 'src/model/team.entity';
import {createTeamDto} from 'src/teams/dto/createTeam.dto';
import {deleteTeamDto} from 'src/teams/dto/deleteTeam.dto';
import {readTeamDto} from 'src/teams/dto/readTeam.dto';
import {updateTeamDto} from 'src/teams/dto/updateTeam.dto';
import {getSampleTeam} from 'test/testData';
import {v4 as uuidv4} from 'uuid';

export const mockedTeamService = {
  createTeam: jest.fn().mockImplementation((dto: createTeamDto) => {
    return {
      ok: true,
      data: Object.assign(new Team(), {
        uuid: uuidv4(),
        ...createTeamDto.toEntity(dto),
      }),
    };
  }),

  findOneTeam: jest.fn().mockImplementation((dto: readTeamDto) => {
    return {
      ok: true,
      data: Object.assign(new Team(), {
        uuid: dto.uuid,
        ...getSampleTeam(),
      }),
    };
  }),

  updateTeam: jest.fn().mockImplementation((dto: updateTeamDto) => {
    return {
      ok: true,
      data: Object.assign(new Team(), {
        ...getSampleTeam(),
        ...dto,
      }),
    };
  }),

  deleteTeam: jest.fn().mockImplementation((dto: deleteTeamDto) => {
    return {
      ok: true,
      data: `Deleted team with UUID ${dto.uuid}`,
    };
  }),
};

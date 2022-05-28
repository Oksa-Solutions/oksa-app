import {CategoryInterface} from 'src/cards/interfaces/card.interfaces';
import {createMeetingDto} from 'src/meetings/dto/createMeeting.dto';
import {DeleteCategoryDto} from 'src/meetings/dto/DeleteCategory.dto';
import {deleteMeetingDto} from 'src/meetings/dto/deleteMeeting.dto';
import {readMeetingDto} from 'src/meetings/dto/readMeeting.dto';
import {updateMeetingDto} from 'src/meetings/dto/updateMeeting.dto';
import {Meeting} from 'src/model/meeting.entity';
import {getSampleMeeting} from 'test/testData';
import {v4 as uuidv4} from 'uuid';

export const mockedMeetingService = {
  createMeeting: jest.fn().mockImplementation((dto: createMeetingDto) => {
    return {
      ok: true,
      data: Object.assign(new Meeting(), {
        ...dto,
        uuid: uuidv4(),
        id: 'abc-123-456',
        status: 'active',
      }),
    };
  }),

  readMeeting: jest.fn().mockImplementation((dto: readMeetingDto) => {
    return {
      ok: true,
      data: Object.assign(new Meeting(), {
        ...getSampleMeeting(),
        uuid: dto.meetingUUID,
      }),
    };
  }),

  updateMeeting: jest.fn().mockImplementation((dto: updateMeetingDto) => {
    return {
      ok: true,
      data: Object.assign(new Meeting(), {
        ...getSampleMeeting(),
        ...dto.meeting,
      }),
    };
  }),

  deleteMeeting: jest.fn().mockImplementation((dto: deleteMeetingDto) => {
    return {
      ok: true,
      data: `Deleted meeting with ID ${dto.meeting.id}`,
    };
  }),
  deleteCategory: jest.fn().mockImplementation((dto: DeleteCategoryDto) => {
    const categories = getSampleMeeting().categories.filter(
      (c: CategoryInterface) =>
        dto.categories
          .map((cat: CategoryInterface) => cat.name)
          .includes(c.name),
    );

    return {
      ok: true,
      data: Object.assign(new Meeting(), {
        ...getSampleMeeting(),
        categories,
      }),
    };
  }),
  // getUsersMeetings: jest.fn().mockImplementation(() => {}),
};

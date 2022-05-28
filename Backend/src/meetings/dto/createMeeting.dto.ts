import {ApiProperty} from '@nestjs/swagger';
import {IsPhoneNumber, IsString, IsUUID} from 'class-validator';
import * as bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
import {Meeting} from 'src/model/meeting.entity';
import {Team} from 'src/model/team.entity';
import {Profile} from 'src/model/profile.entity';

export class createMeetingDto implements Readonly<createMeetingDto> {
  @ApiProperty({required: true})
  @IsString()
  name: string;

  @ApiProperty({required: true})
  @IsString()
  password: string;

  @ApiProperty({required: true})
  @IsUUID()
  createdBy: string;

  @ApiProperty({required: true})
  @IsString()
  creatorName: string;

  @ApiProperty({required: true})
  creatorEmail: string;

  @ApiProperty({required: false})
  @IsPhoneNumber('ZZ')
  creatorPhoneNumber?: string;

  @ApiProperty({required: false})
  authorizedUsers?: Profile[];

  @ApiProperty({required: false})
  team?: Team;

  private static from(meeting: Meeting): Partial<Meeting> {
    const newMeeting = Object.assign(new Meeting(), {
      uuid: meeting.uuid,
      name: meeting.name,
      id: meeting.id,
      status: meeting.status,
      teamUuid: meeting?.team?.uuid,
    });
    return newMeeting;
  }

  public static fromEntity(meeting: Meeting): Partial<Meeting> {
    return this.from(meeting);
  }

  public static async toEntity(
    meeting: createMeetingDto,
    id: string,
  ): Promise<Meeting> {
    const status = 'active';
    const hashedPassword: string = await bcrypt.hash(meeting.password, 12);
    const newMeeting = Object.assign(new Meeting(), {
      uuid: uuidv4(),
      createdBy: meeting.createdBy,
      lastModifiedBy: meeting.createdBy,
      name: meeting.name,
      password: hashedPassword,
      creatorName: meeting.creatorName,
      creatorEmail: meeting.creatorEmail,
      creatorPhoneNumber: meeting?.creatorPhoneNumber,
      id: id,
      authorizedUsers: meeting?.authorizedUsers || [],
      status: status,
      categories: [],
      team: meeting.team,
    });
    console.log(newMeeting);
    return newMeeting;
  }
}

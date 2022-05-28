import {ApiProperty} from '@nestjs/swagger';
import {IsUUID} from 'class-validator';

import {Organisation} from 'src/model/organisation.entity';
import {Profile} from 'src/model/profile.entity';
import {readProfileDto} from 'src/profiles/dto/readProfile.dto';

export class readOrganisationProfilesDto
  implements Readonly<readOrganisationProfilesDto>
{
  @ApiProperty({required: true})
  @IsUUID()
  uuid: string;

  private static from(dto: Profile[]): Partial<Profile>[] {
    return dto.map((p: Profile) => {
      return {
        uuid: p.uuid,
        name: p.name,
        email: p.email,
      };
    });
  }

  public static fromEntity(dto: Profile[]): Partial<Profile>[] {
    return this.from(dto);
  }
}

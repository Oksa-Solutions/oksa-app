import {ApiProperty} from '@nestjs/swagger';
import {IsUUID} from 'class-validator';
import {Organisation} from 'src/model/organisation.entity';
import {Profile} from 'src/model/profile.entity';
import {readOrganisationDto} from 'src/organisations/dto/readOrganisation.dto';

export class readProfileDto implements Readonly<readProfileDto> {
  @ApiProperty({required: true})
  @IsUUID()
  uuid: string;

  private static from(dto: Profile): Partial<Profile> {
    const profile = Object.assign(new Profile(), {
      uuid: dto.uuid,
      name: dto.name,
      email: dto?.email || undefined,
      phoneNumber: dto?.phoneNumber || undefined,
      settings: dto?.settings || undefined,
      subscription: dto?.subscription || undefined,
      organisations:
        dto?.organisations?.map((org: Organisation) =>
          readOrganisationDto.fromEntity(org),
        ) || [],
    });
    return profile;
  }

  public static fromEntity(dto: Profile): Partial<Profile> {
    return this.from(dto);
  }
}

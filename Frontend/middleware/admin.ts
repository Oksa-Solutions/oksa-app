import {Middleware, Context} from '@nuxt/types';
import jwt_decode from 'jwt-decode';
import {SUPER_ADMIN} from '~/assets/constants';
import {MeetingInterface} from '~/store/modules/meeting';
import {OrganisationInterface} from '~/store/modules/organisation';
import {ProfileInterface} from '~/store/modules/profile';

// This protects routes which are only for admins
export type tokenType = {
  uuid: string;
  meetings: string[];
  organisations: OrganisationInterface[];
  iat: number;
  exp: number;
};

const adminMiddleware: Middleware = (context: Context) => {
  const authToken =
    context?.store?.state?.modules?.auth?.authToken || undefined;
  if (authToken) {
    const decoded: tokenType = jwt_decode(authToken);
    const organisations = decoded?.organisations;
    const isAdmin: boolean =
      organisations
        ?.map((o: OrganisationInterface) => o.name)
        ?.includes(SUPER_ADMIN) ||
      organisations
        ?.map((o: OrganisationInterface) => o.admins)
        .flat()
        ?.includes(context?.store?.state?.modules?.profile?.uuid) ||
      false;
    if (!isAdmin) {
      return context.redirect('/dashboard');
    }
  } else {
    return context.redirect('/signin');
  }
};

export default adminMiddleware;

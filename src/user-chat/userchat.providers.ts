import { UserChat } from "./entities/userchat.entity";

export const userchatsProviders = [
  {
    provide: 'USERCHATS_REPOSITORY',
    useValue: UserChat,
  },
];
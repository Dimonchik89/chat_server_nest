import { Chat } from "./entities/chat.entity";

export const chatsProviders = [
  {
    provide: 'CHATS_REPOSITORY',
    useValue: Chat,
  },
];
import {nanoid} from "nanoid";
import {
  BasicStorage,
  ChatProvider,
  ExampleChatService,
  AutoDraft
} from "@chatscope/use-chat";
import { Chat } from "./Chat";
// Storage needs to generate id for messages and groups
const messageIdGenerator = () => nanoid();
const groupIdGenerator = () => nanoid();

// Create serviceFactory
const serviceFactory = (storage, updateState) => {
  return new ExampleChatService(storage, updateState);
};

const chatStorage = new BasicStorage({groupIdGenerator, messageIdGenerator});

const ChatComponent = () => {
  return (
    <ChatProvider serviceFactory={serviceFactory} storage={chatStorage} config={{
      typingThrottleTime: 250,
      typingDebounceTime: 900,
      debounceTyping: true,
      autoDraft: AutoDraft.Save | AutoDraft.Restore
    }}>
      <Chat />
    </ChatProvider>
  );
};

export default ChatComponent;

import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';
import MessageType from './message-type.enum';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  beforeEach(() => {
    service.messages = [
      { message: "Switch to Chrome!", type: MessageType.WARNING },
      { message: "Saved successfully!", type: MessageType.SUCCESS },
      { message: "Update failed!", type: MessageType.ERROR }
    ]
  });

  it('addMessage: should add to messages', () => {
    const message = "Hurray!", type = MessageType.SUCCESS;
    service.addMessage(message, type);
    expect(service.messages).toContain({ message, type });
  });

  it('deleteMessage: should remove from messages', () => {
    service.deleteMessage(1);
    expect(service.messages.length).toBe(2);
  });
});

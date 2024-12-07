import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { liveConfig } from './live.config';
import NodeMediaServer from 'node-media-server';

@Injectable()
export class LiveService implements OnModuleDestroy {
  private nms: NodeMediaServer;

  constructor() {
    this.nms = new NodeMediaServer(liveConfig);

    this.nms.run();
  }

  onModuleDestroy() {
    this.nms.stop();
  }
}

import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { liveConfig } from './live.config';
import NodeMediaServer from 'node-media-server';

@Injectable()
export class LiveService implements OnModuleDestroy {
  private nms: NodeMediaServer;

  constructor(private prisma: PrismaService) {
    this.nms = new NodeMediaServer(liveConfig);
    
    this.nms.on('preConnect', async (_id, username) => {
      await this.prisma.streams.update({
        where: { username },
        data: {
          live: true,
          startedAt: new Date().toISOString(),
        }
      });
    });

    this.nms.on('donePublish', async (_id, username) => {
      await this.prisma.streams.update({
        where: { username },
        data: {
          live: false,
          startedAt: null,
        }
      });
    });
    
    this.nms.run();
  }

  onModuleDestroy() {
    this.nms.stop();
  }
}

import * as path from 'path';

export const liveConfig  = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },

  http: {
    port: 8000,
    allow_origin: '*',
    mediaroot: path.resolve(__dirname, '../../media'),
  },
  
  // auth: {
  //   api: true,
  //   play: false,
  //   publish: true,
  // },

  trans: {
    ffmpeg: path.resolve(__dirname, `../../node_modules/ffmpeg/lib`),
    tasks: [
      {
        app: 'live',
        vc: 'copy',
        ac: 'aac',
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
        // dash: true,
        // dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
      },
    ],
  },
};
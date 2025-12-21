'use client';
import {
  VideoPlayer,
  VideoPlayerContent,
  VideoPlayerControlBar,
  VideoPlayerMuteButton,
  VideoPlayerPlayButton,
  VideoPlayerSeekBackwardButton,
  VideoPlayerSeekForwardButton,
  VideoPlayerTimeDisplay,
  VideoPlayerTimeRange,
  VideoPlayerVolumeRange,
} from '@/components/ui/shadcn-io/video-player';
import { cn } from '@/lib';
import ReactPlayer from 'react-player';

const PlayerBox = ({ className, link }: any) => (
  <VideoPlayer
    className={cn(
      'overflow-hidden w-full m-auto mx-auto h-[400px] xl:h-[500px] rounded-lg',
      className
    )}
  >
    <ReactPlayer
      slot="media"
      src={link}
      controls={true}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
    <VideoPlayerControlBar>
      <VideoPlayerPlayButton />
      <VideoPlayerSeekBackwardButton />
      <VideoPlayerSeekForwardButton />
      <VideoPlayerTimeRange />
      <VideoPlayerTimeDisplay showDuration />
      <VideoPlayerMuteButton />
      <VideoPlayerVolumeRange />
    </VideoPlayerControlBar>
  </VideoPlayer>
);

export default PlayerBox;

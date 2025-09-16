"use client";
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
} from "@/components/ui/shadcn-io/video-player";
import { cn } from "@/lib";

const PlayerBox = ({ className }: any) => (
  <VideoPlayer
    className={cn(
      `overflow-hidden flex flex-col bg-figma-card justify-center max-w-6xl m-auto h-[300px] md:h-[500px] rounded-lg border-none`,
      className
    )}
  >
    <VideoPlayerContent
      crossOrigin=""
      muted
      preload="auto"
      slot="media"
      src="https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/high.mp4"
    />
    <VideoPlayerControlBar className="bg-[red] hover:!bg-transparent">
      <VideoPlayerPlayButton className="text-[#fd7701] hover:text-[#fd7701]" />
      <VideoPlayerSeekBackwardButton className="text-[#fd7701] hover:text-[#fd7701]" />
      <VideoPlayerSeekForwardButton className="text-[#fd7701] hover:text-[#fd7701]" />
      <VideoPlayerTimeRange />
      <VideoPlayerTimeDisplay className="text-[#fd7701] hover:bg-transparent hover:text-[#fd7701]" showDuration />
      <VideoPlayerMuteButton className="text-[#fd7701] hover:text-[#fd7701]" />
      <VideoPlayerVolumeRange className="text-[#fd7701] hover:text-[#fd7701]" />
    </VideoPlayerControlBar>
  </VideoPlayer>
);

export default PlayerBox;

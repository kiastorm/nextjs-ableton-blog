import { useEffect, useState } from "react";
import { useAudioPlayer } from "react-use-audio-player";
import { GlobalContextProvider } from "~/global-context";
import { usePrevious } from "~/react-utils/use-previous";

export const GlobalProvider = ({ tinaProps, children }: any) => {
  const [trackIndex, setTrackIndex] = useState(0);

  const allTracks = tinaProps.getMusicList?.data.getMusicList.edges.map(
    ({
      node: {
        data: { audioUrl },
      },
    }: any) => audioUrl
  );

  const { player, togglePlayPause, load, ready, play, loading, playing } =
    useAudioPlayer({
      format: "mp3",
      autoplay: true,
    });

  const nextTrack = () => {
    const index = allTracks.indexOf(player._src);
    console.log(index);

    load({
      src: allTracks[index + 1 < allTracks.length ? index + 1 : 0],
      autoplay: true,
    });
  };

  const prevTrack = () => {
    const index = allTracks.indexOf(player._src);
    console.log(index);
    load({
      src: allTracks[index > 0 ? index - 1 : allTracks.length - 1],
      autoplay: true,
    });
  };

  const playTrack = (audioUrl: string) => {
    load({ src: audioUrl, autoplay: true });
  };

  return (
    <GlobalContextProvider
      value={{
        tinaProps,
        audio: { allTracks, trackIndex, nextTrack, prevTrack, playTrack },
      }}
    >
      {children}
    </GlobalContextProvider>
  );
};

import { useDimensions } from "@chakra-ui/hooks";
import { mauve, violet } from "@radix-ui/colors";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import {
  CameraIcon,
  CaretRightIcon,
  CheckIcon,
  ChevronRightIcon,
  CodeIcon,
  DotFilledIcon,
  EnterIcon,
  ExternalLinkIcon as RadixExternalLinkIcon,
  GitHubLogoIcon,
  GlobeIcon,
  HomeIcon,
  MoonIcon,
  MoveIcon,
  Pencil1Icon,
  SpeakerLoudIcon,
  SpeakerModerateIcon,
  TriangleDownIcon,
  TriangleUpIcon,
  TwitterLogoIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import * as RovingFocusGroup from "@radix-ui/react-roving-focus";
import * as Tabs from "@radix-ui/react-tabs";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import React, {
  ElementRef,
  KeyboardEventHandler,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FaFastBackward,
  FaFastForward,
  FaLink,
  FaPagelines,
  FaPause,
  FaPlay,
  FaSoundcloud,
} from "react-icons/fa";
import { useQuery } from "react-query";
import { useAudioPlayer } from "react-use-audio-player";
import { Box } from "~/design-system/react/box";
import { Button } from "~/design-system/react/button";
import { Flex, flex } from "~/design-system/react/flex";
import { Spinner } from "~/design-system/react/spinner";
import { Text } from "~/design-system/react/text";
import { TextField } from "~/design-system/react/text-field";
import { useBoolean } from "~/design-system/react/use-boolean";
import { GlobalContextProvider, useGlobalContext } from "~/global-context";
import { usePrevious } from "~/react-utils/use-previous";
import { css, styled } from "~/stitches.config";
import { isString, useMediaQuery } from "~/utils";

const StyledContent = styled(ContextMenuPrimitive.Content, {
  // minWidth: 220,
  backgroundColor: "#DCDCDC",
  overflow: "hidden",

  boxShadow:
    "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
  border: "2px solid black",
});

const itemStyles = {
  all: "unset",
  fontSize: "$2",
  lineHeight: 1,
  color: "black",
  display: "flex",
  alignItems: "center",
  height: "18px",
  padding: "0 5px",
  position: "relative",
  paddingLeft: "$5",
  userSelect: "none",
  gap: "$1",

  "&[data-disabled]": {
    color: mauve.mauve8,
    pointerEvents: "none",
  },

  "&:hover": {
    color: "black",
  },
  "&:focus": {
    backgroundColor: "#BFE9FF",
    color: "black",
  },
};

const StyledMenuItem = styled(ContextMenuPrimitive.Item, { ...itemStyles });
const StyledCheckboxItem = styled(ContextMenuPrimitive.CheckboxItem, {
  ...itemStyles,
});
const StyledRadioItem = styled(ContextMenuPrimitive.RadioItem, {
  ...itemStyles,
});
const StyledTriggerItem = styled(ContextMenuPrimitive.TriggerItem, {
  '&[data-state="open"]': {
    backgroundColor: "#BFE9FF",
  },
  ...itemStyles,
});

const StyledLabel = styled(ContextMenuPrimitive.Label, {
  paddingLeft: "$4",
  fontSize: "$2",
  lineHeight: "25px",
  color: "black",
});

const StyledSeparator = styled(ContextMenuPrimitive.Separator, {
  height: 1,
  backgroundColor: "black",
  margin: 5,
});

const StyledItemIndicator = styled(ContextMenuPrimitive.ItemIndicator, {
  position: "absolute",
  left: 0,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

// Exports
export const ContextMenu = ContextMenuPrimitive.Root;
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
export const ContextMenuContent = StyledContent;
export const ContextMenuItem = StyledMenuItem;
export const ContextMenuCheckboxItem = StyledCheckboxItem;
export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;
export const ContextMenuRadioItem = StyledRadioItem;
export const ContextMenuItemIndicator = StyledItemIndicator;
export const ContextMenuTriggerItem = StyledTriggerItem;
export const ContextMenuLabel = StyledLabel;
export const ContextMenuSeparator = StyledSeparator;

// Your app...

const RightSlot = styled("div", {
  marginLeft: "auto",
  paddingLeft: "$4",
  color: mauve.mauve11,
  "[data-disabled] &": { opacity: 0.2 },
});

export const colors = {
  background: "#707070",
  foreground: "#8F8F8F",
  border: "#505050",
  loContrastText: "#444444",
};

const level1ListBox = css({
  listStyle: "none",
  bgc: colors.foreground,
  margin: 0,
  px: 0,
  overflowX: "hidden",
  borderWidth: "4px",
  borderRight: "none",
  mr: "-5px",
  minHeight: 0,
  flexShrink: 0,
});

const Background = styled(Flex, {
  height: "100vh",
  width: "100vw",
  flexDirection: "column",
  userSelect: "none",
  bgc: colors.background,
  py: "6px",
  px: "$2",
});

const ForegroundSmallBox = styled("a", {
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  color: "inherit",
  lineHeight: "18px",
  bgc: colors.foreground,
  fontSize: "$2",
  px: "$1",
  minHeight: "18px",
  gap: "$1",
});

const HorizontalSeparator = styled(motion(Box), {
  height: "8px",
});

const VerticalSeparator = styled(motion(Box), {});

const Main = styled(motion.main, {
  flexGrow: 1,
  // display: "flex",
  bgc: colors.foreground,
  border: `4px solid ${colors.border}`,
  br: "$2",
  overflowX: "auto",
  position: "relative",
  alignItems: "center",
});
const headerBox = styled(flex, {
  bgc: colors.foreground,
  px: "$1",
  py: "2px",
  minHeight: "18px",
  fontSize: "$2",
  gap: "$1",
  defaultVariants: {
    align: "center",
  },
});

const ForegroundBox = styled(Flex, {
  bgc: colors.foreground,
  border: `4px solid ${colors.border}`,
  br: "$2",
  px: "$1",
  flexGrow: 1,
});

const headerButton = css(headerBox, {});

const browserTabContent = css({
  display: "flex",
  flexDirection: "column",
  listStyle: "none",
  bgc: colors.foreground,
  br: "$2",
  margin: 0,
  px: 0,

  overflowX: "hidden",
  flexGrow: 1,
  flexShrink: 1,

  btrr: 0,
  btlr: 0,
  bblr: 0,
  borderWidth: "4px",
  borderLeft: "none",
  whiteSpace: "nowrap",
  minHeight: 0,
  "&[data-state=closed]": { display: "none" },
});

const StyledList = styled(RovingFocusGroup.Root, {});

const browserTabContentItem = css({
  display: "flex",
  alignItems: "center",
  border: "none",
  margin: "0",
  padding: "0",
  width: "auto",
  background: "transparent",
  textAlign: "left",
  font: "inherit",
  gap: "$1",

  fontSize: "$2",
  px: "$1",
  py: "2px",
  minHeight: "18px",
  btrr: 0,
  bbrr: 0,
  borderWidth: "4px",
  borderRight: "none",
  whiteSpace: "nowrap",
  flexShrink: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  cursor: "pointer",

  svg: {
    flexShrink: 0,
  },

  variants: {
    variant: {
      active: {
        bgc: "#A9B9C5",
        cursor: "default",
      },
      idle: {
        "&:hover": {
          bgc: "#a7adb1",
          outline: "none",
        },
        "&:focus": {
          bgc: "#C7E8FD",
          outline: "none",
        },
      },
    },
  },
  defaultVariants: {
    variant: "idle",
  },
});

const ButtonGroupContext = React.createContext({});
const L2ItemContext = React.createContext({});

type ButtonGroupProps = Omit<
  React.ComponentPropsWithRef<"div">,
  "defaultValue"
> &
  RovingFocusGroup.RovingFocusGroupProps & {
    /**
     * The controlled stateful value of the accordion item whose content is expanded.
     */
    value?: string;
    /**
     * The value of the item whose content is expanded when the accordion is initially rendered. Use
     * `defaultValue` if you do not need to control the state of an accordion.
     */
    defaultValue?: string;
    /**
     * The callback that fires when the state of the accordion changes.
     */
    onValueChange?(value: string): void;
  };

export function List({
  defaultValue,
  orientation = "vertical",
  value: valueProp,
  onValueChange,
  ...props
}: ButtonGroupProps) {
  const [value, setValue] = useControllableState<string>({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });

  return (
    <ButtonGroupContext.Provider value={{ value, setValue }}>
      <StyledList
        {...props}
        role="listbox"
        className={browserTabContent()}
        onEntryFocus={(event) => {}}
      />
    </ButtonGroupContext.Provider>
  );
}

type ButtonProps = Omit<React.ComponentPropsWithRef<"a">, "value"> &
  Partial<LinkProps> & {
    value?: string;
  };

export const StyledBrowserTabContent = styled(Tabs.Content, {
  display: "flex",
  flexGrow: 1,
  flexShrink: 1,
  overflow: "hidden",
  marginLeft: "-5px",
  "&[data-state=inactive]": { display: "none" },
});

export function BrowserTabContent(
  props: React.ComponentProps<typeof StyledBrowserTabContent>
) {
  return <StyledBrowserTabContent tabIndex={-1} {...props} />;
}

export function FolderRoot(
  props: React.ComponentProps<typeof StyledFolderRoot>
) {
  const [open, setOpen] = useBoolean(props.defaultOpen);

  return (
    <L2ItemContext.Provider value={{ open, setOpen }}>
      <StyledFolderRoot open={open} onOpenChange={setOpen.set} {...props} />
    </L2ItemContext.Provider>
  );
}

export const StyledFolderRoot = styled(Collapsible.Root, {
  display: "flex",
  flexDirection: "column",
});

export const StyledItem = styled("a", browserTabContentItem, {
  svg: {
    width: "14px",
    height: "14px",
  },
});
export const StyledFolderItem = styled("a", browserTabContentItem, {});

export const StyledFolder = styled(
  Collapsible.CollapsibleTrigger,
  browserTabContentItem,
  {
    color: "#000",
    flexGrow: 1,
    gap: "4px",
  }
);

const ExternalLinkIcon = (
  props: React.ComponentProps<typeof RadixExternalLinkIcon>
) => (
  <RadixExternalLinkIcon
    width={14}
    height={14}
    {...props}
    style={{ marginLeft: "auto", ...props.style }}
  />
);

export function Folder(props: React.ComponentProps<typeof StyledFolder>) {
  const { value: contextValue } = React.useContext<any>(ButtonGroupContext);
  const { open } = React.useContext<any>(L2ItemContext);

  const isFocused =
    contextValue !== undefined &&
    props.value !== undefined &&
    contextValue === props.value;

  return (
    <RovingFocusGroup.Item asChild active={isFocused}>
      <StyledFolder {...props} aria-selected={isFocused}>
        {open ? (
          <TriangleUpIcon width={14} height={14} />
        ) : (
          <TriangleDownIcon width={14} height={14} />
        )}

        {props.children}
      </StyledFolder>
    </RovingFocusGroup.Item>
  );
}

export function FolderContent(
  props: React.ComponentProps<typeof Collapsible.CollapsibleContent>
) {
  return <Collapsible.Content {...props} />;
}

export function FolderItem({
  href: hrefProp = "#",
  children,
  value: valueProp,
  ...rest
}: React.ComponentProps<typeof StyledFolderItem> & {
  value?: string;
  href?: LinkProps["href"];
}) {
  const { value: contextValue } = React.useContext<any>(ButtonGroupContext);

  const isFocused =
    contextValue !== undefined &&
    valueProp !== undefined &&
    contextValue === valueProp;

  const isExternal = isString(hrefProp) && hrefProp.startsWith("http");

  return (
    <Link passHref href={hrefProp}>
      <RovingFocusGroup.Item asChild active={isFocused}>
        <StyledFolderItem
          aria-selected={isFocused}
          css={{
            pl: "$5",
          }}
          {...rest}
        >
          {children}
          {isExternal && <ExternalLinkIcon width={14} height={14} />}
        </StyledFolderItem>
      </RovingFocusGroup.Item>
    </Link>
  );
}

export function Item({
  href: hrefProp = "#",
  children,
  ...props
}: ButtonProps) {
  const { value: contextValue } = React.useContext<any>(ButtonGroupContext);

  const router = useRouter();

  const isFocused =
    contextValue !== undefined &&
    props.value !== undefined &&
    contextValue === props.value;

  const isSelected =
    isString(router.query.slug) &&
    hrefProp ===
      router.pathname.replace(new RegExp("[slug]"), router.query.slug);

  const isExternal = isString(hrefProp) && hrefProp.startsWith("http");

  return (
    <Link passHref href={hrefProp}>
      <RovingFocusGroup.Item asChild active={isFocused}>
        <StyledItem
          {...props}
          aria-selected={isFocused}
          variant={isSelected ? "active" : "idle"}
        >
          {children}
          {isExternal && <ExternalLinkIcon width={14} height={14} />}
        </StyledItem>
      </RovingFocusGroup.Item>
    </Link>
  );
}

export function MusicItem({ children, audioUrl, href, ...rest }: any) {
  // const {
  //   value: {
  //     currentTrackUrl,
  //     playTrack,
  //     isThisCurrentTrackLoading,
  //     isThisCurrentTrack,
  //     isThisCurrentTrackPlaying,
  //     setCurrentTrackUrl,
  //     playing: isAudioPlaying,
  //     togglePlayPause,
  //   },
  // } = useGlobalContext("MusicPage");

  const { playing, loading, player, load } = useAudioPlayer();
  const { playTrack } = useGlobalContext();

  const router = useRouter();

  const isThisCurrentTrack = (audioUrl: string) => player?._src === audioUrl;
  const isThisCurrentTrackPlaying = (audioUrl: string) =>
    playing && isThisCurrentTrack(audioUrl);
  const isThisCurrentTrackLoading = (audioUrl: string) =>
    loading && isThisCurrentTrack(audioUrl);

  const soundcloudUrl = "https://soundcloud.com/kormsen/king-tubby-x-wiley";

  return (
    <ContextMenu>
      <ContextMenuPrimitive.Trigger>
        <Item title={children} href={href} {...rest}>
          {isThisCurrentTrackLoading(audioUrl) && (
            <Spinner css={{ width: "12px", height: "12px" }} />
          )}
          {isThisCurrentTrackPlaying(audioUrl) && <SpeakerLoudIcon />}
          {children}
        </Item>
      </ContextMenuPrimitive.Trigger>
      <ContextMenuContent sideOffset={5}>
        <ContextMenuItem onClick={() => playTrack(audioUrl)}>
          {isThisCurrentTrackPlaying(audioUrl) ? (
            <>
              <FaPause /> Pause Track
            </>
          ) : (
            <>
              <FaPlay />
              Play Track
            </>
          )}
        </ContextMenuItem>
        {router.asPath !== href && (
          <Link href={href}>
            <a>
              <ContextMenuItem>
                <FaLink /> Visit Page
              </ContextMenuItem>
            </a>
          </Link>
        )}

        {soundcloudUrl && (
          <Link href={soundcloudUrl}>
            <a target="_blank" rel="noopener noreferrer">
              <ContextMenuItem>
                <FaSoundcloud /> Visit SoundCloud <ExternalLinkIcon />
              </ContextMenuItem>
            </a>
          </Link>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}

const level1ListBoxItem = css({
  all: "unset",
  alignItems: "center",
  userSelect: "none",

  // Custom reset?
  flexShrink: 0,
  lineHeight: "1",
  WebkitTapHighlightColor: "rgba(0,0,0,0)",
  bgc: colors.foreground,
  display: "flex",
  width: "100%",
  gap: "$1",
  fontSize: "$2",
  px: "$1",
  py: "2px",

  borderWidth: "4px",
  borderRight: "none",
  // minWidth: "125px",
  overflowX: "hidden",
  svg: {
    flexShrink: 0,
  },
  cursor: "pointer",
  "&:hover": {
    bgc: "#a7adb1",
    outline: "none",
  },
  [`&[aria-selected="true"]`]: {
    bgc: "#A9B9C5",
    "&:focus": {
      bgc: "#C7E8FD",
    },
  },
  variants: {
    variant: {
      active: {
        backgroundColor: "#A9B9C5",
      },
    },
  },
});

const IconButton = styled("button", {
  border: "none",
  margin: "0",
  padding: "0",
  overflow: "visible",

  background: "transparent",

  color: "inherit",
  font: "inherit",

  lineHeight: "normal",

  maxHeight: "18px",

  "&:disabled": {
    opacity: 0.4,
    pointerEvents: "none",
  },
  "&:focus": {
    outline: "1px solid rgb(229, 151, 0)",
    boxShadow: "inset 0px 0px 0px 1px rgb(229, 151, 0)",
  },
  width: "18px",
  height: "18px",
  svg: {
    width: "12px",
    height: "12px",
    cursor: "pointer",

    "&:hover": {
      transform: "scale(1.2)",
    },
  },
});

const StyledPlayIcon = styled(FaPlay, {
  "&:focus": {
    outline: "none",
    boxShadow: "inset 0px 0px 0px 2px rgb(229, 151, 0) !important",
  },
  variants: {
    variant: {
      paused: {
        color: "#000",
      },
      playing: {
        color: "#18E27D",
        "&:hover": {
          color: "#18E27D",
        },
      },
    },
  },
});

const MusicTabContent = (props: any) => (
  <BrowserTabContent value="categories_music" {...props} />
);

export function Layout({ children }: PropsWithChildren<{}>) {
  const {
    tinaProps,
    audio: { allTracks, trackIndex, nextTrack, prevTrack, playTrack },
  } = useGlobalContext();

  const currentlyPlayingQuery = useQuery({
    queryKey: "currentlyPlaying",
    queryFn: async () =>
      fetch("/api/currently-playing").then((r) => {
        if (!r.ok) {
          throw new Error(r.statusText);
        }
        return r.json();
      }),
  });

  const ref = useRef<HTMLDivElement | null>(null);

  const dimensions = useDimensions(ref);

  const minFooterHeight = 180;
  const maxFooterHeight = 320;
  const isBp1 = useMediaQuery("(min-width: 520px)");
  const [sidebarWidth, setSidebarWidth] = useState(isBp1 ? 250 : 300);

  const minSidebarWidth = useMemo(() => {
    return 180;
  }, [isBp1]);
  const maxSidebarWidth = useMemo(() => {
    // if (window) {
    return isBp1 ? (dimensions ? dimensions.contentBox.width - 200 : 450) : 270;
    // return isBp1 ? 420 : 300;
    // }
  }, [isBp1]);
  const [level1Width, setLevel1Width] = useState(130);
  const [footerHeight, setFooterHeight] = useState(200);
  const [footerOpen, setFooterOpen] = useBoolean(false);
  const [sidebarOpen, setSidebarOpen] = useBoolean(isBp1);
  const iconSize = 14;
  const listItemPaddingLeft = 4;
  const minLevel1Width = iconSize + listItemPaddingLeft * 2;
  const maxLevel1Width = 150;
  const router = useRouter();
  const [isRouteChanging, setIsRouteChanging] = useBoolean();
  const [currentTrackUrl, setCurrentTrackUrl] = useState<string | undefined>(
    undefined
  );

  const { player, togglePlayPause, load, ready, play, loading, playing } =
    useAudioPlayer();
  const previousLoading = usePrevious(loading);

  const [homeNav, setHomeNav] = useState("");

  const searchRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);

  const searchEndpoint = (query: string) => `/api/search?q=${query}`;

  const onChange = React.useCallback((event) => {
    const query = event.target.value;
    setQuery(query);
    if (query.length) {
      fetch(searchEndpoint(query))
        .then((res) => res.json())
        .then((res) => {
          setResults(res.results);
        });
    } else {
      setResults([]);
    }
  }, []);

  const onFocus = React.useCallback(() => {
    setActive(true);
    window.addEventListener("click", onClick);
  }, []);

  const onClick = React.useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false);
      window.removeEventListener("click", onClick);
    }
  }, []);

  console.log(results);
  console.log(tinaProps);
  useEffect(() => {
    if (isBp1) {
      setSidebarWidth(300);
      setSidebarOpen.on();
    } else {
      setSidebarWidth(250);
      setSidebarOpen.off();
    }
  }, [isBp1]);

  useEffect(() => {
    router.events.on("routeChangeStart", setIsRouteChanging.on);
    router.events.on("routeChangeComplete", setIsRouteChanging.off);
    router.events.on("routeChangeError", setIsRouteChanging.off);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", setIsRouteChanging.on);
      router.events.off("routeChangeComplete", setIsRouteChanging.off);
      router.events.off("routeChangeError", setIsRouteChanging.off);
    };
  }, []);

  const onVerticalSeparatorDrag = useCallback(
    (e: any) => {
      if ("clientX" in e) {
        const point = e.clientX - 16;

        if (sidebarOpen) {
          if (e.clientX > minSidebarWidth && e.clientX < maxSidebarWidth) {
            setSidebarWidth(point);
          }

          if (point <= 70) {
            setSidebarOpen.off();
          }
        } else {
          if (point >= 180) {
            setSidebarOpen.on();
          }
        }
      }
    },
    [minSidebarWidth, maxSidebarWidth, sidebarOpen]
  );

  const handleKeyDownBrowserTab: KeyboardEventHandler<ElementRef<"div">> = (
    e
  ) => {
    console.log(e);
    if (e.keyCode === 41) {
    }
  };

  const onHorizontalSeparatorDrag = (e: any) => {
    if ("clientY" in e) {
      const point = e.clientY;

      const minY = window.innerHeight - maxFooterHeight;

      // if (point > minY) {
      //   setFooterHeight(window.innerHeight - e.clientY - 34);
      // }

      if (footerOpen) {
        if (point > window.innerHeight - 34 - minFooterHeight / 4) {
          setFooterOpen.off();
        }
      } else {
        if (point <= window.innerHeight - 34 - minFooterHeight / 2) {
          setFooterOpen.on();
        }
      }
    }
  };

  const isGlobalLoading = isRouteChanging || (player?._src && loading);

  return (
    <GlobalContextProvider value={{ playTrack }}>
      <Background
        css={{
          flexDirection: "column",
          bgc: colors.background,
          py: "6px",
          px: "$2",
        }}
      >
        <Flex css={{ gap: "$1" }}>
          <ForegroundSmallBox
            css={{
              bgc: isGlobalLoading ? "rgb(229, 151, 0)" : undefined,
              fontWeight: 600,
              letterSpacing: ".75px",
            }}
          >
            {isGlobalLoading && (
              <Spinner css={{ mr: "2px", width: "12px", height: "12px" }} />
            )}
            KORMSEN
          </ForegroundSmallBox>

          <Flex align="center" gap={1}>
            <IconButton
              disabled={player?._src && loading}
              onClick={() => {
                if (!player?._src) {
                  load({ src: allTracks[3], autoplay: true });
                } else togglePlayPause();
              }}
            >
              <StyledPlayIcon
                variant={playing ? "playing" : "paused"}
                css={{ mr: "-1px" }}
              />
            </IconButton>
            <IconButton disabled={loading} onClick={nextTrack}>
              <FaFastForward />
            </IconButton>
          </Flex>

          {currentlyPlayingQuery.data?.title && (
            <ForegroundSmallBox css={{ ml: "auto" }}>
              <SpeakerLoudIcon
                width={14}
                height={14}
                style={{ fill: "black" }}
              />
              {currentlyPlayingQuery.data.title} -{" "}
              {currentlyPlayingQuery.data.artist}
            </ForegroundSmallBox>
          )}
        </Flex>
        <Flex css={{ flexGrow: 1, mt: "$1", minHeight: 0 }}>
          <LayoutGroup>
            <Collapsible.Root
              defaultOpen
              open={sidebarOpen}
              onOpenChange={setSidebarOpen.set}
            >
              <Flex
                ref={ref}
                direction="column"
                css={{
                  alignItems: "stretch",
                  flexGrow: 1,
                  height: "100%",
                  minHeight: 0,
                  // minWidth: "unset",
                  "@bp1": {
                    flexGrow: 0,
                  },
                }}
                style={{
                  width: sidebarOpen ? sidebarWidth : "auto",
                }}
              >
                <Flex
                  css={{
                    alignItems: "center",
                    flexGrow: 0,
                    minHeight: "29px",
                    // minWidth: "unset",
                  }}
                >
                  <Collapsible.Trigger asChild>
                    <Button
                      css={{
                        display: "inline-flex",
                        width: "24px",
                        height: "24px",
                        br: "100%",
                        boxShadow: "none",
                        p: 0,
                        alignItems: "center",
                        justifyContent: "center",
                        bgc: colors.border,
                        zIndex: "$1",

                        "&:focus": {
                          outline: "1px  solid rgb(229, 151, 0)",
                          boxShadow: "inset 0px 0px 0px 1px rgb(229, 151, 0)",
                        },
                      }}
                    >
                      <CaretRightIcon width={24} height={24} />
                    </Button>
                  </Collapsible.Trigger>
                  <Collapsible.Content asChild>
                    <Flex
                      css={{
                        ml: "$2",
                        flex: "1 1 auto",
                        border: `4px solid ${colors.border}`,
                        // borderBottom: `2px solid ${colors.border}`,
                        borderBottom: `none`,
                        borderRadius: "$2",

                        bbrr: 0,
                        bblr: 0,
                        minHeight: 0,
                      }}
                    >
                      <TextField
                        ref={searchRef}
                        type="search"
                        placeholder="Search (Cmd + F)"
                        onChange={onChange}
                        css={{
                          br: "2px !important",
                          borderBottomRightRadius: "0 !important",
                          borderBottomLeftRadius: "0 !important",
                          "&::placeholder": {
                            color: colors.loContrastText,
                          },
                        }}
                      />
                    </Flex>
                  </Collapsible.Content>
                </Flex>
                <Collapsible.Content asChild>
                  <Tabs.Root
                    asChild
                    defaultValue="me"
                    // value={query.length > 0 ? "search-results" : undefined}
                    orientation="vertical"
                    onKeyDown={handleKeyDownBrowserTab}
                  >
                    <Flex
                      css={{
                        flexGrow: 1,
                        width: "100%",
                        minHeight: 0,
                        border: `4px solid ${colors.border}`,
                        borderRadius: "$2",
                        btrr: 0,
                        overflow: "hidden",
                      }}
                    >
                      <Tabs.List
                        className={level1ListBox()}
                        loop={false}
                        aria-label="Top-level navigation"
                        style={{
                          // minWidth: minLevel1Width,
                          maxWidth: maxLevel1Width,
                          width: level1Width,
                        }}
                      >
                        <Section>
                          <BrowserTab value="me">
                            <HomeIcon width={14} height={14} />
                            Me Me Me
                          </BrowserTab>
                        </Section>
                        <Section title="Categories">
                          <BrowserTab value="categories_code">
                            <CodeIcon width={14} height={14} />
                            Code
                          </BrowserTab>
                          <BrowserTab value="categories_writing">
                            <Pencil1Icon width={14} height={14} />
                            Writing
                          </BrowserTab>
                          <BrowserTab value="categories_music">
                            <SpeakerLoudIcon width={14} height={14} />
                            Music
                          </BrowserTab>
                          <BrowserTab value="categories_photos">
                            <CameraIcon width={14} height={14} />
                            Photos
                          </BrowserTab>
                        </Section>
                        <Section title="Features">
                          <BrowserTab value="features_web-audio">
                            <GlobeIcon width={14} height={14} />
                            Web Audio
                          </BrowserTab>
                          <BrowserTab value="features_design-systems">
                            <MoonIcon width={14} height={14} />
                            Design Systems
                          </BrowserTab>
                          <BrowserTab value="features_computer-graphics">
                            <VideoIcon width={14} height={14} />
                            Computer Graphics
                          </BrowserTab>
                        </Section>
                      </Tabs.List>
                      <VerticalSeparator
                        role="separator"
                        drag="x"
                        dragElastic={0}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragMomentum={false}
                        style={{
                          cursor: "col-resize",
                        }}
                        onDrag={(e) => {
                          if ("clientX" in e) {
                            setLevel1Width(e.clientX);
                          }
                        }}
                        aria-orientation="vertical"
                        css={{
                          // bgc: colors.foreground,
                          width: "12px",
                          display: "flex",
                          flexDirextion: "column",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <div
                          style={{ backgroundColor: colors.border, width: 2 }}
                        />
                      </VerticalSeparator>
                      <BrowserTabContent
                        value="me"
                        aria-label="Second-level navigation"
                      >
                        <List value={homeNav} onValueChange={setHomeNav}>
                          <Item title="Welcome" href="/">
                            Welcome!
                          </Item>
                          <Item title="Welcome" href="/contact">
                            Contact Me
                          </Item>
                          <FolderRoot defaultOpen={true}>
                            <Folder>Follow Me</Folder>
                            <FolderContent>
                              <FolderItem
                                href="https://twitter.com/kormsen"
                                target="_blank"
                              >
                                <TwitterLogoIcon width={14} height={14} />
                                Twitter
                              </FolderItem>
                              <FolderItem
                                href="https://github.com/kiastorm"
                                target="_blank"
                              >
                                <GitHubLogoIcon width={14} height={14} />
                                GitHub
                              </FolderItem>
                            </FolderContent>
                          </FolderRoot>
                        </List>
                      </BrowserTabContent>

                      <BrowserTabContent
                        value="categories_code"
                        aria-label="Second-level navigation"
                      >
                        <List>
                          <Item title="dancing_girl" href="/code/dancing_girl">
                            dancing_girl
                          </Item>
                          <Item title="Wall of Echo" href="/code/wall-of-echo">
                            Wall of Echo
                          </Item>
                          <Item
                            title="white background"
                            href="/code/white-background"
                          >
                            white background
                          </Item>
                        </List>
                      </BrowserTabContent>

                      <BrowserTabContent
                        value="categories_writing"
                        aria-label="Second-level navigation"
                      >
                        <List>
                          {query.length > 0 ? (
                            tinaProps.getPostList?.data.getPostList?.edges
                              .filter(
                                ({
                                  node: {
                                    data: { title },
                                    sys: { filename },
                                  },
                                }: any) =>
                                  title.includes(query) ||
                                  filename.includes(query)
                              )
                              .map(
                                ({
                                  node: {
                                    data: { title },
                                    sys: { filename },
                                  },
                                }: any) => (
                                  <Item
                                    title={title}
                                    href={`/posts/${filename}`}
                                  >
                                    {title}
                                  </Item>
                                )
                              )
                          ) : (
                            <>
                              <Item title="All" href="/posts">
                                All
                              </Item>
                              {tinaProps.getPostList?.data.getPostList?.edges?.map(
                                ({
                                  node: {
                                    data: { title },
                                    sys: { filename },
                                  },
                                }: any) => (
                                  <Item
                                    title={title}
                                    href={`/posts/${filename}`}
                                  >
                                    {title}
                                  </Item>
                                )
                              )}
                            </>
                          )}
                        </List>
                      </BrowserTabContent>
                      <MusicTabContent>
                        <List>
                          {(query.length > 0
                            ? tinaProps.getMusicList?.data.getMusicList?.edges.filter(
                                ({
                                  node: {
                                    data: { title },
                                    sys: { filename },
                                  },
                                }: any) =>
                                  title.includes(query) ||
                                  filename.includes(query)
                              )
                            : tinaProps.getMusicList?.data.getMusicList?.edges
                          )?.map(
                            ({
                              node: {
                                data: { title, audioUrl },
                                sys: { filename },
                              },
                            }: any) => (
                              <MusicItem
                                audioUrl={audioUrl}
                                href={`/music/${filename}`}
                              >
                                {title}
                              </MusicItem>
                            )
                          )}
                        </List>
                      </MusicTabContent>
                      <BrowserTabContent
                        value="categories_photos"
                        aria-label="Second-level navigation"
                      >
                        <List>
                          <Item title="Australia" href="/photos/australia">
                            Australia
                          </Item>
                        </List>
                      </BrowserTabContent>
                      <BrowserTabContent
                        value="features_web-audio"
                        aria-label="Second-level navigation"
                      >
                        <List>
                          <Item
                            title="Stream and control a queue of mp3 files"
                            href="/code/web-audio-player"
                          >
                            Stream and control a queue of mp3 files
                          </Item>
                        </List>
                      </BrowserTabContent>

                      <BrowserTabContent
                        value="search-results"
                        aria-label="Second-level navigation"
                      >
                        <List>
                          {results.map(({ title, id }) => {
                            return (
                              <Item title={title} href={`/posts/${id}`}>
                                {title}
                              </Item>
                            );
                          })}
                        </List>
                      </BrowserTabContent>
                    </Flex>
                  </Tabs.Root>
                </Collapsible.Content>
              </Flex>
            </Collapsible.Root>
            <VerticalSeparator
              role="separator"
              drag={"x"}
              dragElastic={0}
              onDrag={onVerticalSeparatorDrag}
              dragConstraints={{ left: 0, right: 0 }}
              dragMomentum={false}
              aria-label="sidebar separator"
              aria-controls="sidebar"
              // aria-valuemin={180 - 16}
              aria-valuemin={180 - 16}
              aria-valuemax={maxSidebarWidth}
              aria-valuenow={sidebarWidth}
              tabIndex={0}
              style={{
                cursor: "col-resize",
                flex: "0 0 8px",
                backgroundColor: colors.background,
              }}
              aria-orientation="vertical"
            />
            <AnimatePresence
              exitBeforeEnter
              initial={false}
              onExitComplete={() => window.scrollTo(0, 0)}
            >
              <Main tabIndex={0}>{children}</Main>
            </AnimatePresence>
          </LayoutGroup>
        </Flex>
        <Collapsible.Root
          open={footerOpen}
          onOpenChange={setFooterOpen.set}
          asChild
        >
          <Flex direction="column">
            <HorizontalSeparator
              drag="y"
              dragElastic={0}
              onDrag={onHorizontalSeparatorDrag}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragMomentum={false}
              tabIndex={0}
              style={{
                cursor: "row-resize",
              }}
              role="separator"
              aria-orientation="horizontal"
            />
            <Collapsible.Content asChild>
              <Flex
                css={{ gap: "$2", mb: "$2", flexGrow: 1 }}
                style={{ height: footerHeight, minHeight: minFooterHeight }}
              >
                <ForegroundBox
                  css={{ flexGrow: 1, overflowX: "auto", p: "$1" }}
                >
                  <Flex css={{ height: "100%" }}></Flex>
                </ForegroundBox>
              </Flex>
            </Collapsible.Content>
            <Flex css={{ flexGrow: 0 }}>
              <Collapsible.Trigger asChild>
                <Button
                  css={{
                    display: "inline-flex",
                    width: "24px",
                    height: "24px",
                    br: "100%",
                    boxShadow: "none",
                    p: 0,
                    alignItems: "center",
                    justifyContent: "center",
                    bgc: colors.border,
                  }}
                >
                  <TriangleDownIcon width={24} height={24} />
                </Button>
              </Collapsible.Trigger>
            </Flex>
          </Flex>
        </Collapsible.Root>
      </Background>
    </GlobalContextProvider>
  );
}

export function ListBox(props: PropsWithChildren<{}>) {
  return <ul className={level1ListBox()} {...props} />;
}

export function Section(props: PropsWithChildren<{ title?: string }>) {
  return (
    <Box as="li" css={{ mb: "$3" }}>
      {props.title && (
        <Text
          css={{
            fontSize: "$1",
            color: colors.loContrastText,
            fontWeight: 600,
            px: "$1",
            py: "$1",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            userSelect: "none",
          }}
        >
          {props.title}
        </Text>
      )}
      <ul
        style={{
          padding: 0,
          listStyle: "none",
          margin: 0,
        }}
      >
        {props.children}
      </ul>
    </Box>
  );
}

const StyledBrowserTab = styled(Tabs.Trigger, level1ListBoxItem);
const StyledBrowserLink = styled("a", level1ListBoxItem);

export function BrowserTab({
  isActive,
  ...rest
}: React.ComponentProps<typeof StyledBrowserTab> & {
  isActive?: boolean;
  value: string;
}) {
  return (
    <StyledBrowserTab variant={isActive ? "active" : undefined} {...rest} />
  );
}

export const BrowserLink = ({
  href: hrefProp = "#",
  ...props
}: React.ComponentProps<typeof StyledBrowserLink> & {
  href?: LinkProps["href"];
}) => {
  return (
    <Link passHref href={hrefProp}>
      <StyledBrowserLink {...props} />
    </Link>
  );
};

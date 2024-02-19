import * as React from "react";
import { FlexColumn, FlexGrid } from "../flex-grid/FlexGrid";
import styled from "styled-components";
import Avatar from "./Avatar";
import { Size } from "./Avatar.css";
import { getBackgroundColorFromString } from "@/utils/avatar";

interface AvatarsProps {
  avatars: {
    title?: string;
    status?: any;
    avatarUrl?: string;
  }[];
  max?: number;
  isCircle?: boolean;
  isRounded?: boolean;
  size?: Size;
}

const StyledAvatars = styled(FlexGrid)`
  position: relative;
  &:hover {
    transition: transform 0.5s ease-in-out;
    > * {
      transform: translateX(0) !important;
    }
  }
`;

export const Avatars: React.FC<AvatarsProps> = ({
  avatars,
  max,
  isCircle,
  isRounded,
  size = Size.md,
}) => {
  const avatarsToShow = max ? avatars.slice(0, max) : avatars;

  return (
    <StyledAvatars
      onMouseOver={(e) => {
        console.log(e);
      }}
      justifyContent="center"
      alignItems="center"
    >
      {avatarsToShow.map((avatar, index) => (
        <FlexColumn
          key={index}
          style={{
            position: "relative",
            transform: `translateX(-${index * 0.75}rem)`,
            transition: `transform 0.25s ease-in-out`,
          }}
          justifyContent="center"
          alignItems="center"
        >
          <Avatar
            title={avatar.title}
            status={avatar.status}
            avatarUrl={avatar.avatarUrl}
            size={size}
            isCircle={isCircle}
            isRounded={isRounded}
            background={getBackgroundColorFromString(avatar.title)}
          />
        </FlexColumn>
      ))}
      {max && avatars.length > max && (
        <FlexColumn
          style={{
            position: "relative",
            transform: `translateX(-${(max - 1) * 0.75}rem)`,
            transition: `transform 0.25s ease-in-out`,
            paddingLeft: "0.5rem",
          }}
        >
          {`+ ${avatars.length - max}`}
        </FlexColumn>
      )}
    </StyledAvatars>
  );
};

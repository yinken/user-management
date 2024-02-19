import * as React from "react";
import styled from "styled-components";
import Avatar from "../avatar/Avatar";
import { FlexColumn, FlexGrid, FlexRow } from "../flex-grid/FlexGrid";
import { space } from "@/utils/space";
import { getBackgroundColorFromString } from "@/utils/avatar";
import { truncate } from "@/utils/strings";
import { Text } from "../text/Text";
import { Size } from "../avatar/Avatar.css";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  inlineComponent?: React.ReactNode;
  messageStatus?: {
    unreadMessageCount: number;
    whisperMessageCount: number;
    escalationLevel: "default" | "info" | "warning" | "danger" | "whisper";
  };
  chatStatus?: {
    isPendingClosed: boolean;
  };
  user: {
    name: string;
    avatar: string;
  };
  timestring?: string;
}

const StyledUserCard = styled.div<Props>`
  width: 100%;
  display: flex;
  .time {
    font-size: 10px;
    text-transform: uppercase;
  }
`;

export const UserCard: React.FC<Props> = (props) => {
  const { inlineComponent, user, timestring, children } = props;
  return (
    <StyledUserCard {...props}>
      <FlexGrid gap={space(0.5)} alignItems="center" title={user.name ?? ""}>
        <FlexColumn className="user-avatar" shrink={0} grow={0}>
          <Avatar
            size={Size.md}
            title={user.name ?? ""}
            avatarUrl={user.avatar ?? ""}
            background={getBackgroundColorFromString(user.name ?? "")}
          />
        </FlexColumn>
        {user.name && (
          <FlexColumn>
            <FlexRow
              alignItems="center"
              gap={space(0.25)}
              justifyContent="center"
            >
              <FlexColumn className="user-name">
                <Text ellipsis size="S" bold>
                  {truncate(user.name, 35)}
                </Text>
              </FlexColumn>
              {inlineComponent && (
                <FlexColumn
                  grow={0}
                  className="dots"
                  alignItems="center"
                  justifyContent="center"
                  direction="row"
                >
                  {inlineComponent}
                </FlexColumn>
              )}
            </FlexRow>

            <FlexRow gap={space(0.25)} alignItems="flex-end">
              <FlexColumn grow={1}>{children}</FlexColumn>
              <FlexColumn className="time-ago" grow={0} shrink={0}>
                {timestring && timestring.length && (
                  <span className="time">{timestring}</span>
                )}
              </FlexColumn>
            </FlexRow>
          </FlexColumn>
        )}
      </FlexGrid>
    </StyledUserCard>
  );
};

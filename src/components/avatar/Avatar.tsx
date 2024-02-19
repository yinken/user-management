import * as React from "react";
import {
  AvatarInitials,
  AvatarStatusDot,
  Size,
  StyledAvatar,
} from "./Avatar.css";

import { useTranslation } from "react-i18next";
import { getInitialsFromTitle } from "@/utils/strings";
import { mapUserStatusToName } from "@/utils/translation";
import { USER_STATUS_TYPES } from "@/types";
import { colors } from "@/utils/colors";

const statusColors = {
  [USER_STATUS_TYPES.ONLINE]: colors.green,
  [USER_STATUS_TYPES.OFFLINE]: colors.red,
  [USER_STATUS_TYPES.PAUSE]: colors.yellow,
};

export interface AvatarProps {
  avatarUrl?: string;
  onClick?: () => void;
  "data-testid"?: string;
  size?: Size;
  title?: string;
  status?: USER_STATUS_TYPES;
  background?: string;
  isCircle?: boolean;
  isRounded?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  avatarUrl,
  onClick,
  title,
  size = Size.md,
  background,
  isCircle = false,
  isRounded = true,
  status,
  ...props
}): JSX.Element => {
  const { t } = useTranslation();
  const isClickable = onClick ? true : false;
  const displayInitials = !avatarUrl;
  const altTitle = title && `Avatar of ${title}`;

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <StyledAvatar
        {...props}
        isClickable={isClickable}
        onClick={onClick}
        data-testid={props["data-testid"]}
        size={size}
        background={background}
        isCircle={isCircle}
        isRounded={isRounded}
      >
        {avatarUrl && <img src={avatarUrl} alt={altTitle} />}
        {displayInitials && title && (
          <AvatarInitials>{getInitialsFromTitle(title)}</AvatarInitials>
        )}
      </StyledAvatar>
      {status && (
        <AvatarStatusDot
          title={
            t("X is Y", {
              someone: title,
              something: mapUserStatusToName(status),
            }) as string
          }
          color={statusColors[status]}
          className={"avatar-status " + status}
        />
      )}
    </div>
  );
};

export default Avatar;

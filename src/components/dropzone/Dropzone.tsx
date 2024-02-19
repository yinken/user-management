import * as React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { colors } from "@/utils/colors";
import { Text } from "../text/Text";

export type FileUpload = {
  name: string;
  data: File;
  type: string;
};
interface DropzoneProps {
  onSuccess: (file: FileUpload) => void;
  allowedFileTypes?: string[];
  isActive?: boolean;
  name?: string;
}
const StyledDropzone = styled.div<{ isActive: boolean }>`
  position: relative;
  height: 100%;
  width: 100%;
  min-height: 68px;
  pointer-events: ${(props) => (props.isActive ? "auto" : "none")};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.isActive ? colors.skyBlue : colors.grey70)};
  backdrop-filter: blur(2px);
  transition: opacity 0.2s ease-in-out;
  cursor: pointer;
  .dropzone {
    position: absolute;
    z-index: 1;
    inset: 0px;
    margin: 0;
    border-width: 1px;
    border-style: dashed;
    border-color: ${(props) =>
      props.isActive ? colors.skyBlue : colors.grey70};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
  }
  .dropzone-message {
    text-align: center;
  }
`;

export const Dropzone = React.forwardRef(
  (props: DropzoneProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const { isActive = false, onSuccess, name = "dropzone" } = props;
    const { t } = useTranslation();

    return (
      <StyledDropzone isActive={isActive}>
        <div className="dropzone-message">
          <Text size="XS" bold>
            {t("Drop files here to upload")}
          </Text>
        </div>
        <label
          htmlFor={name}
          className={"dropzone has-dragover"}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e) => {
            console.log(e);
            e.preventDefault();
            if (e.dataTransfer.items) {
              Object.values(e.dataTransfer.items).forEach((item) => {
                if (item.kind === "file") {
                  const file: File | null = item.getAsFile();
                  if (file) {
                    onSuccess({
                      name: file.name,
                      data: file,
                      type: file.type,
                    });
                  }
                }
              });
            }
          }}
        ></label>

        <input
          ref={ref}
          type="file"
          multiple
          id={name}
          name={name}
          style={{ display: "none" }}
          onChange={(event) => {
            const files = event && event?.currentTarget?.files;
            if (files && files.length > 0) {
              Array.from(files).forEach((file) => {
                onSuccess({
                  name: file.name,
                  data: file,
                  type: file.type,
                });
              });
            }
          }}
        ></input>
      </StyledDropzone>
    );
  }
);

Dropzone.displayName = "Dropzone";

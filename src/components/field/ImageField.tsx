import React from "react";
import { FlexColumn, FlexGrid, FlexRow } from "../flex-grid/FlexGrid";
import "cropperjs/dist/cropper.css";
import styled from "styled-components";
import { Dropzone, FileUpload } from "../dropzone/Dropzone";
import { ImageEditor } from "../image-editor/ImageEditor";
import { space } from "@/utils/space";
import { Image } from "../image/Image";

interface ImageFieldProps {
  children: React.ReactNode;
  onClick?: () => void;
  onSave: (key: string, value: string) => void;
  name: string;
  label: string;
  showLabel?: boolean;
}

const StyledImageField = styled(FlexGrid)``;

export const ImageField = React.forwardRef(
  (props: ImageFieldProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { children, onSave, onClick, name, showLabel = true } = props;
    const [isEditing, setIsEditing] = React.useState<boolean>(false);
    const [currentValue, setCurrentValue] = React.useState<string>(
      String(children)
    );

    React.useEffect(() => {
      setCurrentValue(String(children));
    }, [children]);

    const handleEdit = () => {
      setIsEditing(true);
    };
    const handleSave = React.useCallback(
      (dataUrl: string) => {
        setCurrentValue(dataUrl);
        setIsEditing(false);
        onSave(name, dataUrl);
      },
      [name, onSave]
    );

    const handleDrop = React.useCallback((file: FileUpload) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.data);
      reader.onload = () => {
        setCurrentValue(reader.result as string);
      };
      setIsEditing(true);
    }, []);

    const fieldComponents = React.useMemo(() => {
      const components = [];
      if (isEditing) {
        components.push(
          <FlexColumn
            key={"custom-field"}
            alignItems="center"
            className="custom-field"
            direction="row"
          >
            <FlexGrid alignItems="center" direction="column">
              <FlexRow alignItems="center" justifyContent="center">
                <ImageEditor
                  initialImage={currentValue}
                  height={"200px"}
                  width={"100%"}
                  onSave={handleSave}
                />
              </FlexRow>
            </FlexGrid>
          </FlexColumn>
        );
      } else {
        components.push(
          <FlexColumn
            key={"custom-field"}
            ref={ref}
            onClick={onClick}
            className="custom-field"
            direction="row"
            style={{
              cursor: "pointer",
            }}
          >
            <FlexGrid alignItems="center">
              <FlexColumn
                onClick={currentValue ? () => handleEdit() : undefined}
                justifyContent="center"
                alignItems={showLabel ? "flex-start" : "center"}
              >
                <div
                  style={{
                    height: "150px",
                    width: "150px",
                    overflow: "hidden",
                    border: "1px solid var(--color-base-3)",
                  }}
                >
                  {currentValue ? (
                    <Image src={currentValue} width={"auto"} alt="" />
                  ) : (
                    <div
                      style={{
                        padding: space(0.5),
                        height: "100%",
                        width: "100%",
                      }}
                    >
                      <Dropzone onSuccess={handleDrop} isActive={true} />
                    </div>
                  )}
                </div>
              </FlexColumn>
            </FlexGrid>
          </FlexColumn>
        );
      }
      return components;
    }, [
      currentValue,
      handleDrop,
      handleSave,
      isEditing,
      onClick,
      ref,
      showLabel,
    ]);

    return (
      <StyledImageField>
        {fieldComponents.map((component) => component)}
      </StyledImageField>
    );
  }
);

ImageField.displayName = "ImageField";

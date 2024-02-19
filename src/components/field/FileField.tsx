import { t } from "i18next";
import * as React from "react";
import { Card } from "../card/Card";
import { Dropzone, FileUpload } from "../dropzone/Dropzone";
import { File } from "../file/File";
import { FlexGrid, FlexRow } from "../flex-grid/FlexGrid";
import { fileToBase64 } from "@/utils/files";
import { space } from "@/utils/space";
import { determineSingularOrPlural } from "@/utils/translation";
import { Text } from "../text/Text";
import { ICON } from "../icon/useIcon";

interface FileFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (key: string, value: string) => void;
  disabled?: boolean;
  showLabel?: boolean;
  max?: string;
}

export const FileField = React.forwardRef(
  (props: FileFieldProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const { name, onChange, max = "1", disabled = false } = props;

    const [files, setFiles] = React.useState<FileUpload[]>([]);
    const limit = React.useMemo(() => {
      return Number(max);
    }, [max]);

    const removeFile = (index: number) => {
      const newFiles = [...(files || [])];
      newFiles.splice(index, 1);
      setFiles(newFiles);
    };

    const addFile = (file: FileUpload) => {
      setFiles((prevState) => {
        if (prevState.length >= limit) {
          return prevState;
        }
        return [...(prevState || []), file];
      });
    };

    React.useEffect(() => {
      if (!files || !files.length) {
        return;
      }

      const convertedFiles = files.map((file) => {
        return fileToBase64(file.data);
      });

      Promise.all(convertedFiles).then((convertedFiles) => {
        onChange(name, JSON.stringify(convertedFiles));
      });

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files, name]);

    return (
      <FlexGrid gap={space(0.25)} shrink={0} direction="column">
        <FlexRow>
          <Dropzone
            name={name}
            ref={ref}
            onSuccess={addFile}
            isActive={files && files.length < limit && !disabled}
          />
        </FlexRow>

        <FlexRow>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,64px)",
              gridGap: space(0.25),
              width: "100%",
            }}
          >
            {files && files.length
              ? files.map((file, index) => {
                  return (
                    <Card height={"64px"} width={"64px"} key={index}>
                      <File
                        file={{
                          mimeType: file.type,
                          fileName: file.name,
                          url: URL.createObjectURL(file.data),
                        }}
                        actions={[
                          {
                            icon: ICON.DELETE,
                            onClick: () => removeFile(index),
                            name: "remove-file",
                            title: "Remove file",
                          },
                        ]}
                      />
                    </Card>
                  );
                })
              : null}
          </div>
        </FlexRow>
        <FlexRow>
          <Text size="XXS">
            {`
                  ${files?.length || 0}/${limit} ${determineSingularOrPlural({
              count: limit,
              singular: t("File"),
              plural: t("Files"),
            })}
                  `}
          </Text>
        </FlexRow>
      </FlexGrid>
    );
  }
);
FileField.displayName = "FileField";

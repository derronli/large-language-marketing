import { CheckIcon, CloseButton, Flex, Input } from "@mantine/core";
import { useMemo, useState } from "react";

interface EditableInput {
  text: string;
  handleSave: (value: string) => void;
}

const EditableInput = ({ text, handleSave }: EditableInput) => {
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState(text);

  const rightSection = useMemo(
    () =>
      disabled ? (
        <CloseButton
          aria-label="Edit caption"
          onClick={() => setDisabled(false)}
        />
      ) : (
        <Flex sx={{ flexDirection: "column" }}>
          <CheckIcon
            aria-label="Save caption changes"
            onClick={() => {
              handleSave(value);
              setDisabled(true);
            }}
          />
          <CloseButton
            aria-label="Cancel caption changes"
            onClick={() => {
              setValue(text);
              setDisabled(true);
            }}
          />
        </Flex>
      ),
    [disabled, setDisabled, setValue, handleSave]
  );

  return (
    <Input
      disabled={disabled}
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
      // @ts-ignore
      rightSectionPointerEvents="all"
      rightSection={rightSection}
    />
  );
};

export default EditableInput;

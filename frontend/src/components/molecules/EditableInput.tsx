import { ActionIcon, Flex, Textarea } from "@mantine/core";
import { IconCheck, IconEdit, IconX } from "@tabler/icons-react";
import { useMemo, useState } from "react";

interface EditableInput {
  text: string;
  handleSave: (value: string) => void;
}

const EditableInput = ({ text, handleSave }: EditableInput) => {
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState(text);

  const rightSection = useMemo(
    () =>
      disabled ? (
        <ActionIcon
          aria-label="Edit caption"
          onClick={() => setDisabled(false)}
        >
          <IconEdit />
        </ActionIcon>
      ) : (
        <Flex sx={{ flexDirection: "column" }}>
          <ActionIcon
            aria-label="Save caption changes"
            onClick={() => {
              handleSave(value);
              setDisabled(true);
            }}
          >
            <IconCheck />
          </ActionIcon>
          <ActionIcon
            aria-label="Cancel caption changes"
            onClick={() => {
              setValue(text);
              setDisabled(true);
            }}
          >
            <IconX />
          </ActionIcon>
        </Flex>
      ),
    [disabled, setDisabled, setValue, handleSave]
  );

  return (
    <Textarea
      autosize
      disabled={disabled}
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
      rightSection={rightSection}
      styles={{
        input: { fontSize: "12px", overflow: "hidden" },
        rightSection: {
          padding: "8px",
          alignItems: "flex-start",
        },
      }}
    />
  );
};

export default EditableInput;

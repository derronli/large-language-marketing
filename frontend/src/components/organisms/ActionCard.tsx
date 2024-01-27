import { Action } from "@constants/types";
import { Button, Flex, Text } from "@mantine/core";
import EditableInput from "@molecules/EditableInput";

interface CardProps {
  label: string;
  date: Date;
  desc?: string;
  image?: string;
  caption?: string;
  actions: Action[];
}

const ActionCard = ({
  label,
  date,
  desc,
  image,
  caption,
  actions,
}: CardProps) => {
  return (
    <Flex
      sx={{
        width: "100%",
        flexDirection: "column",
        borderRadius: "5px",
        backgroundColor: "white",
        maxWidth: "400px",
      }}
    >
      <Flex
        sx={{
          width: "100%",
          backgroundColor: "black",
          padding: "8px 16px",
          borderRadius: "5px 5px 0 0",
        }}
      >
        <Text size="sm" color="white">
          {label}
        </Text>
      </Flex>
      <Flex sx={{ flexDirection: "column", padding: "16px", gap: "12px" }}>
        <Flex sx={{ maxWidth: "100%" }}>
          <img
            style={{ width: "100%" }}
            src="https://i.kym-cdn.com/entries/icons/original/000/026/489/crying.jpg" // TODO: replace placeholder
          />
        </Flex>
        {caption && <EditableInput text={caption} handleSave={() => {}} />}
        <Flex sx={{ width: "100%", justifyContent: "flex-end", gap: "8px" }}>
          {actions.map((a) => (
            <Button
              key={a.name}
              onClick={a.action}
              variant={a.variant}
              color="dark"
              sx={{ fontSize: "12px" }}
            >
              {a.label}
            </Button>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ActionCard;

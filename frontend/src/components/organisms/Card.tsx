import { Flex, Text } from "@mantine/core";

interface CardProps {
  label: string;
  date: Date;
  desc?: string;
  image?: string;
  caption?: string;
  actions: {
    [key: string]: () => void;
  }[];
}

const Card = ({ label, date, desc, image, caption, actions }: CardProps) => {
  return (
    <Flex
      sx={{ flexDirection: "column", borderRadius: "5px", bgcolor: "white" }}
    >
      <Flex sx={{ width: "100%", bgcolor: "white" }}>
        <Text size="sm" color="white">
          {label}
        </Text>
      </Flex>
      <Flex sx={{ flexDirection: "column", padding: 2 }}>
        <Flex sx={{ width: "100%" }}>
          <img src={image} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Card;

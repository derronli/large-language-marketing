import { Flex, Text, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

interface TitleProps {
  img: string;
  mainTitle: string;
  subTitle: string;
}

const Title = ({ img, mainTitle, subTitle }: TitleProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/profile");
  };

  return (
    <Flex
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#F7F5F0",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "24px",
        padding: "32px",
      }}
    >
      <Flex sx={{ maxWidth: "180px", justifyContent: "center" }}>
        <img style={{ width: "100%" }} src={img} />
      </Flex>

      <Flex sx={{ flexDirection: "column", width: "750px", gap: "24px" }}>
        <Text
          size="90px"
          sx={{
            fontFamily: "Source Serif Pro",
            lineHeight: "72px",
            textAlign: "center",
          }}
        >
          <span>Tap into relics of the </span>
          <span style={{ fontStyle: "italic", fontWeight: 300 }}>past</span>
          <span> to reach people of </span>
          <span style={{ fontStyle: "italic", fontWeight: 300 }}>today.</span>
        </Text>

        <Text
          size="22px"
          sx={{
            fontFamily: "Source Serif Pro",
            textAlign: "center",
            lineHeight: "20px",
          }}
        >
          {subTitle}
        </Text>
      </Flex>

      <Button
        variant="filled"
        color="dark"
        size="lg"
        radius="xs"
        sx={{ marginTop: "1rem", fontSize: "14px" }}
        onClick={handleNavigate}
      >
        GET STARTED
      </Button>
    </Flex>
  );
};

export default Title;

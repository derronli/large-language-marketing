import { Flex, Text, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

interface TitleProps {
  img: string;
  mainTitle: string;
  subTitle: string;
}

const Title = ({ img, mainTitle, subTitle }: TitleProps) => {
  let firstHalfMain = mainTitle.split("deeper")[0];
  let secondHalfMain = mainTitle.split("deeper")[1];
  let navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/profile");
  };

  // TODO: Fix the italics on deeper
  return (
    <Flex
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#F7F5F0",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        padding: "32px",
      }}
    >
      <Flex sx={{ maxWidth: "505px", justifyContent: "center" }}>
        <img style={{ width: "100%" }} src={img} />
      </Flex>

      <Flex sx={{ flexDirection: "column", width: "650px", gap: "12px" }}>
        <Text
          size="100px"
          sx={{
            fontFamily: "Source Serif Pro",
            lineHeight: "80px",
            textAlign: "center",
          }}
        >
          {firstHalfMain}
          <span style={{ fontStyle: "italic", fontWeight: 300 }}>deeper</span>
          {secondHalfMain}
        </Text>

        <Text
          size="18px"
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

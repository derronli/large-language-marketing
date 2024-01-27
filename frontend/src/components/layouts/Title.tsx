import { Flex, Text, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

interface TitleProps {
    img: string;
    mainTitle: string;
    subTitle: string;
}

const Title = ({img, mainTitle, subTitle}: TitleProps) => {
  let firstHalfMain = mainTitle.split("deeper")[0];
  let secondHalfMain = mainTitle.split("deeper")[1];
  let navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/plan")
  }

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
        <Flex sx={{ width: "30%", height:"25%", justifyContent:"center" }}>
            <img src={img} />
        </Flex>
        <br></br>
        <Flex sx={{ width: "60%", height: "20%" }}>
          <Text size="100px" sx={{ fontFamily: "Source Serif Pro", fontWeight: 300, lineHeight: "80px", letterSpacing: "0em", textAlign: "center" }}>
            {firstHalfMain}
            <span style={{ fontStyle: "italic", fontWeight: 300 }}>deeper</span>
            {secondHalfMain}
          </Text>
        </Flex>
        <br></br>
        <Flex sx={{ width: "40%", height: "10%", marginTop: "5%"}}>
          <Text size="20px" fw={400} fs="italic" sx={{ fontFamily: "Source Serif Pro", textAlign: "center", lineHeight: "25px"}}>
              {subTitle}
          </Text>
        </Flex>
        
        <Button variant="filled" color="dark" size="lg" radius="xs" sx={{marginTop: "1rem", width: "15%"}} onClick={handleNavigate}>GET STARTED</Button>       

      </Flex>
    );
  };

  
  export default Title;
  
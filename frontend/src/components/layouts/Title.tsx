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
        <Flex sx={{ width: "269px", height:"168px", top: "63px", justifyContent:"center" }}>
            <img src={img} />
        </Flex>
        <br></br>
        <Flex sx={{ width: "774px", height: "240px", top: "266px", left: "254px"}}>
          <Text size="100px" sx={{ fontFamily: "Source Serif Pro", fontWeight: 300, lineHeight: "80px", letterSpacing: "0em", textAlign: "center" }}>
            {firstHalfMain}
            <span style={{ fontStyle: "italic", fontWeight: 300 }}>deeper</span>
            {secondHalfMain}
          </Text>
        </Flex>
        <br></br>
        <Flex sx={{ width: "599px", height: "75px", top: "541px", left: "340px"}}>
          <Text size="20px" fw={400} fs="italic" sx={{ fontFamily: "Source Serif Pro", textAlign: "center", lineHeight: "25px"}}>
              {subTitle}
          </Text>
        </Flex>
        
        <Button variant="filled" color="dark" size="lg" radius="xs" sx={{marginTop: "20px", width: "213px"}} >SIGN UP</Button>
        <Button variant="outline" color="dark" size="lg" radius="xs" sx={{marginTop: "10px", width: "213px"}} onClick={handleNavigate}>LOG IN</Button>         

      </Flex>
    );
  };

  
  export default Title;
  
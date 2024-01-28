import { Flex, Text } from "@mantine/core";
import { product_name } from "@constants/business";
import { LayoutProps } from "@constants/types";
import { useNavigate } from "react-router-dom";

interface DashboardProps extends LayoutProps {
  header: string;
}

const Dashboard = ({ children, header }: DashboardProps) => {
  const navigate = useNavigate();

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
        boxSizing: "border-box",
      }}
    >
      <Flex
        sx={{
          height: "15%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        <Text
          onClick={() => navigate("/")}
          sx={{
            textTransform: "uppercase",
            letterSpacing: "2px",
            fontWeight: 100,
            fontSize: "10px",
            cursor: "pointer",
          }}
        >
          {product_name}
        </Text>
        <Text size="32px" sx={{ fontFamily: "Source Serif Pro" }}>
          {header}
        </Text>
      </Flex>
      <Flex sx={{ width: "100%", height: "85%" }}>{children}</Flex>
    </Flex>
  );
};

export default Dashboard;

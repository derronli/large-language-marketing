import { Flex, Text } from "@mantine/core";
import { product_name } from "@constants/business";
import { LayoutProps } from "@constants/types";

interface DashboardProps extends LayoutProps {
  header: string;
}

const Dashboard = ({ children, header }: DashboardProps) => {
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
      <Text size="sm" sx={{ textTransform: "uppercase" }}>
        {product_name}
      </Text>
      <Text size="32px" sx={{ fontFamily: "Source Serif Pro" }}>
        {header}
      </Text>
      <Flex sx={{ width: "100%", overflow: "hidden" }}>{children}</Flex>
    </Flex>
  );
};

export default Dashboard;

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
        bgcolor: "#F7F5F0",
        flexDirection: "column",
        justifyContent: "center",
        gap: 1,
      }}
    >
      <Text size="sm" sx={{ textTransform: "uppercase" }}>
        {product_name}
      </Text>
      <Text size="xl">{header}</Text>
      {children}
    </Flex>
  );
};

export default Dashboard;

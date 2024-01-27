import { dummyGet } from "@api/dummy";
import useRequest from "@hooks/useRequest";
import { Button, Code, Flex, Title } from "@mantine/core";

const Home = () => {
  const { data, makeRequest } = useRequest({
    request: dummyGet,
    requestByDefault: false,
  });

  return (
    <Flex direction="column" sx={{ width: "400px" }}>
      <Title order={1}>Home</Title>
      <Button onClick={() => makeRequest({ postId: 1 })}>
        Call a dummy API
      </Button>
      <Code>{data && JSON.stringify(data)}</Code>
    </Flex>
  );
};

export default Home;

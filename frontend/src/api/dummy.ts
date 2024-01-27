import { get, post } from "./fetchRequests";

interface dummyGetProps {
  params: { postId?: string };
}

export const dummyGet = async ({ params }: dummyGetProps) => {
  const data = await get({
    url: "https://jsonplaceholder.typicode.com/comments",
    params: params,
  });
  return data;
};

interface dummyPostProps {
  params: {
    title: string;
    body: string;
    userId: number;
  };
}

export const dummyPost = async ({ params }: dummyPostProps) => {
  const data = await post({
    url: "https://jsonplaceholder.typicode.com/posts",
    body: params,
  });

  return data;
};

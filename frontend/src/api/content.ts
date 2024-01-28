import { get, post } from "./fetchRequests";
const baseURL = import.meta.env.VITE_BASE_URL;

interface getCampaignProps {
  params: { campaign_id: string };
}

export const getCampaign = async ({ params }: getCampaignProps) => {
  const data = await get({
    url: `${baseURL}/campaign`,
    params: params,
  });

  return data;
};

interface publishPostProps {
  params: {
    media_type: string;
    media_url: string;
    caption: string;
  };
}

export const publishPost = async ({ params }: publishPostProps) => {
  const data = await post({
    url: `${baseURL}/instagram`,
    body: params,
  });

  return data;
};

interface erasePostProps {
  params: {
    post_id: string;
    image_url: string;
  };
}

export const erasePost = async ({ params }: erasePostProps) => {
  const data = await post({
    url: `${baseURL}/erase`,
    body: params,
  });

  return data;
};

// TODO: delete if unneeded
interface getPostProps {
  params: { postId?: string };
}

export const getPost = async ({ params }: getPostProps) => {
  const data = await get({
    url: `${baseURL}/post`,
    params: params,
  });

  return data;
};

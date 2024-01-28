import { get } from "./fetchRequests";
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

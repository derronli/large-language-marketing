import { post } from "./fetchRequests";
const baseURL = import.meta.env.VITE_BASE_URL;

interface saveProfileProps {
  params: {
    company: string;
    product: string;
    era: string;
    avenues: string[];
  };
}

export const saveProfile = async ({ params }: saveProfileProps) => {
  const data = await post({
    url: `${baseURL}/profile`,
    body: params,
  });

  return data;
};

interface saveDateProps {
  params: {
    date: Date;
  };
}

export const saveDate = async ({ params }: saveDateProps) => {
  const data = await post({
    url: `${baseURL}/save/date`,
    body: params,
  });

  return data;
};

interface saveCaptionProps {
  params: {
    caption: string;
  };
}

export const saveCaption = async ({ params }: saveCaptionProps) => {
  const data = await post({
    url: `${baseURL}/save/caption`,
    body: params,
  });

  return data;
};

interface saveStatusProps {
  params: {
    status: string;
  };
}

export const saveStatus = async ({ params }: saveStatusProps) => {
  const data = await post({
    url: `${baseURL}/save/status`,
    body: params,
  });

  return data;
};

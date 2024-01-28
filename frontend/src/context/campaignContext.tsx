import {
  createContext,
  useState,
  useMemo,
  ReactNode,
  useContext,
  useCallback,
} from "react";

interface CampaignContextType {
  campaign: string;
  assignCampaign: (c: string) => void;
}

const CampaignContext = createContext<CampaignContextType>(
  {} as CampaignContextType
);

export const CampaignProvider = ({ children }: { children: ReactNode }) => {
  const [campaign, setCampaign] = useState<string>("");

  const assignCampaign = useCallback(
    (c: string) => {
      if (c !== campaign) {
        setCampaign(c);
      }
    },
    [campaign, setCampaign]
  );

  const memoedValue = useMemo(
    () => ({
      campaign,
      assignCampaign,
    }),
    [campaign, assignCampaign]
  );

  return (
    <CampaignContext.Provider value={memoedValue}>
      {children}
    </CampaignContext.Provider>
  );
};

export default function useCampaign() {
  return useContext(CampaignContext);
}

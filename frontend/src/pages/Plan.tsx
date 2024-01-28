import { getCampaign } from "@api/content";
import useCampaign from "@context/campaignContext";
import useRequest from "@hooks/useRequest";
import { Flex } from "@mantine/core";
import ActionCard from "@organisms/ActionCard";
import { useEffect } from "react";
import Dashboard from "src/components/layouts/Dashboard";
import Pannable from "src/components/layouts/Pannable";

const Plan = () => {
  const { campaign } = useCampaign();

  const { data, makeRequest } = useRequest({
    request: getCampaign,
    requestByDefault: false,
  });

  useEffect(() => {
    if (!data && campaign) {
      makeRequest(`campaign_id=${campaign}`);
    }
  }, [data, makeRequest, campaign]);

  return (
    <Dashboard header="Here's the plan.">
      <Pannable>
        <Flex
          sx={{
            margin: "1000px",
            gap: "60px",
          }}
        >
          {data ? (
            data.data.map((d: any) => (
              <ActionCard
                key={d.post_id}
                id={d.post_id}
                label="Social Media Post"
                date={new Date(Date.parse(d.date))}
                image={d.image}
                caption={d.caption}
                status={d.status}
                actions={[
                  {
                    name: "post",
                    label: "Post now",
                    action: () => {},
                    variant: "filled",
                    disabled: d.status == "posted",
                  },
                  {
                    name: "schedule",
                    label: "Schedule post",
                    action: () => {},
                    variant: "outline",
                    disabled: d.status == "posted",
                  },
                ].reverse()}
                mutate={makeRequest}
              />
            ))
          ) : (
            <ActionCard
              id="bc4331aa-ea8c-45c0-98cc-efa7bec04943"
              label="Placeholder"
              date={new Date()}
              image="https://i.kym-cdn.com/entries/icons/original/000/026/489/crying.jpg"
              actions={[]}
              mutate={makeRequest}
            />
          )}
        </Flex>
      </Pannable>
    </Dashboard>
  );
};

export default Plan;

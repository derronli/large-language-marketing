import { getCampaign } from "@api/content";
import useRequest from "@hooks/useRequest";
import { Flex } from "@mantine/core";
import ActionCard from "@organisms/ActionCard";
import { useEffect } from "react";
import Dashboard from "src/components/layouts/Dashboard";
import Pannable from "src/components/layouts/Pannable";

const Plan = () => {
  const { data, makeRequest } = useRequest({
    request: getCampaign,
    requestByDefault: false,
  });

  useEffect(() => {
    if (!data) {
      makeRequest();
    }
  }, [data, makeRequest]);

  return (
    // TODO: render as loading while data is not yet produced
    // TODO: render based on data
    <Dashboard header="Here's the plan.">
      <Pannable>
        <Flex
          sx={{
            width: "100%",
            gap: "60px",
          }}
        >
          <ActionCard
            label="Social Media Post"
            date={new Date()}
            image="wtv"
            caption="Blocking out romance scams one 'Mean Girls' reference at a time! 💔 On this 'World Romance Scammers Prevention Day,' let's swipe right on awareness and left on suspicious behavior. Remember, real connections > Regina George drama. Stay sharp, stay safe, and keep it fetch! 💖🚫 #ScamFreeLove #MeanGirlsRomanceScamPrevention"
            actions={[
              {
                name: "post",
                label: "Post now",
                action: () => {
                  console.log("post");
                },
                variant: "filled",
              },
              {
                name: "schedule",
                label: "Schedule post",
                action: () => {
                  console.log("schedule");
                },
                variant: "outline",
              },
            ].reverse()}
            mutate={makeRequest}
          />
          <ActionCard
            label="Social Media Post"
            date={new Date()}
            image="wtv"
            caption="Blocking out romance scams one 'Mean Girls' reference at a time! 💔 On this 'World Romance Scammers Prevention Day,' let's swipe right on awareness and left on suspicious behavior. Remember, real connections > Regina George drama. Stay sharp, stay safe, and keep it fetch! 💖🚫 #ScamFreeLove #MeanGirlsRomanceScamPrevention"
            actions={[
              {
                name: "post",
                label: "Post now",
                action: () => {},
                variant: "filled",
              },
              {
                name: "schedule",
                label: "Schedule post",
                action: () => {},
                variant: "outline",
              },
            ].reverse()}
            mutate={makeRequest}
          />
          <ActionCard
            label="Social Media Post"
            date={new Date()}
            image="wtv"
            caption="Blocking out romance scams one 'Mean Girls' reference at a time! 💔 On this 'World Romance Scammers Prevention Day,' let's swipe right on awareness and left on suspicious behavior. Remember, real connections > Regina George drama. Stay sharp, stay safe, and keep it fetch! 💖🚫 #ScamFreeLove #MeanGirlsRomanceScamPrevention"
            actions={[
              {
                name: "post",
                label: "Post now",
                action: () => {},
                variant: "filled",
              },
              {
                name: "schedule",
                label: "Schedule post",
                action: () => {},
                variant: "outline",
              },
            ].reverse()}
            mutate={makeRequest}
          />
        </Flex>
      </Pannable>
    </Dashboard>
  );
};

export default Plan;

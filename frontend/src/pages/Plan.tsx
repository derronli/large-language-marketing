// import useRequest from "@hooks/useRequest";
import { Flex } from "@mantine/core";
import ActionCard from "@organisms/ActionCard";
import Dashboard from "src/components/layouts/Dashboard";
import Pannable from "src/components/layouts/Pannable";

const Plan = () => {
  //   const { data, makeRequest } = useRequest({
  //     request: dummyGet,
  //     requestByDefault: false,
  //   });

  // FIX THE FACT THAT YOU CAN NO LONGER EDIT
  return (
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
          />
        </Flex>
      </Pannable>
    </Dashboard>
  );
};

export default Plan;

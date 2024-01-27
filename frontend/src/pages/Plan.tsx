// import useRequest from "@hooks/useRequest";
import ActionCard from "@organisms/ActionCard";
// import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Dashboard from "src/components/layouts/Dashboard";

const Plan = () => {
  //   const { data, makeRequest } = useRequest({
  //     request: dummyGet,
  //     requestByDefault: false,
  //   });

  return (
    <Dashboard header="Here's the plan.">
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
    </Dashboard>
  );
};

export default Plan;

import { saveCaption, saveDate } from "@api/db";
import { Action } from "@constants/types";
import useCampaign from "@context/campaignContext";
import useRequest from "@hooks/useRequest";
import { Button, Flex, Text } from "@mantine/core";
import DatePicker from "@molecules/DatePicker";
import EditableInput from "@molecules/EditableInput";

interface CardProps {
  id: string;
  label: string;
  date: Date;
  desc?: string;
  image?: string;
  caption?: string;
  actions: Action[];
  mutate: (v: any) => void;
}

const ActionCard = ({
  id,
  label,
  date,
  desc,
  image,
  caption,
  actions,
  mutate,
}: CardProps) => {
  const { campaign } = useCampaign();

  const { makeRequest: requestSaveDate } = useRequest({
    request: saveDate,
    requestByDefault: false,
  });

  const { makeRequest: requestSaveCaption } = useRequest({
    request: saveCaption,
    requestByDefault: false,
  });

  const handleSaveDate = async (v: Date) => {
    await requestSaveDate({
      post_id: id,
      date: v,
    });
    mutate(`campaign_id=${campaign}`);
  };

  const handleSaveCaption = async (v: string) => {
    await requestSaveCaption({
      post_id: id,
      caption: v,
    });
    mutate(`campaign_id=${campaign}`);
  };

  return (
    <Flex sx={{ flexDirection: "column" }}>
      <DatePicker date={date} handleSave={handleSaveDate} />
      <Flex
        sx={{
          flexDirection: "column",
          borderRadius: "5px",
          backgroundColor: "white",
          width: "400px",
        }}
      >
        <Flex
          sx={{
            width: "100%",
            backgroundColor: "black",
            padding: "8px 16px",
            borderRadius: "5px 5px 0 0",
          }}
        >
          <Text size="sm" color="white">
            {label}
          </Text>
        </Flex>
        <Flex sx={{ flexDirection: "column", padding: "16px", gap: "12px" }}>
          <Flex sx={{ maxWidth: "100%" }}>
            <img style={{ width: "100%" }} src={image} />
          </Flex>
          {caption && (
            <EditableInput text={caption} handleSave={handleSaveCaption} />
          )}
          <Flex sx={{ width: "100%", justifyContent: "flex-end", gap: "8px" }}>
            {actions.map((a) => (
              <Button
                key={a.name}
                onClick={a.action}
                variant={a.variant}
                color="dark"
                sx={{ fontSize: "12px" }}
              >
                {a.label}
              </Button>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ActionCard;

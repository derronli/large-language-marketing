import { Flex, Modal, Text, Select, Button } from "@mantine/core";
import { useMemo, useState } from "react";

interface ActionModal {
  open: boolean;
  type: string;
  handleClose: () => void;
  handleAction: (v: string) => void;
}

const ActionModal = ({
  open,
  type,
  handleClose,
  handleAction,
}: ActionModal) => {
  const [submitted, setSubmitted] = useState(false);
  const [platform, setPlatform] = useState<string | null>(null);
  const [medium, setMedium] = useState<string | null>(null);

  const renderButtons = useMemo(() => {
    switch (type) {
      case "post":
        return (
          <Flex sx={{ flexDirection: "column", gap: "12px" }}>
            <Select
              label="Platform"
              placeholder="Select an option..."
              data={["Instagram", "Linkedin", "Facebook", "X"]}
              value={platform}
              onChange={setPlatform}
            />
            <Select
              label="Medium"
              placeholder="Select an option..."
              data={["Static Post", "24-Hour Story", "Reel"]}
              value={medium}
              onChange={setMedium}
            />
            <Button
              disabled={
                platform != "Instagram" || medium == "Reel" || submitted
              }
              onClick={() => {
                if (medium) {
                  handleAction(medium);
                  setSubmitted(true);
                }
              }}
              color="dark"
              sx={{ fontSize: "12px" }}
            >
              Post
            </Button>
          </Flex>
        );
      case "success":
        return <Text>Successfully posted!</Text>;
      default:
        return <Text>Feature coming soon!</Text>;
    }
  }, [type, platform, medium, setMedium, setPlatform, handleAction]);

  return (
    <Modal opened={open} onClose={handleClose} withCloseButton={false} centered>
      {renderButtons}
    </Modal>
  );
};

export default ActionModal;

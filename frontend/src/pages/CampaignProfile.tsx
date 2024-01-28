import { saveProfile } from "@api/db";
import useCampaign from "@context/campaignContext";
import useRequest from "@hooks/useRequest";
import { Flex, LoadingOverlay } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "src/components/layouts/Dashboard";

const CampaignProfile = () => {
  const { data, loading, makeRequest } = useRequest({
    request: saveProfile,
    requestByDefault: false,
  });

  const navigate = useNavigate();
  const { assignCampaign } = useCampaign();

  const [formData, setFormData] = useState({
    company: "",
    product: "",
    era: "",
    avenues: [
      {
        platform: "option1",
        handle: "",
      },
    ],
  });

  const handleChange = (event: any) => {
    const { name, value, id } = event.target;
    if (name === "avenues" + id) {
      const avenues = [...formData.avenues];
      if (event.target.tagName == "SELECT") {
        avenues[id].platform = value;
      } else {
        avenues[id].handle = value;
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        ["avenues"]: avenues,
      }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  const addAvenues = (event: any) => {
    event.preventDefault();
    // Create a copy of the formData object
    const formDataCopy = { ...formData };

    // Create a new marketing option object and push it to the avenues array
    const newAvenues = {
      platform: "option1", // Change this to the desired platform
      handle: "", // Set the handle as needed
    };
    formDataCopy.avenues.push(newAvenues);

    // Update the state with the new formData
    setFormData(formDataCopy);
  };

  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      await makeRequest(formData);
    },
    [formData]
  );

  useEffect(() => {
    if (data) {
      assignCampaign(data.id);
      navigate("/plan");
    }
  }, [data]);

  return (
    <Dashboard header="Let's dive into the product.">
      <Flex sx={{ width: "100%", overflow: "auto", padding: "32px" }}>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "80%",
            margin: "auto",
          }}
          onSubmit={handleSubmit}
        >
          <div className="formSection">
            <label htmlFor="company" className="font1">
              Describe the company, organization, or brand.
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="formSize2 formTextBorder"
              placeholder="Start typing here..."
            />
          </div>
          <div className="formSection">
            <label htmlFor="product" className="font1">
              Describe what's being marketed.
            </label>
            <textarea
              id="product"
              name="product"
              value={formData.product}
              onChange={handleChange}
              placeholder="Start typing here..."
              className="formText1 formTextBorder"
            />
          </div>
          <div className="formSection">
            <label htmlFor="era" className="font1">
              Describe the era/theme to throwback to.
            </label>
            <input
              type="text"
              id="era"
              name="era"
              value={formData.era}
              onChange={handleChange}
              className="formSize2 formTextBorder"
              placeholder="Start typing here..."
            />
          </div>
          <div className="formSection">
            <label htmlFor="avenues" className="font1">
              List and configure the avenues of marketing being used.
            </label>

            {formData.avenues.map((option, index) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "5px",
                }}
                key={index}
              >
                <select
                  name={"avenues" + index}
                  id={"" + index}
                  value={option.platform}
                  onChange={handleChange}
                  className="formTextBorder formSize2"
                  style={{ flex: 0.75 }}
                >
                  <option value="option1">Instagram</option>
                  <option value="option2">Facebook</option>
                  <option value="option3">YouTube</option>
                </select>
                <input
                  type="text"
                  name={"avenues" + index}
                  id={"" + index}
                  value={option.handle}
                  onChange={handleChange}
                  className="formSize2 formTextBorder"
                  placeholder="Type a handle here..."
                  style={{ flex: 1, marginLeft: "10px" }}
                />
                <button className="formBtn formBtnSM">CONFIGURE</button>
              </div>
            ))}

            <button className="formBtn formBtnXL" onClick={addAvenues}>
              ADD ANOTHER
            </button>
          </div>

          <button type="submit" className="formBtn formBtnLG">
            GENERATE CAMPAIGN
          </button>
        </form>
      </Flex>
      {loading && (
        <LoadingOverlay visible={loading} zIndex={1000} overlayBlur={2} />
      )}
    </Dashboard>
  );
};

export default CampaignProfile;

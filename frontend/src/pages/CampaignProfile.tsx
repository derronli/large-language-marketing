import React, { useState } from "react";
import Dashboard from "src/components/layouts/Dashboard";

const CampaignProfile = () => {
  const [formData, setFormData] = useState({
    product: "",
    era: "",
    marketingOption: [
      {
        platform: "option1",
        handle: "",
      },
    ],
  });

  const handleChange = (event: any) => {
    const { name, value, id } = event.target;
    if (name === "marketingOption" + id) {
      const marketingOptions = [...formData.marketingOption];
      if (event.target.tagName == "SELECT") {
        marketingOptions[id].platform = value;
      } else {
        marketingOptions[id].handle = value;
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        ["marketingOption"]: marketingOptions,
      }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
    console.log(formData);
  };

  const addMarketingOption = (event: any) => {
    event.preventDefault();
    // Create a copy of the formData object
    const formDataCopy = { ...formData };

    // Create a new marketing option object and push it to the marketingOption array
    const newMarketingOption = {
      platform: "option1", // Change this to the desired platform
      handle: "", // Set the handle as needed
    };
    formDataCopy.marketingOption.push(newMarketingOption);

    // Update the state with the new formData
    setFormData(formDataCopy);
  };
  return (
    <Dashboard header="Let's dive into the product">
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "80%",
          margin: "auto",
        }}
      >
        <div className="formSection">
          <label htmlFor="product" className="font1">
            What are your trying to sell?
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
            What era are you trying to go for?
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
          <label htmlFor="marketingOption" className="font1">
            Which avenues of marketing are you using?
          </label>

          {formData.marketingOption.map((option, index) => (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "5px",
              }}
              key={index}
            >
              <select
                name={"marketingOption" + index}
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
                name={"marketingOption" + index}
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

          <button className="formBtn formBtnXL" onClick={addMarketingOption}>
            ADD ANOTHER
          </button>
        </div>

        <button type="submit" className="formBtn formBtnLG">
          GENERATE CAMPAIGN PLAN
        </button>
      </form>
    </Dashboard>
  );
};

export default CampaignProfile;

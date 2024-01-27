import React, { useState } from "react";
import Dashboard from "src/components/layouts/Dashboard";

const CampaignProfile = () => {
  const [formData, setFormData] = useState({
    product: "",
    era: "",
    marketingOption: "option1",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
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
          <div style={{ display: "flex", flexDirection: "row" }}>
            <select
              name="marketingOption"
              id="marketingOption"
              value={formData.marketingOption}
              onChange={handleChange}
              className="formTextBorder formSize2"
              style={{ flex: 0.75 }}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
            <input
              type="text"
              id=""
              name=""
              className="formSize2 formTextBorder"
              placeholder="Type a handle here..."
              style={{ flex: 1, marginLeft: "10px" }}
            />
            <button className="formBtn formBtnSM">CONFIGURE</button>
          </div>
        </div>
        <button type="submit" className="formBtn formBtnLG">
          GENERATE CAMPAIGN PLAN
        </button>
      </form>
    </Dashboard>
  );
};

export default CampaignProfile;

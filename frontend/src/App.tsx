import Landing from "@pages/Landing";
import NotFound from "@pages/NotFound";
import Plan from "@pages/Plan";
import CampaignProfile from "@pages/CampaignProfile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/profile" element={<CampaignProfile />} />
      </Routes>
    </Router>
  );
};

export default App;

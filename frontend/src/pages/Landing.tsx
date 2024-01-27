import Title from "src/components/layouts/Title";
import staticData from "src/data/content.json";

const Landing = () => {
  return (
    <Title
      img={staticData.Title.img}
      mainTitle={staticData.Title.mainTitle}
      subTitle={staticData.Title.subTitle}
    />
  );
};

export default Landing;

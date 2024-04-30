import img1 from "./assets/img/토토로.gif";

const App = () => {
  return (
    <>
      <img
        src={img1}
        alt="포뇨"
        style={{ width: "150px", height: "200px", objectFit: "cover" }}
      />
    </>
  );
};

export default App;

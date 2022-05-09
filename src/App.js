import "./styles.css";
import Component from "./Component";
import Shuffler from "./Shuffler";

export default function App() {
  return (
    <div className="App">
      <Shuffler
        question="An animal cell contains:"
        correctAnswers={[
          "Ribosomes",
          "Cytoplasm",
          "Partially permeable membrane",
          "Mitochondria"
        ]}
        wrongAnswers={[
          "Cell wall",
          "Chloroplast",
          "Impermeable membrane",
          "Celluose"
        ]}
        InputComponent={Component}
      />
    </div>
  );
}

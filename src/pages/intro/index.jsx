import styles from "../../styles/Intro.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";

const intro = () => {
  const [slide, setSlide] = useState({});
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const slides = [
    {
      id: 1,
      img: "slide1.gif",
      text: "Entra nel mondo degli eventi con Moveeda: scopri, partecipa, crea.",
    },
    {
      id: 2,
      img: "slide2.gif",
      text: "La tua guida agli eventi imperdibili nella tua zona e in giro per il mondo",
    },
    {
      id: 3,
      img: "slide3.gif",
      text: "Ogni giorno è un'opportunità per un nuovo evento da vivere in compagnia.",
    },
    {
      id: 4,
      img: "slide4.gif",
      text: "Da concerti a mostre, da sport a workshop - tutto a portata di tap con Moveeda.",
    },
    {
      id: 5,
      img: "slide5.gif",
      text: "Che aspetti? datti alla Moveeda ;) ",
    },
  ];

  const nextSlide = () => {
    setIndex((prevCounterSlide) => prevCounterSlide + 1);
    setSlide(slides[index + 1]);
  };

  const prevSlide = () => {
    setIndex((prevCounterSlide) =>
      prevCounterSlide - 1 < 0 ? prevCounterSlide : prevCounterSlide - 1
    );
    setSlide(slides[index]);
  };

  const handleFinishIntro = () => {
    localStorage.setItem("intro", true);
    router.push("/login");
  };

  return (
    <div className={styles.Intro}>
      <div className={styles.Overlay}></div>
      <div className={styles.Background}>
        <img src={`/intro/${slides[index].img}`} alt="" />
      </div>
      <div className={styles.MainArea}>
        <div className={styles.TextArea}>
          <h1>{slides[index].text}</h1>
        </div>
        <div className={styles.Actions}>
          {index > 0 ? <button onClick={prevSlide}>INDIETRO</button> : <></>}
          {index < 4 ? (
            <button onClick={nextSlide}>CONTINUA</button>
          ) : (
            <button onClick={handleFinishIntro}>ACCEDI!</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default intro;

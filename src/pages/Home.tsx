import {
  IonText,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
} from "@ionic/react";
import "./Home.css";
import { useHistory } from "react-router-dom";
import { cardCollection } from "../components/exampleData";
import { diamond, navigate } from "ionicons/icons";

const Home: React.FC<{ finished: number }> = ({ finished }) => {
  const history = useHistory();

  const navigateToCardScreen = () => {
    history.push("/cardscreen");
  };
  return (
    <IonPage>
      <IonHeader color="tertiary">
        <IonToolbar>
          <IonTitle className="title">EiDetic</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false} className="home-content">
        <IonIcon
          icon={diamond}
          style={{ fontSize: "3em", left: "45%", position: "relative" }}
        ></IonIcon>
        <IonCard className="task-card">
          <IonCardContent className="remaining-content">
            <IonText className="today-task">Today's Task:</IonText>
            <IonCard className="wrapped-card" onClick={navigateToCardScreen}>
              <IonCardContent className="wrapped-card-content">
                <IonText className="today-task">
                  {cardCollection.length - finished}
                </IonText>
              </IonCardContent>
            </IonCard>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;

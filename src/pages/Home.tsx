import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Home.css';
import ShoppingCart from '../components/ShoppingCart/ShoppingCart';
import { useRef, useState } from 'react';
import IonMenuContainer from '../components/IonMenuContainer/IonMenuContainer';
import { Total } from '../interfaces/Total';

const Home: React.FC = () => {
  const page = useRef(undefined);
  const [total, setTotal] = useState<Total | undefined>(undefined);

  return (
    <>
      <IonMenuContainer
        contentId="main-content"
        setTotal={setTotal}
        total={total}
      />

      <IonPage id="main-content" ref={page}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Shopping Cart</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Shopping Cart</IonTitle>
            </IonToolbar>
          </IonHeader>

          <ShoppingCart page={page} total={total} setTotal={setTotal} />
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;

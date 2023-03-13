import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/react';

interface IonMenuContainerProps {
  contentId: string;
}

const IonMenuContainer: React.FC<IonMenuContainerProps> = ({ contentId }) => {
  return (
    <IonMenu contentId={contentId}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu Content</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">This is the menu content.</IonContent>
    </IonMenu>
  );
};

export default IonMenuContainer;

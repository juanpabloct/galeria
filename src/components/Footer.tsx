import {
  IonFooter,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { logoFacebook, logoInstagram, logoTwitter } from "ionicons/icons";

const Footer = () => {
  return (
    <IonFooter>
      <IonToolbar className="footer">
        <IonTitle size="small">
          © 2024 Mi Galería. Todos los derechos reservados.
        </IonTitle>

        <IonButtons slot="end">
          <IonButton href="https://facebook.com" target="_blank">
            <IonIcon icon={logoFacebook} />
          </IonButton>
          <IonButton href="https://instagram.com" target="_blank">
            <IonIcon icon={logoInstagram} />
          </IonButton>
          <IonButton href="https://twitter.com" target="_blank">
            <IonIcon icon={logoTwitter} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;

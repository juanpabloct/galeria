import { useState, useEffect } from 'react';
import {
  IonButton,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonFab,
  IonFabButton,
  IonIcon,
  IonAlert,
  IonSpinner
} from '@ionic/react';
import { camera, trash } from 'ionicons/icons';
import { takePhoto } from '../services/photoService';
import Footer from './Footer';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    const storedPhotos = JSON.parse(localStorage.getItem('photos') || '[]');
    setPhotos(storedPhotos);
  }, []);

  useEffect(() => {
    localStorage.setItem('photos', JSON.stringify(photos));
  }, [photos]);

  const handleTakePhoto = async () => {
    setLoading(true);
    const photoUrl = await takePhoto();
    console.log(photoUrl, 'phooto');
    setLoading(false);
    if (photoUrl) {
      const updatedPhotos = [photoUrl, ...photos];
      setPhotos(updatedPhotos.slice(0, 10));
    }
  };

  const handleDeletePhotos = () => {
    setShowAlert(true);
  };

  const confirmDeletePhotos = () => {
    setPhotos([]);
    localStorage.removeItem('photos');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Galería de Fotos</IonTitle>
          <IonButton slot='end' fill='clear' onClick={handleDeletePhotos}>
            <IonIcon icon={trash} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent className='ion-padding'>
        {photos.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>
            No hay fotos aún. ¡Toma una!
          </p>
        ) : (
          <p style={{ textAlign: 'center', color: 'gray' }}>
            📸 Fotos tomadas: {photos.length}/10
          </p>
        )}

        {loading && (
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <IonSpinner name='crescent' />
            <p>Procesando...</p>
          </div>
        )}

        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size='6' size-md='4' key={index}>
                <IonImg
                  src={photo}
                  alt={`Foto ${index + 1}`}
                  style={{
                    borderRadius: '10px',
                    boxShadow: '2px 2px 10px rgba(0,0,0,0.2)',
                    transition: 'transform 0.2s',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedPhoto(photo)}
                />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonFab vertical='bottom' horizontal='center' slot='fixed'>
          <IonFabButton onClick={handleTakePhoto}>
            <IonIcon icon={camera} />
          </IonFabButton>
        </IonFab>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header='Eliminar Fotos'
          message='¿Seguro que quieres borrar todas las fotos?'
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel'
            },
            {
              text: 'Eliminar',
              handler: confirmDeletePhotos
            }
          ]}
        />

        {selectedPhoto && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
            onClick={() => setSelectedPhoto(null)}
          >
            <IonImg
              src={selectedPhoto}
              style={{
                maxWidth: '90%',
                maxHeight: '90%',
                borderRadius: '10px'
              }}
            />
          </div>
        )}
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default PhotoGallery;

import { useState, useEffect } from 'react';
import {
  IonButton,
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonFab,
  IonFabButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonModal,
  IonCheckbox
} from '@ionic/react';
import { add, trash, close } from 'ionicons/icons';
import Footer from './Footer';
import axios from 'axios';
import { server } from '../contants';
import { useHistory } from 'react-router';

const AlbumGallery = () => {
  const getUser = localStorage.getItem('userId');
  const [albums, setAlbums] = useState<
    {
      id: number;
      name: string;
      user_id: number;
      isPublic: boolean;
    }[]
  >([]);
  const [newAlbum, setNewAlbum] = useState({ name: '', isPublic: false });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      const getAlbums = await axios.get(`${server}user/${getUser}/album`);
      const storedAlbums = getAlbums.data;
      setAlbums(storedAlbums);
    })();
  }, []);

  useEffect(() => {
    localStorage.setItem('albums', JSON.stringify(albums));
  }, [albums]);

  const handleCreateAlbum = async () => {
    if (newAlbum.name.trim() === '') return;
    try {
      const dataUser = await axios.post(
        `${server}user/${getUser}/album`,
        newAlbum
      );
      setAlbums([...albums, { ...dataUser.data }]);
      setNewAlbum({ name: '', isPublic: false });
      setShowModal(false);
    } catch (error) {
      console.error('Error al crear el álbum:', error);
    }
  };
  const history = useHistory();

  const handleDeleteAlbum = (albumName: string) => {
    const updatedAlbums = albums.filter((album) => album.name !== albumName);
    setAlbums(updatedAlbums);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Álbumes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className='ion-padding'>
        <IonList>
          {albums.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'gray' }}>
              No hay álbumes. ¡Crea uno!
            </p>
          ) : (
            albums.map((album, index) => (
              <IonItem
                key={index}
                button
                onClick={() => history.push(`/${album.id}/gallery`)}
              >
                <IonLabel>{album.name}</IonLabel>
              </IonItem>
            ))
          )}
        </IonList>

        <IonFab vertical='bottom' horizontal='center' slot='fixed'>
          <IonFabButton onClick={() => setShowModal(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        {/* Modal para crear un nuevo álbum */}
        <IonModal
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
          animated
        >
          <IonContent className='ion-padding'>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Nuevo Álbum</IonTitle>
                <IonButton
                  slot='end'
                  fill='clear'
                  onClick={() => setShowModal(false)}
                >
                  <IonIcon icon={close} />
                </IonButton>
              </IonToolbar>
            </IonHeader>

            <IonItem>
              <IonLabel position='stacked'>Nombre del álbum</IonLabel>
              <IonInput
                value={newAlbum.name}
                onIonChange={(e) =>
                  setNewAlbum((current) => ({
                    ...current,
                    name: e.detail.value!
                  }))
                }
              />
            </IonItem>

            <IonItem>
              <IonLabel>Es público</IonLabel>
              <IonCheckbox
                checked={newAlbum.isPublic}
                onIonChange={(e) =>
                  setNewAlbum((current) => ({
                    ...current,
                    isPublic: e.detail.checked
                  }))
                }
              />
            </IonItem>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '16px'
              }}
            >
              <IonButton color='medium' onClick={() => setShowModal(false)}>
                Cancelar
              </IonButton>
              <IonButton onClick={handleCreateAlbum}>Crear álbum</IonButton>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>

      <Footer />
    </IonPage>
  );
};

export default AlbumGallery;

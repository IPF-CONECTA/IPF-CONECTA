import React from 'react';
import styles from '../../public/custom.module.css';

export const CustomModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Iniciar Sesión, para continuar...</h2>
        <button onClick={onClose} className={styles.closeButton}>
          Cerrar
        </button>
      </div>
    </div>
  );
};


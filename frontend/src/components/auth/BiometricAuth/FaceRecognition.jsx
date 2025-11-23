import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import styles from './FaceRecognition.module.scss';

const FaceRecognition = ({ onAuthenticated }) => {
  const videoRef = useRef();
  const [loading, setLoading] = useState(true);
  const [recognized, setRecognized] = useState(false);
  const [error, setError] = useState(null);
  const detectionInterval = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        ]);
        setLoading(false);
        startVideo();
      } catch (err) {
        setError('Failed to load face recognition models.');
      }
    };

    loadModels();

    return () => {
      stopVideo();
    };
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        detectFacesLoop();
      })
      .catch(() => {
        setError('Camera access denied or not available.');
      });
  };

  const stopVideo = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    clearInterval(detectionInterval.current);
  };

  const detectFacesLoop = () => {
    detectionInterval.current = setInterval(async () => {
      if (!videoRef.current || recognized) return;

      const detections = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      );

      if (detections.length > 0) {
        setRecognized(true);
        stopVideo();
        onAuthenticated?.();
      }
    }, 1000); // every second
  };

  return (
    <div className={styles.wrapper}>
      <h3>Face Recognition Login</h3>

      {loading ? (
        <p>Loading face models...</p>
      ) : (
        <div className={styles.cameraContainer}>
          <video
            ref={videoRef}
            autoPlay
            muted
            width="320"
            height="240"
            className={styles.video}
          />
        </div>
      )}

      {recognized && <p className={styles.success}>✅ Face recognized!</p>}
      {error && <p className={styles.error}>❌ {error}</p>}
    </div>
  );
};

export default FaceRecognition;

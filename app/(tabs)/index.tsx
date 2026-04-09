import { onValue, push, ref, remove } from 'firebase/database';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../../firebaseConfig';

export default function HomeScreen() {
  const [alerts, setAlerts] = useState([]);
  const alertsRef = ref(db, 'alerts');
  const alertSound = useRef(null);

  // For web, use string path
  useEffect(() => {
    alertSound.current = new Audio('assets/alert.mp3');
  }, []);

  useEffect(() => {
    const unsubscribe = onValue(alertsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const alertsArray = Object.values(data);
        setAlerts(alertsArray);

        if (alertSound.current) {
          alertSound.current.currentTime = 0;
          alertSound.current.play().catch(() => {
            console.log("User interaction required to play sound");
          });
        }
      } else {
        setAlerts([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const sendAlert = (msg) => {
    push(alertsRef, {
      message: msg,
      time: new Date().toLocaleTimeString()
    });
  };

  const resetAlerts = () => {
    remove(alertsRef);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🏥 Hospital Alert System</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.alertButton, { backgroundColor: '#e74c3c' }]} onPress={() => sendAlert('S1 ALERT')}>
          <Text style={styles.buttonText}>S1 ALERT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.alertButton, { backgroundColor: '#f39c12' }]} onPress={() => sendAlert('S2 ALERT')}>
          <Text style={styles.buttonText}>S2 ALERT</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.alertButton, { backgroundColor: '#8e44ad' }]} onPress={() => sendAlert('S3 ALERT')}>
          <Text style={styles.buttonText}>S3 ALERT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.alertButton, { backgroundColor: '#3498db' }]} onPress={() => sendAlert('NURSE CALL')}>
          <Text style={styles.buttonText}>NURSE CALL</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={resetAlerts}>
        <Text style={styles.resetText}>RESET ALL ALERTS</Text>
      </TouchableOpacity>

      <View style={styles.alertList}>
        {alerts.length === 0 && <Text style={styles.noAlerts}>No alerts yet</Text>}
        {alerts.map((alert, index) => (
          <View key={index} style={styles.alertCard}>
            <Text style={styles.alertMessage}>{alert.message}</Text>
            <Text style={styles.alertTime}>{alert.time}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f0f4f7', minHeight: '100%' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#2c3e50', textAlign: 'center' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  alertButton: { flex: 1, paddingVertical: 15, marginHorizontal: 5, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  resetButton: { backgroundColor: '#2c3e50', paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  resetText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  alertList: { marginTop: 10 },
  alertCard: { backgroundColor: '#ffffff', padding: 15, borderRadius: 10, marginBottom: 10, borderLeftWidth: 5, borderLeftColor: '#e74c3c', shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4, elevation: 3 },
  alertMessage: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50' },
  alertTime: { fontSize: 14, color: '#7f8c8d', marginTop: 5 },
  noAlerts: { textAlign: 'center', color: '#7f8c8d', fontSize: 16, marginTop: 20 },
});
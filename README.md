# Event-Driven Synchronization App

A simple full stack application demonstrating **event-driven communication** between a **React + Material UI** frontend and a **Spring Boot** backend.  
Each browser tab maintains its own state and user input is synced with the server which responds with an updated label.

---

## Features

### **Frontend (React + MUI)**
- Live text input sent to the backend  
- Label that updates according to server response  
- **sessionStorage** used to persist state on refresh  
- Automatically generated **unique `tabId` per browser tab**  
- Clean and minimal UI built with Material UI  
- Periodic polling to sync updates from the server  

### **Backend (Spring Boot)**
- Two REST endpoints:
  - `POST /events/text` — receives text from the UI  
  - `GET /events/label` — returns the updated label  
- Appends a random 5-character string to the submitted text  
- Stores labels **per tabId** using a thread-safe `ConcurrentHashMap`  
- Lightweight, event-driven flow without over-engineering  
---

## 📡 Backend Endpoints

### **POST /events/text**  
Sends the text event to the server.

**Request Body**
```json
{
  "tabId": "123-abc",
  "text": "Hello"
}
```
### **GET /events/label?tabId=123-abc** 
**Request Body**
```json
{
  "label": "Hello-9fa12"
}
```
## 📷 Demo UI

(<img width="1360" height="768" alt="Image (3)" src="https://github.com/user-attachments/assets/f51a34c2-e273-43c6-8fe4-976e6bdd554e" />
)

---




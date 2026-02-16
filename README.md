# Web Cache Poisoning 

This project demonstrates a Web Cache Poisoning attack using the X-Forwarded-Host header.  
The system simulates a vulnerable Node.js application behind an Nginx reverse proxy with caching enabled.

## Project Structure

- Origin Server (Node.js) – runs on port 3000  
  Generates a dynamic HTML page based on the Host / X-Forwarded-Host header.

- Malicious Server (Node.js) – runs on port 4000  
  Serves a fake login page to simulate a phishing target.

- Reverse Proxy (Nginx + Docker) – runs on port 8080  
  Forwards requests to the origin server and caches responses.

All components run locally on localhost.

## Requirements

- Node.js installed
- Docker installed
- VS Code (optional, used for development)

## How to Run

### 1) Start the origin server
node server.js

### 2) Start the malicious server
node evil-server.js

### 3) Start the malicious server
- from the proxy-server folder - cd proxy-server
  
- docker build -t cache-proxy .
  
- docker run -p 8080:8080 cache-proxy
  


## Demo Flow

### Step 1 – View the legitimate login page
1. Open the browser and go to:
   http://localhost:8080

2. Click the "Login" button.  
   You will be redirected to the legitimate login page served by the origin server (port 3000).  
   This shows the normal system behavior before the attack.

### Step 2 – Let the cache expire
Wait approximately 2–3 minutes so the cached response expires (based on the configured cache time).

### Step 3 – Perform the poisoning attack
Send a poisoned request using:

curl -H "X-Forwarded-Host: localhost:4000" http://localhost:8080

### Step 4 – View the malicious login page
1. Open the browser and go to:
   http://localhost:8080
   
2. Click the "Login" button.  

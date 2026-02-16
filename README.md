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
from the proxy-server folder- cd proxy-server
docker build -t cache-proxy .
docker run -p 8080:8080 cache-proxy




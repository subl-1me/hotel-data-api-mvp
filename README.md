# Hotel Data API (MVP) – Microservice

## Overview

**Hotel Data API (MVP)** is a lightweight microservice created for **development, testing, and rapid prototyping**.  
It exposes **mock RESTful endpoints** that simulate hotel-related data such as **reservations, guests, rooms, and rates**, enabling teams to build and validate MVPs without depending on real databases or complex hotel management systems.

> ⚠️ **MVP Status**  
> This project uses **mock/test data only** and is **not intended for production environments**.

---

## Purpose

This microservice serves as a **data provider stub** within an MVP architecture.  
It is ideal for:

- Frontend development without backend dependencies
- API contract validation
- Integration testing between microservices
- Proof-of-concept and early-stage product development
- Simulating real hotel data flows during testing

---

## Related Projects

This microservice is part of a larger system and is designed to work in conjunction with:

- **AI Hotel Assistant Tool Client**  
  As a client, serves a voice-speech interface to manage hotel reservations.  
  Repository: https://github.com/subl-1me/AI-hotel-assistant-tool

- **Hotel Data API (MVP)** _(this repository)_  
  Starts a local server to handle speech-recognition & NER Model responses to handle reservations actions/intents.
  Repository: https://github.com/subl-1me/AI-hotel-assistant-model-server

## Features Included (MVP Scope)

### ✅ Ready to Use

- Mock room inventory with basic availability
- Pre-populated test reservations
- Dummy guest profiles
- Sample room rates and pricing structures
- Zero-configuration startup
- RESTful API design
- Health check endpoint for service monitoring

---

## Limitations (MVP Only)

### ❌ Not Included

- Production-grade security (authentication, authorization, roles)
- Persistent database storage
- Complete hotel operational workflows
- Advanced analytics or reporting
- External system integrations (payments, PMS, channel managers)

---

## Quick Start

### 1. Clone Repository & Run

```bash
git clone https://github.com/subl-1me/https://github.com/subl-1me/hotel-data-api-mvp
cd https://github.com/subl-1me/hotel-data-api-mvp

# Install dependencies
npm install

# Run the MVP server
npm run dev

```

### 2. Verify the Service

```bash
    curl http://localhost:5000/api/v1/health
```

## Requeriments

- Node.js – Required to run the microservice
- Python – Used to generate mock/testing data
- Project dependencies listed in package.json

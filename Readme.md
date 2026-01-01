# RabbitMQ
- Install Docker into your system
- Follow the steps to install into the Ubuntu system [YOUTUBE VIDEO](https://www.youtube.com/watch?v=J4dZ2jcpiP0) 

## RabbitMQ Installation using Docker (Default Port: 5672, Port For UI: 15672):
- Run Docker
- Open terminal and run command to install RabbitMQ into the docker:
```
    docker pull rabbitmq:management
```
- Run command to give name the container and run RabbitMQ / RabbitMQ UI on specific port:
```
    docker run -d --name rabbitmq-practice -p 5672:5672 -p 15672:15672 rabbitmq:management
```
- Open [RabbitMQ UI](http://localhost:15672)
- Use Credentails:
``` 
    Username: guest
    Password: guest
``` 

## What is RabbitMQ 🐇?

**RabbitMQ** is an **open-source message broker** that enables different applications or services to communicate with each other using **messages**.

It works on the **producer–consumer** model:

- **Producer** → sends messages
- **RabbitMQ** → stores and routes messages
- **Consumer** → receives and processes messages

RabbitMQ implements the **AMQP (Advanced Message Queuing Protocol)** and is widely used in **microservices, distributed systems, and background job processing.**

## Why do we need to use RabbitMQ?

**RabbitMQ** is used to solve problems that arise in **direct, synchronous communication** between services.

### Key Reasons to Use RabbitMQ:

- **🔹 Asynchronous processing**
Tasks run in the background without blocking the main application.
- **🔹 Loose coupling**
Producer and consumer do not depend on each other directly.
- **🔹 Improved performance**
Heavy tasks (emails, notifications, reports) are offloaded to queues.
- **🔹 Scalability**
Multiple consumers can process messages in parallel.
- **🔹 Reliability**
Messages are not lost even if a consumer fails.

### Example Use Cases:

- Email sending
- Order processing
- Payment handling
- Notifications
- Background jobs

## What problem does RabbitMQ resolve?

RabbitMQ resolves the following **core problems:**

### 🚫 Problem Without RabbitMQ:

- Tight coupling between services
- Slow response times
- Application crashes due to heavy tasks
- Poor scalability

### ✅ Solution With RabbitMQ:

Tasks are queued and processed asynchronously

Services communicate reliably

Failures are handled gracefully

System becomes scalable and fault-tolerant

**📌 In short:**
RabbitMQ resolves **performance bottlenecks, tight coupling, and reliability issues** in distributed systems.

## Types of RabbitMQ Messaging

RabbitMQ supports multiple messaging patterns using **Exchanges.**

### 1️⃣ Direct Exchange

- Messages are routed using an exact routing key
- Used for one-to-one communication

**Use Case:**
Specific task processing (e.g., order.created)

### 2️⃣ Fanout Exchange

- Messages are sent to all bound queues
- Routing key is ignored

**Use Case:**
Broadcasting messages (e.g., notifications, logs)

### 3️⃣ Topic Exchange

- Messages are routed based on pattern matching
- Supports wildcards (*, #)

**Use Case:**
Event-based systems (e.g., order.* , user.#)

### 4️⃣ Headers Exchange

- Routing is based on message headers
- Routing keys are ignored

**Use Case:**
Complex routing rules using metadata
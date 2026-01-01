# RabbitMQ
- Install Docker first into your system

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
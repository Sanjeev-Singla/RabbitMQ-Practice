import amqplib from 'amqplib';

async function produceMessages() {
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const exchangeName = "direct_message";

        const message = {
            to: "abc@gmail.com",
            from: "xyz@gmail.com",
            subject: "Welcome to our service",
            body: "Thank you for signing up for our service. We're glad to have you on board!"
        }

        /**
         * create the exchange, take 3 parameters: exchange name, type of exchange, options
         * durable: false means the exchange will not survive a broker restart
         */
        await channel.assertExchange(exchangeName, 'direct', { durable: false });
        // created a queue named 'email_queue'
        await channel.assertQueue('email_queue', { durable: false });
        // bind the queue to the exchange with the routing key 'direct_email'
        await channel.bindQueue('email_queue', exchangeName, 'direct_email');

        /**
         * publish the message to the exchange with the routing key 'direct_email'
         * Buffer.from is used to convert the message to a buffer, it take string as input.
         * so we deserialize the message object to string using JSON.stringify
         */
        channel.publish(exchangeName, 'direct_email', Buffer.from(JSON.stringify(message)));
        console.log("Message sent to exchange:", message);

    } catch (error) {
        console.error('Error in producer:', error);
    }
}

produceMessages();
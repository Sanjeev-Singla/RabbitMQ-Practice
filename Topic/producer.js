import amqplib from 'amqplib';

async function produceMessage(queue, message) {
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const exchangeName = "topic_message";
        
        /**
         * create the exchange, take 3 parameters: exchange name, type of exchange, options
         * durable: false means the exchange will not survive a broker restart
         */
        await channel.assertExchange(exchangeName, 'topic', { durable: true });

        /**
         * Here we did not create a queue explicitly. 
         * In topic exchange, queues are usually created and bound by consumers.
         * Because the producer only needs to publish messages to the exchange with appropriate routing keys.
         */
        channel.publish(exchangeName, queue, Buffer.from(JSON.stringify(message)));
        console.log("Message sent to exchange:", message);
        
        setTimeout(() => { 
            connection.close();
        }, 500);
    } catch (error) {
        console.error('Error in producer:', error);
    }
}

// Example usage:
produceMessage("order.placed", {orderId: 1234, status: 'placed'});
produceMessage("payment.confirmed", {orderId: 1234, status: 'confirmed'});

import amqplib from 'amqplib';

async function produceMessages(message) {
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const exchangeName = "fanout_message";

        /**
         * create the exchange, take 3 parameters: exchange name, type of exchange, options
         * durable: true means the exchange will survive a broker restart
         */
        await channel.assertExchange(exchangeName, 'fanout', { durable: true });
        
        // Here no queue and no binding is required in producer, because consumer will take care of it

        /**
         * publish the message to the exchange without routing key
         * Buffer.from is used to convert the message to a buffer, it take string as input.
         * so we deserialize the message object to string using JSON.stringify
         * persistent: true means the exchange will survive a broker restart
         */
        channel.publish(exchangeName, '', Buffer.from(JSON.stringify(message)), { persistent: true });
        console.log("Message sent to exchange:", message);

        setTimeout(() => { 
            connection.close();
        }, 500);

    } catch (error) {
        console.error('Error in producer:', error);
    }
}

produceMessages({id: 1, content: "New product is lauched"});
import amqplib from 'amqplib';

async function consumePaymentNotifications() {
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const exchangeName = "topic_message";
        const queueName = "payment_notifications_queue";
        // Listen to all payment related messages, * means after dot next one matching word
        // # means one or more words after ., max value is upto 225
        const routingKey = "payment.*";

        /**
         * Create the exchange, take 3 parameters: exchange name, type of exchange, options
         * durable: true means the exchange will survive a broker restart
         */
        await channel.assertExchange(exchangeName, 'topic', { durable: true });

        /**
         * Create a queue for this consumer
         */
        await channel.assertQueue(queueName, { durable: true });

        /**
         * Bind the queue to the exchange with the specified routing key
         */
        await channel.bindQueue(queueName, exchangeName, routingKey);

        channel.consume(queueName, (msg) => {
            if (msg !== null) {
                const messageContent = JSON.parse(msg.content.toString());
                console.log("Received payment notification:", messageContent);
                channel.ack(msg);
            }
        }, { noAck: false });
    } catch (error) {
        console.error('Error in consumer:', error);
    }
}

consumePaymentNotifications();
import amqplib from 'amqplib';

async function consumeSMSNotification() {
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const exchangeName = "fanout_message";

        /**
         * create the exchange, take 3 parameters: exchange name, type of exchange, options
         * durable: true means the exchange will survive a broker restart
         */
        await channel.assertExchange(exchangeName, 'fanout', { durable: true });
        /**
         * In fanout queue name is ignored, due to it will create temporary queues for each consumer,
         * exclusive: true means the queue will be deleted when the connection that created it closes.
         * q is an object which contains the queue details like queue name
         */
        const q = await channel.assertQueue('', { exclusive: true });
        
        /** 
         * to bind the queue to the exchange, here we use q object to get the queue name, and empty string as routing key
         * q.queue is the randomly / Temporarly generated queue name
        */
        await channel.bindQueue(q.queue, exchangeName, '');

        channel.consume(q.queue, (msg) => {
            if (msg !== null) {
                const messageContent = JSON.parse(msg.content.toString());
                console.log("Received SMS message:", messageContent);
                channel.ack(msg);
            }
        }, { noAck: false });

    } catch (error) {
        console.error('Error in Consumer:', error);
    }
}

consumeSMSNotification();
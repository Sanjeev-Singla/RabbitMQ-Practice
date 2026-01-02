import amqp from 'amqplib';

async function videoNoficationConsumer() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const exchange = 'header_exchange';

        await channel.assertExchange(exchange, 'headers', { durable: true });

        const q = await channel.assertQueue('', { exclusive: true });

        await channel.bindQueue(q.queue, exchange, '', {
            "x-match": "all",
            "notification-type": "new_video",
            "content-type": "video"
        });
        
        console.log(' [*] Waiting for Video notifications. To exit press CTRL+C');
        channel.consume(q.queue, (msg) => {
            if (msg !== null) {
                console.log(" [x] Received Video notification:", msg.content.toString());
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error('Error in Header Video notification consumer:', error);
    }
}

videoNoficationConsumer();
import amqp from 'amqplib';

async function commentLikeNoficationConsumer() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const exchange = 'header_exchange';

        await channel.assertExchange(exchange, 'headers', { durable: true });

        const q = await channel.assertQueue('', { exclusive: true });

        await channel.bindQueue(q.queue, exchange, '', {
            "x-match": "any",
            "notification-type-comment": "comment",
            "notification-type-like": "like",
        });
        
        console.log(' [*] Waiting for Comments/Likes notifications. To exit press CTRL+C');
        channel.consume(q.queue, (msg) => {
            if (msg !== null) {
                console.log(" [x] Received Comments/Likes notification:", msg.content.toString());
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error('Error in Header Comments/Likes notification consumer:', error);
    }
}

commentLikeNoficationConsumer();
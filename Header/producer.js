import amqp from 'amqplib';

async function createProducer(header, message) {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const exchange = 'header_exchange';

        await channel.assertExchange(exchange, 'headers', { durable: true });

        channel.publish(exchange, '', Buffer.from(message), {
            persistent: true,
            headers: header
        });

        console.log('Message sent with header:', header);

        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        onsole.error('Error in Header producer:', error);
    }
}

// all mean add operator, any mean or operator
createProducer({"x-match": "all", "notification-type": "new_video", "content-type": "video"}, "New video uploaded");
createProducer({"x-match": "all", "notification-type": "live_stream", "content-type": "podcast"}, "New video uploaded");
createProducer({"x-match": "any", "notification-type-like": "like", "content-type": "vlog"}, "Someone like your vlog");
createProducer({"x-match": "any", "notification-type-comment": "comment", "content-type": "vlog"}, "New comment added to your vlog");
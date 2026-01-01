import  amqplib from 'amqplib';

async function consumeMessages() {
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const exchangeName = "direct_message";
        
        // made coonection with same created queue
        await channel.assertQueue('email_queue', { durable: false });

        channel.consume('email_queue', (msg) => {
            if (msg !== null) {
                // getting the message content
                const messageContent = msg.content.toString();
                // serialize the message content back to object
                const message = JSON.parse(messageContent);
                console.log("Received message:", message);
                // sending acknowledgment back to the server
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error('Error in Consumer:', error);
    }

}

consumeMessages();
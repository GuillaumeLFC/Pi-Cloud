const Docker = require('dockerode');

export async function waitForMongoDB() {
    try {
        const docker = new Docker({host : 'tcp://localhost', port : 2375});
        const container = docker.getContainer('mongo');
    
        while (true) {
            const { State } = await container.inspect();
            if (State.Health && State.Health.Status === 'healthy') {
            console.log('Mongo pret ! ');
            break;
            }
    
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before checking again
        }
   
    } catch (error) {
        console.error(error);
    };
};

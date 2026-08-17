import { Kafka } from 'gcn-kafka'

const gcnKafka = new Kafka({
  client_id: process.env.GCN_CLIENT_ID as string,
  client_secret: process.env.GCN_CLIENT_SECRET as string,
})

const consumer = gcnKafka.consumer()
await consumer.connect()
try {
  await consumer.subscribe({
    topics: [
        'gcn.notices.icecube.lvk_nu_track_search',
        'gcn.notices.icecube.gold_bronze_track_alerts',
        'gcn.notices.swift.bat.guano',
    ],
  })
} catch (error) {
  if (error instanceof Error && 'type' in error && error.type === 'TOPIC_AUTHORIZATION_FAILED')
  {
    console.warn('Not all subscribed topics are available')
  } else {
    throw error
  }
}

await consumer.run({
  eachMessage: async (payload) => {
    const gcnValue = payload.message.value
    
    switch (payload.topic) {
      case "gcn.notices.icecube.gold_bronze_track_alerts":

        await fetch("/api/IceCube/AllData/POST", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(gcnValue),
        })

        break;

      case "gcn.notices.swift.bat.guano":

        await fetch("/api/GRB/AllData/POST", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(gcnValue),
        })

        break;
    
      default:
        break;
    }
  },
})
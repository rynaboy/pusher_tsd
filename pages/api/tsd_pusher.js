import Pusher from "pusher";
export default async function handler(req, res) {
    if (req.method === "POST") {
        const { app_id, app_key, app_secret, app_cluster, app_chanel, app_eventname, app_message } = req.body;
        const pusher = new Pusher({
            appId: app_id,
            key: app_key,
            secret: app_secret,
            cluster: app_cluster,
            useTLS: true,
        });
        try {
            await pusher.trigger(app_chanel, app_eventname, app_message);
            res.status(200).json({ message: "Event triggered successfully!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error triggering event" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
# Resource tunneling

This process involves detecting the filter on the browser by pinging web app manifest URLs for filter extensions, checking the DNS, port scanning, and more. If this is successful, site resources are proxied with Service Workers (SWs) over a web streaming protocol (WT/WebRTC Data Channel/WS), which are encrypted with a unique XChaCha20 (symmetrical) key for each proxy site link. This is done to prevent extensions from replicating these types of requests or monitoring them.

In the SW handler, the request is deconstructed into a raw HTTP request as a message, sent to the server, and parsed and rerouted to the HTML server handler. When the final response is generated, it is not sent to any server, but instead intercepted and deconstructed back to the SW through a response message. It is then reassembled in the SW.

This sorting process for these requests functions similarly to a load balancer, where incoming requests are distributed to different servers based on the available resources. This ensures that the requests are handled efficiently and securely.

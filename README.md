# urban_farming_backend
Built at a hackathon with a friend. The idea was to help small urban
farmers make better decisions — when to water, what to plant, when
something looks wrong with their crop.

My job was the entire backend. I set up the Node.js + Express server,
designed the MongoDB models, and built the REST API layer that tied
everything together. Two key integrations: a live weather API so the
recommendations were location-aware, and our own trained ML model that
the frontend called to get crop health predictions from images.

My friend handled the model training and the frontend. I made sure the
API was clean enough that they could work independently without waiting
on me. We won 2nd place.

FROM python:3.11-slim

# Install system build tools (required for WebRTC and Python packages)
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the entire monorepo into the container
COPY . .

# Set working directory to the Phase3_Voice subfolder
WORKDIR /app/Phase3_Voice

# Install the correct dependencies for the voice agent
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 7860 to satisfy Hugging Face's container manager
EXPOSE 7860

# Start a simple, lightweight Python HTTP server on port 7860 in the background,
# then run the LiveKit voice agent daemon in the foreground.
CMD ["sh", "-c", "python -m http.server 7860 & python agent/agent.py start"]

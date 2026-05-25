FROM python:3.11-slim

# Install system build tools (required for WebRTC and Python packages)
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the entire monorepo into the container
COPY . .

# Set working directory to the Phase3_Voice subfolder
# This ensures all relative python imports and local file paths resolve perfectly!
WORKDIR /app/Phase3_Voice

# Install the correct dependencies for the voice agent
RUN pip install --no-cache-dir -r requirements.txt

# Start the LiveKit voice agent daemon
CMD ["python", "agent/agent.py", "start"]

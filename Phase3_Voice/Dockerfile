FROM python:3.11-slim

# Install any basic system tools needed for building Python packages
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the voice agent files
COPY . .

# Start the LiveKit voice agent daemon in production worker mode
CMD ["python", "agent/agent.py", "start"]

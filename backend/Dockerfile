# Dockerfile

FROM python:3.11-bullseye


# Avoid prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies
RUN apt-get update -o Acquire::Check-Valid-Until=false && \
    apt-get install -y --no-install-recommends \
        build-essential \
        libpq-dev \
        gcc \
        curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Expose port (for Gunicorn)
EXPOSE 8000

# Default command can also be here, but we use docker-compose to run gunicorn

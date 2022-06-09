docker build -t projects -f Dockerfile.dev .
docker run -p 8080:8080 projects
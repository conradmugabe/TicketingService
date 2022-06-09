docker build -t projects -f Dockerfile.dev .
docker run -p 4000:4000 projects
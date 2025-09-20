docker run -it --rm \
    --network host \
    -v $(pwd):/app \
    -w /app \
    node-docker-app npm run dev

    # node-docker-app sh # npx nodemon --verbose src/index.js

Setup
==========

About
----------



Download
----------

> Host OS
```
#!/bin/bash

git clone https://github.com/iqneet/nodejsSetupForStudyByDocker.git
```


Usage
----------

> Host OS
```
#!/bin/bash

# step.1
cd nodejsSetupForStudyByDocker

# step.2
npm install

# step.3
docker build -t node-docker-app:latest .

# step.4
docker run -it --rm -p 3000 -v $(pwd):/app -w /app node-docker-app npm run dev

# step.5
firefox http://localhost:3000/
```

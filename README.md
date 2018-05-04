# Sweetgrass Buffalo

Below is a description of how to deploy the Sweetgrass project as well as other specifics regarding the project.

## Deploying

The project is deployed using Docker and Dockerhub. Below is a description of how to build the docker image from the Sweetgrass project, process that need to occur inside the docker image, and finally how to build and run the projects docker container.

### Building the Docker Image and deploying it to Docker Hub

```
$ docker build --build-arg TOOL_NODE_FLAGS="--max-old-space-size=2048" -t <name_your_image> .
```

### Docker Command used to run the Container

```
docker run \
  -p 80:3000 \
  -e MONGO_URL="mongodb://Sweetgrass:Frontline@ec2-35-162-176-205.us-west-2.compute.amazonaws.com:27017/sweetgrass" \
  -e REACTION_USER="admin@localhost" \
  -e REACTION_AUTH="frontline3701F!" \
  beartuskf/mycustom
```

### Processes to implement inside the Docker Container

#### Install PHP inside the container.

* Find the container you just created and copy its container_id
```
$ docker ps
```

* This command will give you bash shell to work within the containers
```
$ docker exec -it <container_id> /bin/bash
```

* These commands will install PHP5 in the containers
```
        1. $ apt-get update
        2. $ apt-get install php5.0
```
* Exit out of the shell

#### Insert the  PHP hex-key file into the containers

* To do this you will need to place hmacmd5_inc.php into “/opt/reaction/dist/bundle/programs/server/” directory inside the running container. Remember the container has an entirely different path structure than what ReactionSWG does in development.

* hmacmd5_inc.php should be in the HomePage respository on github under the Sweetgrass organization.

* navigate to the directory containing  hmacmd5_inc.php and run the following command
```
$ docker cp hmacmd5_inc.php <container_id>:/hmacmd5_inc.php
```

* Once again, run the command to access the shell for the container. We did this a few steps ago. And then execute this command from the directory inside the container that contains the file  hmacmd5_inc.php
```
$ docker mv hmacmd5_inc.php /opt/reaction/dist/bundle/programs/server/
```

* Now, just make sure the application is running as desired.

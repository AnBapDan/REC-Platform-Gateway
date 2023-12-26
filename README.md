<a name="readme-top"></a>

[![LinkedIn][linkedin-shield]][linkedin-url]

### REC Platform - Gateway API

The Renewable Energy Community Platform consists in a microservices API to enable and enhance Peer-to-Peer energy Transactions between Prosumers and consumers of a community.
This Repo contains the entrance point of all the API requests.

Why building a REC Platform using microservices:
* The project was developed together with other devs
* Changes in one particular module forced to shutdown/reboot the whole API.
* This is part of a research program, therefore multiple experimental ideas, frameworks, and scripts were used. 


<p align="right">(<a href="#readme-top">Back to Top</a>)</p>



### Built With

To make the API work, these are the core features of the Gateway:

* [NestJS](https://nestjs.com/)
* [Docker Container](https://www.docker.com/)
* [gRPC](https://grpc.io/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Getting Started

The Gateway does not work by itself, it needs the other microservices to work.

*Note: The gRPC protos import is missing, therefore it will not work!*

### Prerequisites

To get it started:

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/AnBapDan/REC-Platform-Gateway.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter the Profobuf repo in `package.json` on the dependencies tab
   ```js
       "grpc-protos": "git+REPOSITORY",
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Deployment
The all microservices structure is supposed to be deployed using Docker Swarm. Below are the steps to achieve it correctly.

1. Create a network that hosts all the stack
    ```sh
    docker network create --driver=overlay --attachable RECNetwork
    ```


2. Run every Dockerfile to create its image
    ```sh
    docker build -t <img_name>:<version>
    ```

3. Deploy the whole Docker stack
    ```sh
    docker stack deploy -c docker-compose.yml RECNetwork
    ```

#### The commands below are auxiliary if you need to debug some microservice:
    docker ps -f "label=com.docker.swarm.service.name=RECNetwork_gateway" --format "{{.ID}}"
    docker stack services RECNetwork
    docker service logs <service_name>
    docker exec -it <HASH_name> command

## Contact

Daniel Andrade - dani.andrade@ua.pt

Project Link: [https://github.com/AnBapDan/REC-Platform-Gateway.git](https://github.com/AnBapDan/REC-Platform-Gateway.git)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Acknowledgments

Below are the other devs that helped during the development of the RECPlatform :smile:

* [Eduardo Almeida](https://github.com/eapsa)
* [Francisco Monteiro](https://github.com/franciscomonteiro85)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/anbapdan/

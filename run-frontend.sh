#! /bin/bash
docker rm onquadro-frontend
docker run -p 8080:80 --name onquadro-frontend onquadro-frontend

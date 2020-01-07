## Docker Swarm

1. docker-compose up -d

2. docker container ls

3. docker container exec -it manager docker swarm init

4. docker container exec -t work01 docker swarm join --token SWMTKN-1-1x6zizeld5r4awyqel5domj24prfobw4xhg
   9jq4bvz3nztkc4e-03i2y8u96oitmpody90szoh2q 172.26.0.3:2377

5. work 숫자만 바꿔가며 1,2,3 전부 조인

6. docker container exec -it manager docker node ls

7. `>`  docker exec -it work02 sh

   `>`  docker pull registry:5000/example/echo:latest

   

   `>`  docker exec -it work03 docker pull registry:5000/example/echo:latest

8. $ docker exec -it manager sh

   1. #hostname
   2. #docker swarm init
   3. #docker node ls
   4. #docker service create --replicas 1 --publish 8000:8080 --name echo registry:5000/example/echo:latest
   5. #docker service ls
   6. #docker service scale echo=6
   7. #docker service ps echo | grep Running
   8. #docker service rm echo
   9. #docker service ls

## Docker stack

1. #docker network create --driver=overlay --attachable ch03
2. #docker network ls
3. #ls -al /stack
4. #docker stack deploy -c /stack/ch03-webapi.yml echo
5. #docker stack ls
6. #docker stack services echo
7. #docker stack ps echo
   1. echo_nginx.1      c6124b2cd262          work03			 |
   2. echo_api.2           c6124b2cd262                                   |
   3. echo_nginx.2       a5228f4e26d6         work01             |                  manager
   4. echo_api.3           a5228f4e26d6                                    |
   5. echo_nginx.3       521b7c109455        work02              |
   6. echo_api.1           521b7c109455                                    |
8. #docker stack deploy -c /stack/visualizer.yml visualizer
9. 웹에서 http://localhost:9000/ 접속
10. #docker service logs visualizer_app 설치확인





## Docker HAProxy

- Visualizer는 외부 호스테에서 접속 가능
  - Host -> Manager 사이에는 port forwarding 설정



- HAProxy
  - 외부 호스트에서 요청되는 트래픽을 목적 서비스로 보내주는 프록시 서버 설정
  - dockercloud/haproxy 이미지 배포
    - 컨테이너 외부에서 서지스에 접근할 수 있도록 해 주는 다리 역할 (***ingress***)
    - 서비스가 배치된 노드에 로드 밸런싱 기능 제공




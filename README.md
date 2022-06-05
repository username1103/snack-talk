# toy-nestjs

nestjs를 채팅 토이 프로젝트 입니다.


## 프로젝트 목표

1. nest를 활용한 다양한 경험
2. 소켓을 통한 채팅서버(우선은 1개의 서버라고 가정)
3. Redis 또는 메시지큐를 사용한 메시지 Pub/Sub
4. TDD

추가사항

1. 사용자 접속 여부
2. 성능 테스트
3. 테스트 커버리지 향상

## Application

### api

Rest API 서버

### chat

Socket Chat 서버


## Library

### entity

도메인 엔티티 모델 정의 및 설정

- 필요한 경우에만 연관관계를 설정하는것이 목표

### common-config

공통적으로 필요한 부분들

- Resposne Entity
- ExceptionFilter
- Logger


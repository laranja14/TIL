<<<<<<< HEAD
# OpenStack

- 오픈스택 소개

  - 오픈스택 개요
  - 오픈스택 역사
  
  - 오픈스택 구조
  
- 오픈스택 구성

  - 오픈스택 설치 방법
  - 오픈스택 Architecture
- 컨트롤러 준비작업
  
- 오픈스택 설치

- 오픈스택 서비스 사용하기
  - Horizon 접속
  - Horizon 메뉴
  - Openstack용어정의
  - 프로젝트/사용자/Flavor 생성
  - 네트워크/라우터/보안그룹/Floating IP 생성
  - Keypair생성
  - 이미지
  - 인스턴스시작
  - 볼륨/snapshot생성
  - Swift 사용하기













## 오픈스택 소개

- ##### 오픈스택 개요

  - 2010년 NASA와 Rackspace가 하던 프로젝트를 오픈소스화 했다.
  - 오픈소스를 기반으로 클라우드를 구축하고 운영하고자 하는 오픈소스 개발자, 회사, 이용자들로 이루어진 커뮤니티이다.
  - 컴퓨터 하드웨어 위에 인프라를 서비스로 제공하게 해주는 IaaS를 구축하게 해주는 오픈소스 플랫폼이다.
  - Public과 Private 클라우드를 구축하기 위한 소스이다.
  - 컴퓨팅, 스토리지, 네트워크와 같은 자원을 모으고 이들을 제어하고 운영하는 클라우드 운영체제

- ##### 오픈스택 역사

![image-20200107113835141](../../TIL/OpenStack/images/image-20200107113835141.png)

- ##### 오픈스택 구조

  - 클라우드 운영체제의 주요 기능이 독립된 프로젝트로 나뉘어 개발 됨.
  - Compute, Storage, Image manager가 핵심 플랫폼
  - 초기엔 컴퓨팅 서비스인 Nova, 저장장치 서비스인 Swift, 이미지 관리 서비스인 Glance라는 하부 프로젝트 시작
  - 버전이 업데이트 되면서 Keystone, Quantum, Cinder, Horizon 등의 부가 서비스 프로젝트가 시작 됨

- ##### 오픈스택 구성

  참고:https://wiki.openstack.org/wiki/ReleaseNotes/Liberty/ko
  출처: https://www.mirantis.com/blog/53-things-new-openstack-liberty

  

#### Core Service 이해

- **nova**
  nova는 Openstack의 기본 **컴퓨팅 엔진**입니다. nova는 다양한 가상 머신과 인스턴스를 구축하고 관리하는 역할을 합니다.
- **glance**
  glance는 Opnstack에 **이미지**(iso같은 os 설치용 파일)를 제공합니다. glance에 있는 이미지를 이용하여 사용자들은 OS를 설치할 수가 있습니다.
- **swift**
  swift는 간단하게 말하면 파일 **저장 시스템**입니다. 디스크 드라이브의 위치로 파일을 참조한다는 기존의 생각과는 달리 개발자는 파일을 참조하는 고유 식별자를 이용하여 정보 저장 위치를 Openstack이 결정하도록 할 수 있습니다. 개발자는 소프트웨어 뒤에 단일 시스템에서 용량에 대한 걱정을 하지 않아도 되며 확장에 용이하다는 장점이 있습니다. 또한 데이터가 서버나 네트워크의 장애시에도 자동으로 백업이 되는 장점이 있습니다.
- **cinder**
  cinder는 블록 스토리지 요소입니다. swift 보다 좀 더 **전통적인 저장 방식**과 유사합니다. 
- **neutron**
  neutron은 Openstack용 **네트워크 제어 장치**입니다. neutron은 신속하고 효율적인 통신을 가능하게 합니다.
- **horizen**
  horizen은 **대시보드 구성 요소**입니다. 대시보드를 통해서 가상 머신들을 설치 및 관리가 가능하고 모니터링을 할 수 있습니다.
- **keystone**
  keystone은 **인증 서비스를 제공**합니다. keystone에 등록된 사용자들만 openstack을 사용할 수 있습니다. 쉽게 말하면 집 마다 하나씩은 있는 자물쇠라고 생각하면 됩니다.
- **ceilometer**
  ceilometer는 **과금 서비스를 제공**하는 구성 요소입니다. ceilometer를 통해 openstack을 이용하는 사용자에게 실시간으로 개개인에 알맞은 과금량을 보여줍니다.
- **heat**
  heat는 미리 만들어 놓은 스크립트와 템플릿을 이용하여 다음 인스턴스 생성 때 자동으로 **개발 인프라를 구축**할 수 있는 기능을 제공하는 요소입니다.

#### storage 유형

block 기반 storage - ex) cinder,EBS, iscsi, SAN

object 기반 storage - ex) swift, S3

file 기반 storage - ex) Manila, EFS

Database 기반 storage - ex) Trove, Dynamodb



Cloud Computing 이해 On-premise vs. Cloud

- 사용자 요청에 따라 공윧된 자원이나 데이타를 인터넷 기반으로 제공하는 기술로  여러 유형의 서비스를 사용한 만큼 지불하는 종량과금제로 제공되는 computing



클라우드 서비스 유형 

IaaS / PaaS / SaaS

클라우드 배치 유형 

Public/Private/hybrid/community Cloud



오픈스택이란?

- 클라우드 운영체제
=======
# OpenStack

- 오픈스택 소개

  - 오픈스택 개요
  - 오픈스택 역사
  
  - 오픈스택 구조
  
- 오픈스택 구성

  - 오픈스택 설치 방법
  - 오픈스택 Architecture
- 컨트롤러 준비작업
  
- 오픈스택 설치

- 오픈스택 서비스 사용하기
  - Horizon 접속
  - Horizon 메뉴
  - Openstack용어정의
  - 프로젝트/사용자/Flavor 생성
  - 네트워크/라우터/보안그룹/Floating IP 생성
  - Keypair생성
  - 이미지
  - 인스턴스시작
  - 볼륨/snapshot생성
  - Swift 사용하기













## 오픈스택 소개

- ##### 오픈스택 개요

  - 2010년 NASA와 Rackspace가 하던 프로젝트를 오픈소스화 했다.
  - 오픈소스를 기반으로 클라우드를 구축하고 운영하고자 하는 오픈소스 개발자, 회사, 이용자들로 이루어진 커뮤니티이다.
  - 컴퓨터 하드웨어 위에 인프라를 서비스로 제공하게 해주는 IaaS를 구축하게 해주는 오픈소스 플랫폼이다.
  - Public과 Private 클라우드를 구축하기 위한 소스이다.
  - 컴퓨팅, 스토리지, 네트워크와 같은 자원을 모으고 이들을 제어하고 운영하는 클라우드 운영체제

- ##### 오픈스택 역사

![image-20200107113835141](../../TIL/OpenStack/images/image-20200107113835141.png)

- ##### 오픈스택 구조

  - 클라우드 운영체제의 주요 기능이 독립된 프로젝트로 나뉘어 개발 됨.
  - Compute, Storage, Image manager가 핵심 플랫폼
  - 초기엔 컴퓨팅 서비스인 Nova, 저장장치 서비스인 Swift, 이미지 관리 서비스인 Glance라는 하부 프로젝트 시작
  - 버전이 업데이트 되면서 Keystone, Quantum, Cinder, Horizon 등의 부가 서비스 프로젝트가 시작 됨

- ##### 오픈스택 구성

  참고:https://wiki.openstack.org/wiki/ReleaseNotes/Liberty/ko
  출처: https://www.mirantis.com/blog/53-things-new-openstack-liberty

  

#### Core Service 이해

- **nova**
  nova는 Openstack의 기본 **컴퓨팅 엔진**입니다. nova는 다양한 가상 머신과 인스턴스를 구축하고 관리하는 역할을 합니다.
- **glance**
  glance는 Opnstack에 **이미지**(iso같은 os 설치용 파일)를 제공합니다. glance에 있는 이미지를 이용하여 사용자들은 OS를 설치할 수가 있습니다.
- **swift**
  swift는 간단하게 말하면 파일 **저장 시스템**입니다. 디스크 드라이브의 위치로 파일을 참조한다는 기존의 생각과는 달리 개발자는 파일을 참조하는 고유 식별자를 이용하여 정보 저장 위치를 Openstack이 결정하도록 할 수 있습니다. 개발자는 소프트웨어 뒤에 단일 시스템에서 용량에 대한 걱정을 하지 않아도 되며 확장에 용이하다는 장점이 있습니다. 또한 데이터가 서버나 네트워크의 장애시에도 자동으로 백업이 되는 장점이 있습니다.
- **cinder**
  cinder는 블록 스토리지 요소입니다. swift 보다 좀 더 **전통적인 저장 방식**과 유사합니다. 
- **neutron**
  neutron은 Openstack용 **네트워크 제어 장치**입니다. neutron은 신속하고 효율적인 통신을 가능하게 합니다.
- **horizen**
  horizen은 **대시보드 구성 요소**입니다. 대시보드를 통해서 가상 머신들을 설치 및 관리가 가능하고 모니터링을 할 수 있습니다.
- **keystone**
  keystone은 **인증 서비스를 제공**합니다. keystone에 등록된 사용자들만 openstack을 사용할 수 있습니다. 쉽게 말하면 집 마다 하나씩은 있는 자물쇠라고 생각하면 됩니다.
- **ceilometer**
  ceilometer는 **과금 서비스를 제공**하는 구성 요소입니다. ceilometer를 통해 openstack을 이용하는 사용자에게 실시간으로 개개인에 알맞은 과금량을 보여줍니다.
- **heat**
  heat는 미리 만들어 놓은 스크립트와 템플릿을 이용하여 다음 인스턴스 생성 때 자동으로 **개발 인프라를 구축**할 수 있는 기능을 제공하는 요소입니다.

#### storage 유형

block 기반 storage - ex) cinder,EBS, iscsi, SAN

object 기반 storage - ex) swift, S3

file 기반 storage - ex) Manila, EFS

Database 기반 storage - ex) Trove, Dynamodb



Cloud Computing 이해 On-premise vs. Cloud

- 사용자 요청에 따라 공윧된 자원이나 데이타를 인터넷 기반으로 제공하는 기술로  여러 유형의 서비스를 사용한 만큼 지불하는 종량과금제로 제공되는 computing



클라우드 서비스 유형 

IaaS / PaaS / SaaS

클라우드 배치 유형 

Public/Private/hybrid/community Cloud



오픈스택이란?

- 클라우드 운영체제
>>>>>>> b8af5f293951b11f99ca9ec5d5454f3560540455
- 퍼블릭 클라우드를 제공하는 IaaS 오픈소스 솔루션
Time server

- ntp
- chrony

보안

- 방화벽
- SELinux



getenforce - SELinux 사용중인지 확인하는 명령







[root@controller ~]# packstack --gen-answer-file /root/openstack.txt
Packstack changed given value  to required value /root/.ssh/id_rsa.pub
[root@controller ~]# cp /root/opestack.txt /root/openstack.old
cp: cannot stat `/root/opestack.txt': 그런 파일이나 디렉터리가 없습니다
[root@controller ~]# cp /root/openstack.txt /root/openstack.old
[root@controller ~]# vi /root/openstack.txt
[root@controller ~]# time packstack --answer-file /root/openstack.txt
Welcome to the Packstack setup utility

The installation log file is available at: /var/tmp/packstack/20200108-141029-ueiYp8/openstack-setup.log

Installing:
Clean Up                                             [ DONE ]
Discovering ip protocol version                      [ DONE ]
Setting up ssh keys                                  [ DONE ]
Preparing servers                                    [ DONE ]
Pre installing Puppet and discovering hosts' details [ DONE ]
Preparing pre-install entries                        [ DONE ]
Setting up CACERT                                    [ DONE ]
Preparing AMQP entries                               [ DONE ]
Preparing MariaDB entries                            [ DONE ]
Fixing Keystone LDAP config parameters to be undef if empty[ DONE ]
Preparing Keystone entries                           [ DONE ]
Preparing Glance entries                             [ DONE ]
Checking if the Cinder server has a cinder-volumes vg[ DONE ]
Preparing Cinder entries                             [ DONE ]
Preparing Nova API entries                           [ DONE ]
Creating ssh keys for Nova migration                 [ DONE ]
Gathering ssh host keys for Nova migration           [ DONE ]
Preparing Nova Compute entries                       [ DONE ]
Preparing Nova Scheduler entries                     [ DONE ]
Preparing Nova VNC Proxy entries                     [ DONE ]
Preparing OpenStack Network-related Nova entries     [ DONE ]
Preparing Nova Common entries                        [ DONE ]
Preparing Neutron LBaaS Agent entries                [ DONE ]
Preparing Neutron API entries                        [ DONE ]
Preparing Neutron L3 entries                         [ DONE ]
Preparing Neutron L2 Agent entries                   [ DONE ]
Preparing Neutron DHCP Agent entries                 [ DONE ]
Preparing Neutron Metering Agent entries             [ DONE ]
Checking if NetworkManager is enabled and running    [ DONE ]
Preparing OpenStack Client entries                   [ DONE ]
Preparing Horizon entries                            [ DONE ]
Preparing Swift builder entries                      [ DONE ]
Preparing Swift proxy entries                        [ DONE ]
Preparing Swift storage entries                      [ DONE ]
Preparing Gnocchi entries                            [ DONE ]
Preparing Redis entries                              [ DONE ]
Preparing Ceilometer entries                         [ DONE ]
Preparing Puppet manifests                           [ DONE ]
Copying Puppet modules and manifests                 [ DONE ]
Applying 10.0.0.100_controller.pp
10.0.0.100_controller.pp:                            [ DONE ]       
Applying 10.0.0.100_network.pp
10.0.0.100_network.pp:                               [ DONE ]    
Applying 10.0.0.100_compute.pp
10.0.0.100_compute.pp:                               [ DONE ]    
Applying Puppet manifests                            [ DONE ]
Finalizing                                           [ DONE ]

 **** Installation completed successfully ******

Additional information:
 * Time synchronization installation was skipped. Please note that unsynchronized time on server instances might be problem for some O
 * File /root/keystonerc_admin has been created on OpenStack client host 10.0.0.100. To use the command line tools you need to source 
 * To access the OpenStack Dashboard browse to http://10.0.0.100/dashboard .
Please, find your login credentials stored in the keystonerc_admin in your home directory.
 * The installation log file is available at: /var/tmp/packstack/20200108-141029-ueiYp8/openstack-setup.log
 * The generated manifests are available at: /var/tmp/packstack/20200108-141029-ueiYp8/manifests

real	44m52.469s
user	0m9.580s
sys	0m18.911s
[root@controller ~]# cd /etc/sysconfig/network-scripts/
[root@controller network-scripts]# ls
ifcfg-br-ex  ifdown           ifdown-bnep  ifdown-ippp  ifdown-ovs   ifdown-routes  ifup           ifup-aliases  ifup-ib    ifup-isdn 
ifcfg-ens33  ifdown-Team      ifdown-eth   ifdown-ipv6  ifdown-post  ifdown-sit     ifup-Team      ifup-bnep     ifup-ippp  ifup-ovs  
ifcfg-lo     ifdown-TeamPort  ifdown-ib    ifdown-isdn  ifdown-ppp   ifdown-tunnel  ifup-TeamPort  ifup-eth      ifup-ipv6  ifup-plip 
[root@controller network-scripts]# cat ifcfg-ens33
DEVICE=ens33
NAME=ens33
DEVICETYPE=ovs
TYPE=OVSPort
OVS_BRIDGE=br-ex
ONBOOT=yes
BOOTPROTO=none
[root@controller network-scripts]# ip addr show br-ex
6: br-ex: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UNKNOWN group default qlen 1000
    link/ether 00:0c:29:a1:76:3e brd ff:ff:ff:ff:ff:ff
    inet 10.0.0.100/24 brd 10.0.0.255 scope global br-ex
       valid_lft forever preferred_lft forever
    inet6 fe80::a4f8:74ff:fe2b:c04b/64 scope link 
       valid_lft forever preferred_lft forever
[root@controller network-scripts]# ip addr show ens33
2: ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast master ovs-system state UP group default qlen 1000
    link/ether 00:0c:29:a1:76:3e brd ff:ff:ff:ff:ff:ff
    inet6 fe80::20c:29ff:fea1:763e/64 scope link 
       valid_lft forever preferred_lft forever
[root@controller network-scripts]# ovs-vsctl show
15a27259-fd41-48da-ae9d-41a7e51d56ac
    Manager "ptcp:6640:127.0.0.1"
        is_connected: true
    Bridge br-ex
        Controller "tcp:127.0.0.1:6633"
            is_connected: true
        fail_mode: secure
        Port br-ex
            Interface br-ex
                type: internal
        Port phy-br-ex
            Interface phy-br-ex
                type: patch
                options: {peer=int-br-ex}
        Port "ens33"
            Interface "ens33"
    Bridge br-int
        Controller "tcp:127.0.0.1:6633"
            is_connected: true
        fail_mode: secure
        Port int-br-ex
            Interface int-br-ex
                type: patch
                options: {peer=phy-br-ex}
        Port br-int
            Interface br-int
                type: internal
        Port patch-tun
            Interface patch-tun
                type: patch
                options: {peer=patch-int}
    Bridge br-tun
        Controller "tcp:127.0.0.1:6633"
            is_connected: true
        fail_mode: secure
        Port br-tun
            Interface br-tun
                type: internal
        Port patch-int
            Interface patch-int
                type: patch
                options: {peer=patch-tun}
    ovs_version: "2.11.0"
[root@controller network-scripts]# cat keystonerc_admin
cat: keystonerc_admin: 그런 파일이나 디렉터리가 없습니다
[root@controller network-scripts]# 







```
1Day

Cloud Computing 이해(On-premise vs. Cloud)
-사용자 요청에 따라 공유된 자원이나 데이타를 인터넷 기반으로 제공하는 기술로
여러 유형의 서비스를 사용한 만큼 지불하는 종량과금제로 제공되는 computing

클라우드 서비스 유형
-IaaS/PaaS/SaaS

클라우드 배치 유형
-Public/Private/hybrid/community Cloud

오픈스택이란?

https://wiki.openstack.org/wiki/ReleaseNotes/Juno/ko
Core Service 이해
-compute
-image
-object storage
-block storage
-network
-dashboard
-Identity
-orchestration

Day2 (13:00~ )
----------------------------------------------------------
1.컨트롤러 준비작업
   os update,/etc/hosts,ntp server 구축,centos 최적화(filrewalld/NetworkManager/SELinux),repository 추가

2.오픈스택 설치(packstack on centos)
vi /etc/chrony.conf
----------------------------------------------------
server 0.centos.pool.ntp.org iburst
server 1.centos.pool.ntp.org iburst
#server 2.centos.pool.ntp.org iburst
#server 3.centos.pool.ntp.org iburst
server 2.kr.pool.ntp.org iburst
server 127.127.1.0 

allow 10.0.0.0/24
-----------------------------------------------------
vi openstack.txt
-----------------------------------------------------
326 CONFIG_KEYSTONE_ADMIN_PW=abc123
1185 CONFIG_PROVISION_DEMO=n
11 CONFIG_DEFAULT_PASSWORD=abc123
46 CONFIG_CEILOMETER_INSTALL=n
 50 CONFIG_AODH_INSTALL=n
873 CONFIG_NEUTRON_OVS_BRIDGE_IFACES=br-ex:ens33
----------------------------------------------------------------------------

3.packstack을 이용한 all-in-one 구성

4.오픈스택 서비스 사용하기

Horizon 접속
Horizon 메뉴
Openstack 용어 정의
프로젝트/사용자 /Flavor 생성 

--------------------------------------------------------------------------
네트워크/라우터
Floating IP용: ext1->subext1->10.0.0.0/24,gw: 10.0.0.2, dns:10.0.0.2,dhcp X, 사용 IP pool(10.0.0.210,10.0.0.220),외부네트워크
Fixed IP 용: int1->subint1->192.168.0.0/24,gw:192.168.0.254,dns:10.0.0.2,dhcp 활성화)
router1 생성
외부 네트워크과 router간 연결: 게이트웨이 설정
내부 네트워크와 router간 연결: 인터페이스 추가
--------------------------------------------------------------------------
```
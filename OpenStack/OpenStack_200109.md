<<<<<<< HEAD
## 보안그룹

#### Console

- novncprotocol : web 기반 console 접근
- CLI



#### Remote 접속

- SSH
- telnet
- rlogin



#### 인증 방식

- password 기반 인증
- key 기반 인증 (비대칭키)
  - public key (공개키)
  - primary key (개인키)



##### [root@controller ~]# ip netns exec qrouter-a48f3a24-f42a-46fd-8fd0-465b10705fb2 ssh cirros@10.0.0.212

The authenticity of host '10.0.0.212 (10.0.0.212)' can't be established.
RSA key fingerprint is SHA256:yEf+D+FbU59AiVz6Ap5g3x7Sw7yGWEe59e0yNTs+XfA.
RSA key fingerprint is MD5:f5:ce:69:22:9a:a6:5d:65:03:4f:dc:52:b5:a8:8f:71.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '10.0.0.212' (RSA) to the list of known hosts.
cirros@10.0.0.212's password: 

##### $ lsblk

NAME   MAJ:MIN RM    SIZE RO TYPE MOUNTPOINT
vda    253:0    0      1G  0 disk 
`-vda1 253:1    0 1011.9M  0 part /
vdb    253:16   0      1G  0 disk 
`-vdb1 253:17   0   1023M  0 part 
vdc    253:32   0      1G  0 disk 
`-vdc1 253:33   0   1023M  0 part 

##### $ sudo sh

##### $ df -h

Filesystem                Size      Used Available Use% Mounted on
/dev                     21.3M         0     21.3M   0% /dev
/dev/vda1                23.2M     18.1M      3.9M  82% /
tmpfs                    24.8M         0     24.8M   0% /dev/shm
tmpfs                   200.0K     72.0K    128.0K  36% /run

##### $ fdisk /dev/vdb

Command (m for help): n
Partition type:
   p   primary (1 primary, 0 extended, 3 free)
   e   extended
Select (default p): p
Partition number (1-4, default 2): 1
Partition 1 is already defined.  Delete it before re-adding it.

Command (m for help): m
Command action
   a   toggle a bootable flag
   b   edit bsd disklabel
   c   toggle the dos compatibility flag
   d   delete a partition
   l   list known partition types
   m   print this menu
   n   add a new partition
   o   create a new empty DOS partition table
   p   print the partition table
   q   quit without saving changes
   s   create a new empty Sun disklabel
   t   change a partition's system id
   u   change display/entry units
   v   verify the partition table
   w   write table to disk and exit
   x   extra functionality (experts only)

##### Command (m for help): d

Selected partition 1

##### Command (m for help): n

Partition type:
   p   primary (0 primary, 0 extended, 4 free)
   e   extended

##### Select (default p): p

##### Partition number (1-4, default 1): 1

First sector (2048-2097151, default 2048): 
Using default value 2048
Last sector, +sectors or +size{K,M,G} (2048-2097151, default 2097151): 
Using default value 2097151

##### Command (m for help): w

The partition table has been altered!

Calling ioctl() to re-read partition table.
Syncing disks.

##### $ mkfs -t ext4 /dev/vdb1

mke2fs 1.42.2 (27-Mar-2012)
Filesystem label=
OS type: Linux
Block size=4096 (log=2)
Fragment size=4096 (log=2)
Stride=0 blocks, Stripe width=0 blocks
65536 inodes, 261888 blocks
13094 blocks (5.00%) reserved for the super user
First data block=0
Maximum filesystem blocks=268435456
8 block groups
32768 blocks per group, 32768 fragments per group
8192 inodes per group
Superblock backups stored on blocks: 
	32768, 98304, 163840, 229376

Allocating group tables: done                            
Writing inode tables: done                            
Creating journal (4096 blocks): done
Writing superblocks and filesystem accounting information: done

##### $ ls

##### $ ls /

app         dev         init        linuxrc     mnt         proc        sbin        usr
bin         etc         initrd.img  lost+found  old-root    root        sys         var
boot        home        lib         media       opt         run         tmp         vmlinuz

##### $ mount /dev/vdb1 /app

##### $ df -h

Filesystem                Size      Used Available Use% Mounted on
/dev                     21.3M         0     21.3M   0% /dev
/dev/vda1                23.2M     18.1M      3.9M  82% /
tmpfs                    24.8M         0     24.8M   0% /dev/shm
tmpfs                   200.0K     72.0K    128.0K  36% /run
/dev/vdb1              1006.9M     17.3M    938.5M   2% /app

##### $ cp /etc/p* /app

##### $ ls /app/

lost+found  passwd      profile     protocols



```
Day3
--------------------------------------------------------------------------
보안그룹/Floating IP 생성
Keypair 생성
이미지

http://download.cirros-cloud.net/
인스턴스 시작

yum install -y openstack-utils

인스턴스 오류시
#openstack-status

neutron-openvswitch-agent  inactive  ---> systemctl start neutron-openvswitch-agent
 

볼륨 생성 후 연결하여 사용
-----------------------------------
lsblk
sudo sh
fdisk /dev/vdb  (partition 생성)
n->기본으로
lsblk
mkfs -t ext4 /dev/vdb1
mkdir /app
mount /dev/vdb1 /app
df -h
cp /etc/p* /app
ls /app
-----------------------------------
 
[root@controller ~]# ip netns
qrouter-8caebfa9-19f5-441c-83c2-19e342ec7978 (id: 1)
qdhcp-597b7e6c-866c-4a67-b485-e714fd1d050b (id: 0)
[root@controller ~]# ip netns exec qrouter-8caebfa9-19f5-441c-83c2-19e342ec7978 /bin/sh
sh-4.2# 
sh-4.2# ip a
sh-4.2# ssh cirros@10.0.0.212
The authenticity of host '10.0.0.212 (10.0.0.212)' can't be established.
RSA key fingerprint is SHA256:TfJccBH9eBIv0GnCcvxVrulw8cpTl+a3zUAyHrheHUc.
RSA key fingerprint is MD5:90:af:dd:93:fe:bb:e6:fe:5a:c4:0e:da:d5:63:9a:d6.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '10.0.0.212' (RSA) to the list of known hosts.
cirros@10.0.0.212's password:  cubswin:)
$ 
$ lsblk
NAME   MAJ:MIN RM    SIZE RO TYPE MOUNTPOINT
vda    253:0    0      1G  0 disk 
`-vda1 253:1    0 1011.9M  0 part /
vdb    253:16   0      1G  0 disk 
`-vdb1 253:17   0   1023M  0 part /app
$

/vm snapshot 생성
Swift 사용하기

5.OpenStack CLI로 관리하기 
Identity 서비스 (Keystone)
                 -서비스 특징 
                 -서비스 구조
                 -CLI로 관리
#cp keystonerc_admin keystonerc_stack1
# vi keystonerc_stack1 
unset OS_SERVICE_TOKEN
    export OS_USERNAME=stack1
    export OS_PASSWORD='abc123'
    export OS_REGION_NAME=RegionOne
    export OS_AUTH_URL=http://10.0.0.100:5000/v3
    export PS1='[\u@\h \W(keystone_stack1)]\$ '
    
export OS_PROJECT_NAME=pro1
export OS_USER_DOMAIN_NAME=Default
export OS_PROJECT_DOMAIN_NAME=Default
export OS_IDENTITY_API_VERSION=3

#source keystonerc_stack1
[root@controller ~(keystone_stack1)]#openstack token issue

-----------------------------------------------------------


Day4
manual 설치(https://docs.openstack.org/install-guide/)
------------------------------------------------------
Overview
Example architecture
Networking
Environment
  Security
  Host networking
  Network Time Protocol (NTP)
  OpenStack packages
  SQL database
  Message queue
  Memcached

5.OpenStack CLI로 관리하기 
Identity 서비스 (Keystone)
                 -서비스 특징 
                 -서비스 구조
                 -CLI로 관리

https://docs.openstack.org/keystone/rocky/install/index-rdo.html
```



~~~ 


   44  . keystonerc_admin 
   45  openstack project create --description "Demo Project" demo
   56  openstack user create --password abc123 --project demo demo
   57  openstack role add --project demo --user demo _member_
   58  openstack role list --project demo --user demo
   60  cp keystonerc_admin keystonerc_demo
   61  vi keystonerc_demo
   62  . keystonerc_demo
   64  openstack token issue


~~~

=======
## 보안그룹

#### Console

- novncprotocol : web 기반 console 접근
- CLI



#### Remote 접속

- SSH
- telnet
- rlogin



#### 인증 방식

- password 기반 인증
- key 기반 인증 (비대칭키)
  - public key (공개키)
  - primary key (개인키)



##### [root@controller ~]# ip netns exec qrouter-a48f3a24-f42a-46fd-8fd0-465b10705fb2 ssh cirros@10.0.0.212

The authenticity of host '10.0.0.212 (10.0.0.212)' can't be established.
RSA key fingerprint is SHA256:yEf+D+FbU59AiVz6Ap5g3x7Sw7yGWEe59e0yNTs+XfA.
RSA key fingerprint is MD5:f5:ce:69:22:9a:a6:5d:65:03:4f:dc:52:b5:a8:8f:71.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '10.0.0.212' (RSA) to the list of known hosts.
cirros@10.0.0.212's password: 

##### $ lsblk

NAME   MAJ:MIN RM    SIZE RO TYPE MOUNTPOINT
vda    253:0    0      1G  0 disk 
`-vda1 253:1    0 1011.9M  0 part /
vdb    253:16   0      1G  0 disk 
`-vdb1 253:17   0   1023M  0 part 
vdc    253:32   0      1G  0 disk 
`-vdc1 253:33   0   1023M  0 part 

##### $ sudo sh

##### $ df -h

Filesystem                Size      Used Available Use% Mounted on
/dev                     21.3M         0     21.3M   0% /dev
/dev/vda1                23.2M     18.1M      3.9M  82% /
tmpfs                    24.8M         0     24.8M   0% /dev/shm
tmpfs                   200.0K     72.0K    128.0K  36% /run

##### $ fdisk /dev/vdb

Command (m for help): n
Partition type:
   p   primary (1 primary, 0 extended, 3 free)
   e   extended
Select (default p): p
Partition number (1-4, default 2): 1
Partition 1 is already defined.  Delete it before re-adding it.

Command (m for help): m
Command action
   a   toggle a bootable flag
   b   edit bsd disklabel
   c   toggle the dos compatibility flag
   d   delete a partition
   l   list known partition types
   m   print this menu
   n   add a new partition
   o   create a new empty DOS partition table
   p   print the partition table
   q   quit without saving changes
   s   create a new empty Sun disklabel
   t   change a partition's system id
   u   change display/entry units
   v   verify the partition table
   w   write table to disk and exit
   x   extra functionality (experts only)

##### Command (m for help): d

Selected partition 1

##### Command (m for help): n

Partition type:
   p   primary (0 primary, 0 extended, 4 free)
   e   extended

##### Select (default p): p

##### Partition number (1-4, default 1): 1

First sector (2048-2097151, default 2048): 
Using default value 2048
Last sector, +sectors or +size{K,M,G} (2048-2097151, default 2097151): 
Using default value 2097151

##### Command (m for help): w

The partition table has been altered!

Calling ioctl() to re-read partition table.
Syncing disks.

##### $ mkfs -t ext4 /dev/vdb1

mke2fs 1.42.2 (27-Mar-2012)
Filesystem label=
OS type: Linux
Block size=4096 (log=2)
Fragment size=4096 (log=2)
Stride=0 blocks, Stripe width=0 blocks
65536 inodes, 261888 blocks
13094 blocks (5.00%) reserved for the super user
First data block=0
Maximum filesystem blocks=268435456
8 block groups
32768 blocks per group, 32768 fragments per group
8192 inodes per group
Superblock backups stored on blocks: 
	32768, 98304, 163840, 229376

Allocating group tables: done                            
Writing inode tables: done                            
Creating journal (4096 blocks): done
Writing superblocks and filesystem accounting information: done

##### $ ls

##### $ ls /

app         dev         init        linuxrc     mnt         proc        sbin        usr
bin         etc         initrd.img  lost+found  old-root    root        sys         var
boot        home        lib         media       opt         run         tmp         vmlinuz

##### $ mount /dev/vdb1 /app

##### $ df -h

Filesystem                Size      Used Available Use% Mounted on
/dev                     21.3M         0     21.3M   0% /dev
/dev/vda1                23.2M     18.1M      3.9M  82% /
tmpfs                    24.8M         0     24.8M   0% /dev/shm
tmpfs                   200.0K     72.0K    128.0K  36% /run
/dev/vdb1              1006.9M     17.3M    938.5M   2% /app

##### $ cp /etc/p* /app

##### $ ls /app/

lost+found  passwd      profile     protocols



```
Day3
--------------------------------------------------------------------------
보안그룹/Floating IP 생성
Keypair 생성
이미지

http://download.cirros-cloud.net/
인스턴스 시작

yum install -y openstack-utils

인스턴스 오류시
#openstack-status

neutron-openvswitch-agent  inactive  ---> systemctl start neutron-openvswitch-agent
 

볼륨 생성 후 연결하여 사용
-----------------------------------
lsblk
sudo sh
fdisk /dev/vdb  (partition 생성)
n->기본으로
lsblk
mkfs -t ext4 /dev/vdb1
mkdir /app
mount /dev/vdb1 /app
df -h
cp /etc/p* /app
ls /app
-----------------------------------
 
[root@controller ~]# ip netns
qrouter-8caebfa9-19f5-441c-83c2-19e342ec7978 (id: 1)
qdhcp-597b7e6c-866c-4a67-b485-e714fd1d050b (id: 0)
[root@controller ~]# ip netns exec qrouter-8caebfa9-19f5-441c-83c2-19e342ec7978 /bin/sh
sh-4.2# 
sh-4.2# ip a
sh-4.2# ssh cirros@10.0.0.212
The authenticity of host '10.0.0.212 (10.0.0.212)' can't be established.
RSA key fingerprint is SHA256:TfJccBH9eBIv0GnCcvxVrulw8cpTl+a3zUAyHrheHUc.
RSA key fingerprint is MD5:90:af:dd:93:fe:bb:e6:fe:5a:c4:0e:da:d5:63:9a:d6.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '10.0.0.212' (RSA) to the list of known hosts.
cirros@10.0.0.212's password:  cubswin:)
$ 
$ lsblk
NAME   MAJ:MIN RM    SIZE RO TYPE MOUNTPOINT
vda    253:0    0      1G  0 disk 
`-vda1 253:1    0 1011.9M  0 part /
vdb    253:16   0      1G  0 disk 
`-vdb1 253:17   0   1023M  0 part /app
$

/vm snapshot 생성
Swift 사용하기

5.OpenStack CLI로 관리하기 
Identity 서비스 (Keystone)
                 -서비스 특징 
                 -서비스 구조
                 -CLI로 관리
#cp keystonerc_admin keystonerc_stack1
# vi keystonerc_stack1 
unset OS_SERVICE_TOKEN
    export OS_USERNAME=stack1
    export OS_PASSWORD='abc123'
    export OS_REGION_NAME=RegionOne
    export OS_AUTH_URL=http://10.0.0.100:5000/v3
    export PS1='[\u@\h \W(keystone_stack1)]\$ '
    
export OS_PROJECT_NAME=pro1
export OS_USER_DOMAIN_NAME=Default
export OS_PROJECT_DOMAIN_NAME=Default
export OS_IDENTITY_API_VERSION=3

#source keystonerc_stack1
[root@controller ~(keystone_stack1)]#openstack token issue

-----------------------------------------------------------


Day4
manual 설치(https://docs.openstack.org/install-guide/)
------------------------------------------------------
Overview
Example architecture
Networking
Environment
  Security
  Host networking
  Network Time Protocol (NTP)
  OpenStack packages
  SQL database
  Message queue
  Memcached

5.OpenStack CLI로 관리하기 
Identity 서비스 (Keystone)
                 -서비스 특징 
                 -서비스 구조
                 -CLI로 관리

https://docs.openstack.org/keystone/rocky/install/index-rdo.html
```



~~~ 


   44  . keystonerc_admin 
   45  openstack project create --description "Demo Project" demo
   56  openstack user create --password abc123 --project demo demo
   57  openstack role add --project demo --user demo _member_
   58  openstack role list --project demo --user demo
   60  cp keystonerc_admin keystonerc_demo
   61  vi keystonerc_demo
   62  . keystonerc_demo
   64  openstack token issue


~~~

>>>>>>> b8af5f293951b11f99ca9ec5d5454f3560540455

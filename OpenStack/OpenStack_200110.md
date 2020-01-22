<<<<<<< HEAD
```
manual 설치(https://docs.openstack.org/install-guide/)

1.[root@controller ~]# vi /etc/sysconfig/network-scripts/ifcfg-ens33
#UUID=
IPADDR="10.0.0.11"
2.#systemctl restart network
3.#ip a
4.[root@controller ~]# vi /etc/hosts
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
10.0.0.11 controller
10.0.0.31 compute1

#vi /etc/chrony.conf
server 0.centos.pool.ntp.org iburst
server 1.centos.pool.ntp.org iburst
#server 2.centos.pool.ntp.org iburst
#server 3.centos.pool.ntp.org iburst
server 10.0.0.100 iburst

    8  date
    9  systemctl status chronyd
   10  systemctl restart chronyd
   11  chronyc sources
   
   
   10  yum install centos-release-openstack-rocky
   11  yum install python-openstackclient
   12  yum install openstack-selinux
   13  yum install mariadb mariadb-server python2-PyMySQL
   14  vi /etc/my.cnf.d/openstack.cnf
   
[mysqld]
bind-address = 10.0.0.11

default-storage-engine = innodb
innodb_file_per_table = on
max_connections = 4096
collation-server = utf8_general_ci
character-set-server = utf8

   16  systemctl enable mariadb
   17  systemctl start mariadb
   18  systemctl status mariadb
   19  mysql_secure_installation
```



#### Shared Message Queue

약결합 아키텍처

##### controller 에서

   44  openstack-status
   45  grep rabbit /etc/*/*conf
   46  openstack-status

##### manul 에서

   22  yum install rabbitmq-server
   23  openstack-status
   24  systemctl enable rabbitmq-server.service
   25  systemctl start rabbitmq-server.service
   26  rabbitmqctl add_user openstack RABBIT_PASS
   27  rabbitmqctl set_permissions openstack ".*" ".*" ".*"
   28  grep rabbit /etc/*/*conf
   29  history



   31  yum install memcached python-memcached
   32  vi /etc/sysconfig/memcached
   33  systemctl enable memcached.service
   34  systemctl start memcached.service
   35  systemctl status memcached.service
   36  ss -nlp|grep memcached.service
   37  ss -nlp|grep 11211



   39  mysql -u root -p

```
MariaDB [(none)]> CREATE DATABASE keystone;
MariaDB [(none)]> GRANT ALL PRIVILEGES ON keystone.* TO 'keystone'@'localhost' \
IDENTIFIED BY 'KEYSTONE_DBPASS';
MariaDB [(none)]> GRANT ALL PRIVILEGES ON keystone.* TO 'keystone'@'%' \
IDENTIFIED BY 'KEYSTONE_DBPASS';
```

   40  yum install openstack-keystone httpd mod_wsgi
   41  ls -l
   42  vi /etc/keystone/keystone.conf



 742 connection = mysql+pymysql://keystone:KEYSTONE_DBPASS@controller/keystone

 2829 provider = fernet



   43  su -s /bin/sh -c "keystone-manage db_sync" keystone



   44  cd /var/lib/mysql/keystone/

   45  ls

46 keystone-manage fernet_setup --keystone-user keystone --keystone-group keystone
47 keystone-manage credential_setup --keystone-user keystone --keystone-group keystone

 51  keystone-manage bootstrap --bootstrap-password ADMIN_PASS   --bootstrap-admin-url http://controller:5000/v3/   --bootstrap-internal-url http://controller:5000/v3/   --bootstrap-public-url http://controller:5000/v3/   --bootstrap-region-id RegionOne
   52  vi /etc/httpd/conf/httpd.conf

```
ServerName controller
```

   53  ln -s /usr/share/keystone/wsgi-keystone.conf /etc/httpd/conf.d/
   54  systemctl enable httpd.service
   55  systemctl start httpd.service



```
export OS_USERNAME=admin
export OS_PASSWORD=ADMIN_PASS
export OS_PROJECT_NAME=admin
export OS_USER_DOMAIN_NAME=Default
export OS_PROJECT_DOMAIN_NAME=Default
export OS_AUTH_URL=http://controller:5000/v3
export OS_IDENTITY_API_VERSION=3

openstack project create --domain default \
  --description "Service Project" service
openstack project create --domain default \
  --description "Demo Project" myproject
openstack user create --domain default \
  --password abc123 myuser
openstack role create myrole
openstack role add --project myproject --user myuser myrole
```





vi admin-openrc

```
export OS_PROJECT_DOMAIN_NAME=Default
export OS_USER_DOMAIN_NAME=Default
export OS_PROJECT_NAME=admin
export OS_USERNAME=admin
export OS_PASSWORD=ADMIN_PASS
export OS_AUTH_URL=http://controller:5000/v3
export OS_IDENTITY_API_VERSION=3
export OS_IMAGE_API_VERSION=2
export PS1='[\u@\h \W(keystone_admin)]\$ '
```

vi demo-openrc

```
export OS_PROJECT_DOMAIN_NAME=Default
export OS_USER_DOMAIN_NAME=Default
export OS_PROJECT_NAME=abc123
export OS_USERNAME=myuser
export OS_PASSWORD=MYUSER_PASS
export OS_AUTH_URL=http://controller:5000/v3
export OS_IDENTITY_API_VERSION=3
export OS_IMAGE_API_VERSION=2
export PS1='[\u@\h \W(keystone_admin)]\$ '
```



#### Glance 설치

```
https://docs.openstack.org/glance/rocky/install/

# mysql -u root -pabc123
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 23
Server version: 10.1.20-MariaDB MariaDB Server

Copyright (c) 2000, 2016, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> CREATE DATABASE glance;
Query OK, 1 row affected (0.00 sec)

MariaDB [(none)]> GRANT ALL PRIVILEGES ON glance.* TO 'glance'@'localhost' \
    ->   IDENTIFIED BY 'GLANCE_DBPASS';
Query OK, 0 rows affected (0.00 sec)

MariaDB [(none)]> GRANT ALL PRIVILEGES ON glance.* TO 'glance'@'%' \
    ->   IDENTIFIED BY 'GLANCE_DBPASS';
Query OK, 0 rows affected (0.00 sec)

MariaDB [(none)]> exit
Bye

openstack user create --domain default --password GLANCE_PASS glance
openstack user set --domain default --password GLANCE_PASS glance
openstack role add --project service --user glance admin


openstack service create --name glance   --description "OpenStack Image" image
 
openstack endpoint create --region RegionOne   image public http://controller:9292
openstack endpoint create --region RegionOne   image internal http://controller:9292
openstack endpoint create --region RegionOne   image admin http://controller:9292
```





```
vi /etc/glance/glance-api.conf
   1901 connection = mysql+pymysql://glance:GLANCE_DBPASS@controller/glance
   3475 [keystone_authtoken]
   3476 www_authenticate_uri  = http://controller:5000
   3477 auth_url = http://controller:5000
   3478 memcached_servers = controller:11211
   3479 auth_type = password
   3480 project_domain_name = Default
   3481 user_domain_name = Default
   3482 project_name = service
   3483 username = glance
   3484 password = GLANCE_PASS

4424 flavor = keystone
2007 [glance_store]
   2008 stores = file,http
   2009 default_store = file
   2010 filesystem_store_datadir = /var/lib/glance/images/
--------------------------------------------------------------------

vi /etc/glance/glance-registry.conf 

   1147 connection = mysql+pymysql://glance:GLANCE_DBPASS@controller/glance

  1254 [keystone_authtoken]
   1255 www_authenticate_uri = http://controller:5000
   1256 auth_url = http://controller:5000
   1257 memcached_servers = controller:11211
   1258 auth_type = password
   1259 project_domain_name = Default
   1260 user_domain_name = Default
   1261 project_name = service
   1262 username = glance
   1263 password = GLANCE_PASS

 2153 [paste_deploy]
   2154 flavor = keystone
su -s /bin/sh -c "glance-manage db_sync" glance
ls /var/lib/mysql/glance  

# systemctl enable openstack-glance-api.service \
  openstack-glance-registry.service
# systemctl start openstack-glance-api.service \
  openstack-glance-registry.service

yum install -y openstack-utils

[root@controller ~(keystone_admin)]# openstack-status
== Glance services ==
openstack-glance-api:                   active
openstack-glance-registry:              active
== Keystone service ==
```



```
187p
--------------------------
 yum install -y wget
http://download.cirros-cloud.net/0.3.5/cirros-0.3.5-x86_64-disk.img
   33  yum install -y wget
   34  wget http://download.cirros-cloud.net/0.3.5/cirros-0.3.5-x86_64-disk.img
   35  ls
   36  file cirros-0.3.5-x86_64-disk.img 
   37  openstack image create "cirros" --file cirros-0.3.5-x86_64-disk.img --disk-format qcow2 --container-format bare --public
   38  openstack image list
   39  ls /var/lib/glance/images/
   40  ls -l /var/lib/glance/images/
   41  glance image-show 6a4fa563-2c55-4baf-9709-6f2f070460bf

all-in-one
   86  scp 10.0.0.11:/root/ci* .
   87  qemu-img info cirros-0.3.5-x86_64-disk.img 
   88  qemu-img convert -O vmdk cirros-0.3.5-x86_64-disk.img cirros-0.3.5-x86_64-disk.vmdk 
   89  ls -l ci*
```

```
instance console 접속
  118  . keystonerc_stack1 
  119  nova list
  120  virsh list --all
  121  virsh console 1
연결 해제(^])

compute1 추가하기
https://docs.openstack.org/nova/rocky/install/compute-install.html
```
=======
```
manual 설치(https://docs.openstack.org/install-guide/)

1.[root@controller ~]# vi /etc/sysconfig/network-scripts/ifcfg-ens33
#UUID=
IPADDR="10.0.0.11"
2.#systemctl restart network
3.#ip a
4.[root@controller ~]# vi /etc/hosts
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
10.0.0.11 controller
10.0.0.31 compute1

#vi /etc/chrony.conf
server 0.centos.pool.ntp.org iburst
server 1.centos.pool.ntp.org iburst
#server 2.centos.pool.ntp.org iburst
#server 3.centos.pool.ntp.org iburst
server 10.0.0.100 iburst

    8  date
    9  systemctl status chronyd
   10  systemctl restart chronyd
   11  chronyc sources
   
   
   10  yum install centos-release-openstack-rocky
   11  yum install python-openstackclient
   12  yum install openstack-selinux
   13  yum install mariadb mariadb-server python2-PyMySQL
   14  vi /etc/my.cnf.d/openstack.cnf
   
[mysqld]
bind-address = 10.0.0.11

default-storage-engine = innodb
innodb_file_per_table = on
max_connections = 4096
collation-server = utf8_general_ci
character-set-server = utf8

   16  systemctl enable mariadb
   17  systemctl start mariadb
   18  systemctl status mariadb
   19  mysql_secure_installation
```



#### Shared Message Queue

약결합 아키텍처

##### controller 에서

   44  openstack-status
   45  grep rabbit /etc/*/*conf
   46  openstack-status

##### manul 에서

   22  yum install rabbitmq-server
   23  openstack-status
   24  systemctl enable rabbitmq-server.service
   25  systemctl start rabbitmq-server.service
   26  rabbitmqctl add_user openstack RABBIT_PASS
   27  rabbitmqctl set_permissions openstack ".*" ".*" ".*"
   28  grep rabbit /etc/*/*conf
   29  history



   31  yum install memcached python-memcached
   32  vi /etc/sysconfig/memcached
   33  systemctl enable memcached.service
   34  systemctl start memcached.service
   35  systemctl status memcached.service
   36  ss -nlp|grep memcached.service
   37  ss -nlp|grep 11211



   39  mysql -u root -p

```
MariaDB [(none)]> CREATE DATABASE keystone;
MariaDB [(none)]> GRANT ALL PRIVILEGES ON keystone.* TO 'keystone'@'localhost' \
IDENTIFIED BY 'KEYSTONE_DBPASS';
MariaDB [(none)]> GRANT ALL PRIVILEGES ON keystone.* TO 'keystone'@'%' \
IDENTIFIED BY 'KEYSTONE_DBPASS';
```

   40  yum install openstack-keystone httpd mod_wsgi
   41  ls -l
   42  vi /etc/keystone/keystone.conf



 742 connection = mysql+pymysql://keystone:KEYSTONE_DBPASS@controller/keystone

 2829 provider = fernet



   43  su -s /bin/sh -c "keystone-manage db_sync" keystone



   44  cd /var/lib/mysql/keystone/

   45  ls

46 keystone-manage fernet_setup --keystone-user keystone --keystone-group keystone
47 keystone-manage credential_setup --keystone-user keystone --keystone-group keystone

 51  keystone-manage bootstrap --bootstrap-password ADMIN_PASS   --bootstrap-admin-url http://controller:5000/v3/   --bootstrap-internal-url http://controller:5000/v3/   --bootstrap-public-url http://controller:5000/v3/   --bootstrap-region-id RegionOne
   52  vi /etc/httpd/conf/httpd.conf

```
ServerName controller
```

   53  ln -s /usr/share/keystone/wsgi-keystone.conf /etc/httpd/conf.d/
   54  systemctl enable httpd.service
   55  systemctl start httpd.service



```
export OS_USERNAME=admin
export OS_PASSWORD=ADMIN_PASS
export OS_PROJECT_NAME=admin
export OS_USER_DOMAIN_NAME=Default
export OS_PROJECT_DOMAIN_NAME=Default
export OS_AUTH_URL=http://controller:5000/v3
export OS_IDENTITY_API_VERSION=3

openstack project create --domain default \
  --description "Service Project" service
openstack project create --domain default \
  --description "Demo Project" myproject
openstack user create --domain default \
  --password abc123 myuser
openstack role create myrole
openstack role add --project myproject --user myuser myrole
```





vi admin-openrc

```
export OS_PROJECT_DOMAIN_NAME=Default
export OS_USER_DOMAIN_NAME=Default
export OS_PROJECT_NAME=admin
export OS_USERNAME=admin
export OS_PASSWORD=ADMIN_PASS
export OS_AUTH_URL=http://controller:5000/v3
export OS_IDENTITY_API_VERSION=3
export OS_IMAGE_API_VERSION=2
export PS1='[\u@\h \W(keystone_admin)]\$ '
```

vi demo-openrc

```
export OS_PROJECT_DOMAIN_NAME=Default
export OS_USER_DOMAIN_NAME=Default
export OS_PROJECT_NAME=abc123
export OS_USERNAME=myuser
export OS_PASSWORD=MYUSER_PASS
export OS_AUTH_URL=http://controller:5000/v3
export OS_IDENTITY_API_VERSION=3
export OS_IMAGE_API_VERSION=2
export PS1='[\u@\h \W(keystone_admin)]\$ '
```



#### Glance 설치

```
https://docs.openstack.org/glance/rocky/install/

# mysql -u root -pabc123
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 23
Server version: 10.1.20-MariaDB MariaDB Server

Copyright (c) 2000, 2016, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> CREATE DATABASE glance;
Query OK, 1 row affected (0.00 sec)

MariaDB [(none)]> GRANT ALL PRIVILEGES ON glance.* TO 'glance'@'localhost' \
    ->   IDENTIFIED BY 'GLANCE_DBPASS';
Query OK, 0 rows affected (0.00 sec)

MariaDB [(none)]> GRANT ALL PRIVILEGES ON glance.* TO 'glance'@'%' \
    ->   IDENTIFIED BY 'GLANCE_DBPASS';
Query OK, 0 rows affected (0.00 sec)

MariaDB [(none)]> exit
Bye

openstack user create --domain default --password GLANCE_PASS glance
openstack user set --domain default --password GLANCE_PASS glance
openstack role add --project service --user glance admin


openstack service create --name glance   --description "OpenStack Image" image
 
openstack endpoint create --region RegionOne   image public http://controller:9292
openstack endpoint create --region RegionOne   image internal http://controller:9292
openstack endpoint create --region RegionOne   image admin http://controller:9292
```





```
vi /etc/glance/glance-api.conf
   1901 connection = mysql+pymysql://glance:GLANCE_DBPASS@controller/glance
   3475 [keystone_authtoken]
   3476 www_authenticate_uri  = http://controller:5000
   3477 auth_url = http://controller:5000
   3478 memcached_servers = controller:11211
   3479 auth_type = password
   3480 project_domain_name = Default
   3481 user_domain_name = Default
   3482 project_name = service
   3483 username = glance
   3484 password = GLANCE_PASS

4424 flavor = keystone
2007 [glance_store]
   2008 stores = file,http
   2009 default_store = file
   2010 filesystem_store_datadir = /var/lib/glance/images/
--------------------------------------------------------------------

vi /etc/glance/glance-registry.conf 

   1147 connection = mysql+pymysql://glance:GLANCE_DBPASS@controller/glance

  1254 [keystone_authtoken]
   1255 www_authenticate_uri = http://controller:5000
   1256 auth_url = http://controller:5000
   1257 memcached_servers = controller:11211
   1258 auth_type = password
   1259 project_domain_name = Default
   1260 user_domain_name = Default
   1261 project_name = service
   1262 username = glance
   1263 password = GLANCE_PASS

 2153 [paste_deploy]
   2154 flavor = keystone
su -s /bin/sh -c "glance-manage db_sync" glance
ls /var/lib/mysql/glance  

# systemctl enable openstack-glance-api.service \
  openstack-glance-registry.service
# systemctl start openstack-glance-api.service \
  openstack-glance-registry.service

yum install -y openstack-utils

[root@controller ~(keystone_admin)]# openstack-status
== Glance services ==
openstack-glance-api:                   active
openstack-glance-registry:              active
== Keystone service ==
```



```
187p
--------------------------
 yum install -y wget
http://download.cirros-cloud.net/0.3.5/cirros-0.3.5-x86_64-disk.img
   33  yum install -y wget
   34  wget http://download.cirros-cloud.net/0.3.5/cirros-0.3.5-x86_64-disk.img
   35  ls
   36  file cirros-0.3.5-x86_64-disk.img 
   37  openstack image create "cirros" --file cirros-0.3.5-x86_64-disk.img --disk-format qcow2 --container-format bare --public
   38  openstack image list
   39  ls /var/lib/glance/images/
   40  ls -l /var/lib/glance/images/
   41  glance image-show 6a4fa563-2c55-4baf-9709-6f2f070460bf

all-in-one
   86  scp 10.0.0.11:/root/ci* .
   87  qemu-img info cirros-0.3.5-x86_64-disk.img 
   88  qemu-img convert -O vmdk cirros-0.3.5-x86_64-disk.img cirros-0.3.5-x86_64-disk.vmdk 
   89  ls -l ci*
```

>>>>>>> b8af5f293951b11f99ca9ec5d5454f3560540455

필기 25문항

실기 과목당 1개 * 5

compute1 설정하기

```
# yum install openstack-nova-compute -y

   14  cp /etc/nova/nova.conf /etc/nova/nova.conf.old
   15  scp controller:/etc/nova/nova.conf /etc/nova
   16  ls -l /etc/nova/nova.conf
   17  vi /etc/nova/nova.conf
------------------------------------
  1254 my_ip=10.0.0.101
  11017 vncserver_proxyclient_address=10.0.0.101
  
```



```
systemctl enable libvirtd.service openstack-nova-compute.service
systemctl start libvirtd.service 
systemctl start  openstack-nova-compute.service (starting 오류) <--- libvirtd restart 필요할 수 있음
----------------------------------------------------------

controller(starting 오류 해결 )
------------------------------------------------------------------------------
vi /etc/sysconfig/iptables
13번 아래에 추가
-A INPUT -s 10.0.0.101/32 -p tcp -m multiport --dports 5671,5672 -m comment --comment "001 amqp incoming amqp_10.0.0.101" -j ACCEPT
-A INPUT -s 10.0.0.101/32 -p tcp -m multiport --dports 5671,5672 -j ACCEPT
-A INPUT -s 10.0.0.100/32 -p tcp -m multiport --dports 5671,5672 -j ACCEPT

systemctl reload iptables
-----------------------------------------------------------------------------------
[root@controller ~]# . keystonerc_admin 
[root@controller ~(keystone_admin)]# openstack compute service list --service nova-compute
+----+--------------+------------+------+---------+-------+----------------------------+
| ID | Binary       | Host       | Zone | Status  | State | Updated At                 |
+----+--------------+------------+------+---------+-------+----------------------------+
|  7 | nova-compute | controller | nova | enabled | up    | 2020-01-14T01:01:00.000000 |
|  8 | nova-compute | compute1   | nova | enabled | up    | 2020-01-14T01:01:05.000000 |
+----+--------------+------------+------+---------+-------+----------------------------+

vi /etc/nova/nova.conf
   9662 [scheduler]
   9663 discover_hosts_in_cells_interval = 300

[root@controller ~(keystone_admin)]# su -s /bin/sh -c "nova-manage cell_v2 discover_hosts --verbose" nova
Found 2 cell mappings.
Skipping cell0 since it does not contain hosts.
Getting computes from cell 'default': 8afd82d6-6a72-4fad-b9b3-d4377c9e806f
Checking host mapping for compute host 'compute1': 7b9f0c79-da34-4845-83e7-4ef0b54e0d50
Creating host mapping for compute host 'compute1': 7b9f0c79-da34-4845-83e7-4ef0b54e0d50
Found 1 unmapped computes in cell: 8afd82d6-6a72-4fad-b9b3-d4377c9e806f
--------------------------------------------------------------------------------------
```

```
openstack server create --flavor m1.nano --image cirros-0.3.5 \
  --nic net-id=f265f70d-8e45-40cf-8928-14ce5fc3352b --security-group default \
  --key-name mykey selfservice-instance
```

```
Install and configure controller node
Prerequisites
Configure networking options
Configure the metadata agent
Configure the Compute service to use the Networking service
Finalize installation
-------------------------------------------------------------
Install and configure compute node
--------------------------------------------------
Install the components
yum install openstack-neutron-linuxbridge ebtables ipset -y

Configure the common component
----------------------------------------------
[root@compute1 ~]# cd /etc/neutron/
[root@compute1 neutron]# ls
conf.d  neutron.conf  plugins  rootwrap.conf
[root@compute1 neutron]# cp neutron.conf neutron.conf.old
[root@compute1 neutron]# scp controller:/etc/neutron/neutron.conf neutron.conf
root@controller's password: 
neutron.conf                                                         100%   71KB   4.8MB/s   00:00    
[root@compute1 neutron]# vi /etc/neutron/neutron.conf
761 #connection=mysql+pymysql://neutron:9e2064f267fd4602@10.0.0.100/neutron
:wq!

Configure networking options

[root@compute1 neutron]# vi /etc/neutron/plugins/ml2/linuxbridge_agent.ini
    146 [linux_bridge]
    147 physical_interface_mappings = provider:ens33

   205 [vxlan]
    206 enable_vxlan = true
    207 local_ip = 10.0.0.101
    208 l2_population = true

    182 [securitygroup]
    183 enable_security_group = true
    184 firewall_driver = neutron.agent.linux.iptables_firewall.IptablesFirewallDriver
    185 
[root@compute1 neutron]# modprobe br_netfilter
[root@compute1 neutron]# lsmod|grep br_netfilter
br_netfilter           22256  0 
bridge                151336  1 br_netfilter
[root@compute1 neutron]# sysctl -a|grep nf-call
net.bridge.bridge-nf-call-arptables = 0
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1

Configure the Compute service to use the Networking service
-------------------------------------------------------------------------
[root@compute1 neutron]# systemctl enable neutron-linuxbridge-agent
Created symlink from /etc/systemd/system/multi-user.target.wants/neutron-linuxbridge-agent.service to /usr/lib/systemd/system/neutron-linuxbridge-agent.service.
[root@compute1 neutron]# systemctl start neutron-linuxbridge-agent.service
[root@compute1 neutron]# systemctl status neutron-linuxbridge-agent.service
yum install -y openstack-utils
openstack-status
[root@controller ~(keystone_admin)]# openstack network agent list
+--------------------------------------+--------------------+------------+-------------------+-------+-------+---------------------------+
| ID                                   | Agent Type         | Host       | Availability Zone | Alive | State | Binary                    |
+--------------------------------------+--------------------+------------+-------------------+-------+-------+---------------------------+
| 1892bd72-a84a-4bc4-a037-1e2189cb4340 | Metadata agent     | controller | None              | :-)   | UP    | neutron-metadata-agent    |
| 32481bca-4d86-4b29-8c06-b158e6d0ac4e | L3 agent           | controller | nova              | :-)   | UP    | neutron-l3-agent          |
| 335a69a4-197e-4e27-bdfc-e8ff0df7f585 | Open vSwitch agent | controller | None              | :-)   | UP    | neutron-openvswitch-agent |
| 5b489ba0-1290-4e42-b69e-8355fc8716e7 | Metering agent     | controller | None              | :-)   | UP    | neutron-metering-agent    |
| 63333b1a-265b-4ab0-bc50-882fcf066f6c | Linux bridge agent | compute1   | None              | :-)   | UP    | neutron-linuxbridge-agent |
| fa6d6aa9-45bb-4741-9303-ea9e90efa099 | DHCP agent         | controller | nova              | :-)   | UP    | neutron-dhcp-agent        |
+--------------------------------------+--------------------+------------+-------------------+-------+-------+--------
Finalize installation
Linux bridge agent 추가 오류시 
[root@compute1 neutron]# vi linuxbridge-agent.log 
[root@compute1 neutron]# getenforce
Enforcing
[root@compute1 neutron]# setenforce 0
[root@compute1 neutron]# systemctl restart neutron-linuxbridge-agent
[root@compute1 neutron]# vi linuxbridge-agent.log 
[root@compute1 neutron]# vi /etc/selinux/config 
SELINUX=disabled

https://docs.openstack.org/install-guide/launch-instance.html
-------------------------------------------------------------------
openstack project create demo
openstack user create --domain default \
  --project demo --password abc123 demo
openstack role add --project demo --user demo _member_

[root@controller ~(keystone_admin)]# vi keystonerc_demo 
---------------------------------------------------------------------
unset OS_SERVICE_TOKEN
    export OS_USERNAME=demo
    export OS_PASSWORD='abc123'
    export OS_REGION_NAME=RegionOne
    export OS_AUTH_URL=http://10.0.0.100:5000/v3
    export PS1='[\u@\h \W(keystone_demo)]\$ '
    
export OS_PROJECT_NAME=demo
export OS_USER_DOMAIN_NAME=Default
export OS_PROJECT_DOMAIN_NAME=Default
export OS_IDENTITY_API_VERSION=3
------------------------------------------------------------------

Networking Option 2: Self-service networks
  217  . keystonerc_admin 
  227  openstack flavor create --id 0 --vcpus 1 --ram 64 --disk 1 m1.nano
  228  openstack flavor list
  229  . keystonerc_demo 
  230  ls .ssh
  231  openstack keypair create --public-key ~/.ssh/id_rsa.pub mykey
  232  openstack keypair list
  233  openstack security group rule create --proto icmp default
  234  openstack security group rule create --proto tcp --dst-port 22 default
  218  openstack network create selfservice
  219  openstack subnet create --network selfservice   --dns-nameserver 8.8.4.4 --gateway 172.16.1.1   --subnet-range 172.16.1.0/24 selfservice
  220  openstack router create router
  221  openstack router add subnet router selfservice
 
  223  openstack router set router --external-gateway ext1
  224  . keystonerc_admin 
  225  openstack port list --router router

  235  openstack image list
  236  ls
yum install -y wget
 wget http://download.cirros-cloud.net/0.3.5/cirros-0.3.5-x86_64-disk.img
  237   2 --file ./cirros-0.3.5-x86_64-disk.img 
  238  openstack image list
  239   openstack network list
penstack server create --flavor m1.nano --image cirros \
  --nic net-id=f86403ab-adfe-4447-af09-ba92a164dcb5 --security-group default \
  --key-name mykey selfservice-instance
# openstack server list

인스턴스 console 접속
--------------------------------------------------------------
 1. openstack console url show selfservice-instance (web기반 novnc protocol로 접속 가능)
 2. virsh list --all
    virsh console 1 ( disconnect는 ^] )
 ------------------------------------------------------------- 
  248  openstack floating ip create ext1
  249  openstack server add floating ip selfservice-instance 10.0.0.216
  255  ip netns exec qrouter-b716d035-eaee-4143-8489-c93dfb7241c7 ssh cirros@10.0.0.216

Block Storage (Cinder)
  258  vgs
  259  pvs
  260  losetup -a
  261  ls -l /var/lib/cinder/cinder-volumes
  262  lvs
  263  lsblk
  264  cinder create --name demo-v1 1
  265  cinder list
  270  nova volume-attach selfservice-instance a4a545cc-1ecf-4bc9-9d40-ab5124bd87ef auto
  271  lsblk

Object Storage Service(swift)
--------------------------------------
  274  swift post demo-c1
  275  swift upload demo-c1 cirros-0.3.5-x86_64-disk.img
  276  swift list demo-c1 --lh
  277  cd /var/tmp
  278  swift download demo-c1 
  279  ls -l
```

```
	<controller>
	
	1  yum update -y
    2  reboot
    3  systemctl status httpd
    4  ip a
    5  yum install -y openstack-utils
    6  openstack-tatus
    7  ip a
    8  systemctl status httpd
    9  openstack-status
   10  systemctl status httpd
   11  openstack-status
   12  ssh cirros@10.0.0.211
   13  exit
   14  ssh cirros@10.0.0.211
   15  ip netns
   16  ip netns exec qrouter-a48f3a24-f42a-46fd-8fd0-465b10705fb2
   17  ip netns exec qrouter-a48f3a24-f42a-46fd-8fd0-465b10705fb2 /bin/sh
   18  ip netns exec qrouter-a48f3a24-f42a-46fd-8fd0-465b10705fb2 /bin/sh -i /root/stack1-key1.pem cirros@10.0.0.211
   19  ip netns exec qrouter-a48f3a24-f42a-46fd-8fd0-465b10705fb2 ssh -i /root/stack1-key1.pem cirros@10.0.0.211
   20  chmod 600 /root/stack1-key1.pem 
   21  ip netns exec qrouter-a48f3a24-f42a-46fd-8fd0-465b10705fb2 ssh -i /root/stack1-key1.pem cirros@10.0.0.211
   22  exit
   23  ssh cirros@10.0.0.212
   24  ssh cirros@192.168.0.2
   25  ip netns exec qrouter-a48f3a24-f42a-46fd-8fd0-465b10705fb2 /bin/sh -i cirros@10.0.0.211
   26  ip netns exec qrouter-a48f3a24-f42a-46fd-8fd0-465b10705fb2 ssh -i cirros@10.0.0.211
   27  ip netns exec qrouter-a48f3a24-f42a-46fd-8fd0-465b10705fb2 ssh cirros@10.0.0.211
   28  ip netns exec qrouter-a48f3a24-f42a-46fd-8fd0-465b10705fb2 ssh cirros@10.0.0.212
   29  exit
   30  rpm -qa|grep -i mysql
   31  rpm -qa
   32  rpm -qa|grep -i mariadb
   33  mysql -uroot
   34  ls
   35  cat keystonerc_admin
   36  . keystonerc_admin
   37  ls
   38  cp keystonerc_admin keystonerc_stack1
   39  vi keystonerc_stack1
   40  . keystonerc_stack1
   41  openstack service list
   42  openstack token issue
   43  exit
   44  openstack-status
   45  grep rabbit /etc/*/*conf
   46  openstack-status
   47  history
   48  openstack endpouint list
   49  openstack endpoint list
   50  . keystone_admin
   51  . keystonerc_admin
   52  openstack endpoint list
   53  vi /etc/sysconfig/iptables
   54  systemctl reload iptables
   55  . keystonerc_admin
   56  openstack compute sevice list --service nova-compute
   57  openstack compute service list --service nova-compute
   58  su -s /bin/sh -c "nova-manage cell_v2 discover_hosts --verbose" nova
   59  exit
   60  su -s /bin/sh -c "nova-manage cell_v2 discover_hosts --verbose" nova
   61  vi /etc/nova/nova.conf 
   62  grep NEU openstack.txt
   63  neutron -agent-list
   64  neutron agent-list
   65  . keystonerc_admin 
   66  . keystonerc_admin 
   67  neutron agent-list
   68  neutron ext-list
   69  virsh list -all
   70  virsh list --all
   71  ps
   72  ovs-vsctl
   73  ovs-vsctl show
   74  ip s
   75* 
   76  ip netns
   77  ip netns exec qrouter-a48f3a24-f42a-46fd-8fd0-465b10705fb2
   78  ip netns exec qrouter-a48f3a24-f42a-46fd-8fd0-465b10705fb2 /bin/bash
   79  yum install openstack-neutron-linuxbridge ebtables ipset
   80  systemctl restart
   81  .keystonrc_admin
   82  . keystonrc_admin
   83  . keystonerc_admin
   84  openstack network agent list
   85  date
   86  openstack network agent list
   87* 
   88  openstack network agent list
   89  ls -l
   90  openstack network agent list
   91  openstack status
   92  openstack-status
   93  openstack network agent list
   94  openstack flavor list
   95  ls .ssh
   96  . keystonerc_demo
   97  . keystonerc_admin
   98  . keystonerc_demo
   99  openstack keypair create --publick-key ~/ ,ssh/id_rsa.pub
  100  openstack keypair create --publick-key ~/ ,ssh/id_rsa.pub mykey
  101  openstack keypair create --publick-key ~/ .ssh/id_rsa.pub mykey
  102  openstack keypair create --public-key ~/ .ssh/id_rsa.pub mykey
  103  openstack keypair create --public-key ~/.ssh/id_rsa.pub mykey
  104  openstack keypair list
  105  openstack security group rule create --proto icmp default
  106  openstack security group rule create --proto tcp --dst-port 22 default
  107  openstack network create selfservice
  108  openstack subnet create --network selfservice   --dns-nameserver 8.8.4.4 --gateway 172.16.1.1   --subnet-range 172.16.1.0/24 selfservice
  109  openstack router create router
  110  openstack router add subnet router selfservice
  111  openstack router set router --external-gateway ext1
  112  ip netns
  113  openstack port list --router router
  114  . keystonerc_admin
  115  openstack port list --router router
  116  . keystonerc_demo
  117  openstack image list
  118  ls
  119  openstack image create "cirros" --container-format bare--disk-fomat qcow2 --file ./cirros-0.3.5-x86_64-disk.img
  120  openstack image create "cirros" --container-format bare --disk-fomat qcow2 --file ./cirros-0.3.5-x86_64-disk.img
  121  openstack image create "cirros" --container-format bare --disk-format qcow2 --file ./cirros-0.3.5-x86_64-disk.img
  122  openstack image list
  123  openstack network list
  124  openstack server list
  125  openstack server create --flavor m1.nano --image cirros-0.3.5   --nic net-id=f265f70d-8e45-40cf-8928-14ce5fc3352b --security-group default   --key-name mykey selfservice-instance
  126  openstack server create --flavor m1.nano --image cirros   --nic net-id=f265f70d-8e45-40cf-8928-14ce5fc3352b --security-group default   --key-name mykey selfservice-instance
  127  openstack flavoe list
  128  openstack flavor list
  129  . keystone_admin
  130  . keystonerc_admin
  131  openstack flavor create --id 0 --vcpus 1 --ram 64 --disk 1 m1.nano
  132  . keystonerc_demo
  133  openstack server create --flavor m1.nano --image cirros --nic net-id=f265f70d-8e45-40cf-8928-14ce5fc3352b --security-group default   --key-name mykey selfservice-instance
  134  openstack console url show selfservice-instance
  135  vish list --all
  136  virsh list --all
  137  virsh console 1
  138  openstack floating ip create ext1
  139  openstack server add floating ip selfservice-instance 10.0.0.216
  140  ip netns exec qrouter-b716d035-eaee-4143-8489-c93dfb7241c7 ssh cirros@10.0.0.216
  141  openstack server add floating ip selfservice-instance 10.0.0.213
  142  ip netns exec qrouter-b716d035-eaee-4143-8489-c93dfb7241c7 ssh cirros@10.0.0.213
  143  ip netns exec qrouter-cc0ea854-0d7e-462c-98fc-594f6f2fc7ed ssh cirros@10.0.0.213
  144  gs
  145  vgs
  146  pvs
  147  losetup -a
  148  openstack server list
  149  cinder create --name demo-v1 1
  150  cinder list
  151  lvs
  152  nova volume-attach selfservice-instance ae25135a-30c4-45b1-81fe-fd1d4a41b68a auto
  153  lsblk
  154  swift post d1
  155  swift upload d1 cirros-0.3.5-x86_64-disk.img
  156  swift list d1 --lh
  157  cd /var/tmp
  158  swift dowload demo-c1
  159  ls -l
  160  swift download demo-c1
  161  swift download d1
  162  ls -l
```



```
1  yum update -y
    2  reboot
    3  ifconfig
    4  yum update -y
    5  restart
    6  rebot
    7  reboot
    8  vi /etc/sysconfig/network-scripts/ifcfg-ens33
    9  hostname
   10  systemctl restart network
   11  ip a
   12  vi /etc/hosts
   13  reboot
   14  ifconfig
   15  hostname
   16  hostnamectl set-hostname --static compute1
   17  hostnamectl
   18  restart
   19  hostnamectl set-hostname compute1
   20  exit
   21  hostnamectl
   22  ip a s ens33
   23  cat /etc/hosts
   24  hostnamectl set-hostname 
   25  vi /etc/sysconfig/network-scripts/ifcfg-ens33
   26  yum install openstack-nova-compute
   27  cp /etc/nova/nova.conf.old
   28  cp /etc/nova/nova.conf /etc/nova/nova.conf.old
   29  scp controller:/etc/nova/nova.conf /etc/nova
   30  vi /etc/nova/nova.conf
   31  systemctl enable libvirtd.service openstack-nova-compute.service
   32  systemctl start libvirtd.service openstack-nova-compute.service
   33  systemctl start libvirtd.service
   34  systemctl start  openstack-nova-compute.service
   35  systemctl enable libvirtd.service openstack-nova-compute.service
   36  systemctl start libvirtd.service
   37  systemctl start  openstack-nova-compute.service
   38  yum install openstack-neutron-linuxbridge ebtables ipset
   39  yum install openstack-neutron-linuxbridge ebtables ipset -y
   40  cd neutron.conf neutron.conf.old
   41  cp neutron.conf neutron.conf.old
   42  . neutron
   43  cd /etc/neutron
   44  cp neutron.conf neutron.conf.old
   45  vi /etc/neutron/neutron.conf
   46  scp controller://etc/neutron/neutron.conf neutron.conf
   47  vi /etc/neutron/neutron.conf
   48  vi /etc/neutron/plugins/ml2/linuxbridge_agent.ini
   49  sysctl -a|grep nf-call
   50  lsmod|grep br_netfilter
   51  nodprobe br_netfilter
   52  modprobe br_netfilter
   53  lsmod|grep br_netfilter
   54  sysctl -a|grep nf-call
   55  ls /boot
   56  systemctl enable neutron-linuxbridge-agent
   57* 
   58  systemctl status neutron-linuxbridge-agent
   59  yum install openstack-utils -y
   60  opnestack-status
   61  opnestack status
   62  opnestack-status
   63  yum install openstack-utils
   64  opnestack-status
   65  openstack-status
   66  restart
   67  exit
   68  systemctl restart neutron-linuxbridge-agent
   69  ls -l
   70  ps
   71  ls
   72  cd /etc/neutron
   73  getenforce
   74  setenforce 0
   75  systemctl restart neutron-linuxbridge-agent
   76  vi linuxbridge-agent.log
   77  vi /etc/selinux/config 
   78  systemctl restart neutron-linuxbridge-agent
   79  vi /etc/neutron/plugins/ml2/linuxbridge_agent.ini
   80  systemctl restart neutron-linuxbridge-agent
```




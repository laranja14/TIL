[root@rocky-controller ~]# ip netns
qrouter-c1a800d7-7fd3-4c70-8b13-c8a092958461 (id: 1)
qdhcp-f800f626-6cad-423c-b51d-8163415873da (id: 0)
[root@rocky-controller ~]# ip netns exec -it qrouter-c1a800d7-7fd3-4c70-8b13-c8a092958461 /bin/sh
Cannot open network namespace "-it": No such file or directory
[root@rocky-controller ~]# netns exec -it qrouter-c1a800d7-7fd3-4c70-8b13-c8a092958461 /bin/sh
-bash: netns: command not found
[root@rocky-controller ~]# ip netns exec qrouter-c1a800d7-7fd3-4c70-8b13-c8a092958461 /bin/sh
sh-4.2# ssh cirros
ssh: Could not resolve hostname cirros: Name or service not known
sh-4.2# ssh cirros@10.0.0.8
The authenticity of host '10.0.0.8 (10.0.0.8)' can't be established.
RSA key fingerprint is SHA256:aqyW2PKmy/Dni6j/2AzgManukuBGjejA9j+/ahFBRxc.
RSA key fingerprint is MD5:3c:94:26:9b:7c:c2:61:85:2b:d0:27:41:47:a1:53:cf.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '10.0.0.8' (RSA) to the list of known hosts.
cirros@10.0.0.8's password: 
$ exit
Connection to 10.0.0.8 closed.
sh-4.2# exit
exit
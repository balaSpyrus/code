# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "stackroute/xenial"
  config.vm.box_url = "http://172.23.238.251/vagrant/boxes/xenial64.box"
  config.vm.network "forwarded_port", guest: 8080, host: 8080
  config.vm.network "forwarded_port", guest: 7474, host: 7474
  config.vm.network "forwarded_port", guest: 8081, host: 8081
  config.vm.network "forwarded_port", guest: 27017, host: 27017

  config.vm.provision :puppet
end

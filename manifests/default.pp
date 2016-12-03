class ubuntumongo {

  exec { 'set the mongodb key':
    command => '/usr/bin/sudo /usr/bin/apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927',
  }

  exec { 'get the repo':
    command => '/bin/echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list',
    require => Exec['set the mongodb key'],
  }

  exec { 'update the apt-get':
    command => '/usr/bin/apt-get update',
    require => Exec['get the repo'],
  }

  package { 'mongodb-org':
    ensure => installed,
    require => Exec['update the apt-get'],
  }

  file { '/usr/lib/systemd/system':
      ensure => 'directory',
  }

  file { '/usr/lib/systemd/system/mongodb.service':
    ensure  => present,
    owner   => 'root',
    group   => 'root',
    mode    => '0777',
    source  => '/vagrant/support/mongodb.service',
  }

  exec { 'enable systemd mongo service':
    command => '/usr/bin/sudo systemctl enable mongodb.service',
    require => Package['mongodb-org'],
  }

  exec { 'start systemd mongo service':
    command => '/usr/bin/sudo systemctl start mongodb.service',
    require => Exec['enable systemd mongo service'],
  }
}

class nodejs {

  exec { 'get the repo for nodejs':
    command => '/usr/bin/sudo /usr/bin/curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -',
  }

  package { 'nodejs':
    ensure  => installed,
    require => Exec['get the repo for nodejs'],
  }

}

class others {

  package {'git':
    ensure  => installed
  }

  package {'build-essential':
    ensure  => installed
  }
}

class node6mong32 {
  Class['ubuntumongo'] -> Class['nodejs'] -> Class['others']
}

include ubuntumongo
include nodejs
include others
include node6mong32

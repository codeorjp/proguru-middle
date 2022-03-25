# proguru-middle

## Get Started

### Install libraries

```shell
$ brew install \
    ruby-build \
    rbenv \
    direnv \
    imagemagick
```

Setting up environment variables by direnv.

```shell
# bash
$ echo 'eval "$(direnv hook bash)"' >> ~/.bashrc

# if not exist this line in ~/.bash_profile, execute this command.
$ echo '. ~/.bashrc' >> ~/.bash_profile

# zsh
$ echo 'eval "$(direnv hook zsh)"' >> ~/.zshrc
```

Enable to control .envrc file.

```shell
$ cp .envrc.sample .envrc
$ direnv allow
```

If you want to edit .envrc file.

```shell
$ direnv edit
```


Setting up rbenv with reference docs.
- [rbenv Installation](https://github.com/rbenv/rbenv#installation)

```shell
# Install Ruby
$ rbenv install $(cat .ruby-version)
```

Install gems by bundler.

```shell
$ gem install -N bundler -v 2.1.4
$ bundle config --local build.mysql2 --with-opt-dir="$(brew --prefix openssl)"
$ bundle install
```

Select development environment from docker or local for the following.

### Setup docker

Install Docker (& docker-compose) at first.
[Get Docker: About Docker Engine - CommunityAbout Docker Engine - Community](https://docs.docker.com/install/)

```shell
$ docker-compose up
```

You can check email at mailcatcher.
http://0.0.0.0:1080

### DB migration

Setting up database & running migration

```shell
$ bin/rails db:setup
```

### Start processes

```shell
$ foreman start
```

## License

- [GNU AFFERO GENERAL PUBLIC LICENSE](https://github.com/codeorjp/proguru-middle/blob/master/LICENSE)

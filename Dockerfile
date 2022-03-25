# ビルドステージ
FROM ruby:2.6.6-slim-stretch as builder

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    imagemagick \
    default-libmysqlclient-dev \
    g++ \
    gcc \
    git \
    libxml2-dev \
    libxslt-dev \
    make

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash && \
    apt-get install -y nodejs && \
    curl https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get -y update && apt-get -y install yarn

RUN gem install bundler --version 2.1.4 -N

WORKDIR /app
COPY Gemfile Gemfile.lock /app/
RUN bundle install -j4 --path vendor/bundle --deployment --without development test

COPY package.json yarn.lock /app/
RUN yarn install

COPY . /app

ARG RAILS_ENV
ARG WEB_HOST
ARG RAILS_MASTER_KEY

ENV RAILS_ENV=$RAILS_ENV \
    WEB_HOST=$WEB_HOST \
    RAILS_MASTER_KEY=$RAILS_MASTER_KEY

RUN bundle exec rake assets:precompile assets:upload_to_gcs

# Railsアプリ用ステージ
FROM ruby:2.6.6-slim-stretch

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    imagemagick \
    default-libmysqlclient-dev

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash && \
    apt-get install -y nodejs

WORKDIR /app
COPY . /app
COPY --from=builder /usr/local/bundle /usr/local/bundle
COPY --from=builder /app/vendor /app/vendor
COPY --from=builder /app/public /app/public

ENV RAILS_LOG_TO_STDOUT=1

ARG RAILS_ENV
ARG WEB_HOST
ARG RAILS_MASTER_KEY

ENV RAILS_ENV=$RAILS_ENV \
    WEB_HOST=$WEB_HOST \
    RAILS_MASTER_KEY=$RAILS_MASTER_KEY

CMD ["./start.sh"]

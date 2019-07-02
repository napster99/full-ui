FROM registry.shdocker.tuya-inc.top/fe-base/deploy/node-python:8.10.1-alpine AS compile

WORKDIR /code
COPY . /code
RUN yarn
RUN yarn deploy:build

FROM registry.shdocker.tuya-inc.top/mirror/nginx:1.15.0

ADD .docker/nginx.bs.conf /etc/nginx/conf.d/default.conf
ADD .docker /

COPY --from=compile /code/examples/element-ui /www

RUN chmod -R 755 /www
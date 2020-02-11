FROM node:12.0.0

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app
WORKDIR $HOME/sea_urchin

COPY package.json webpack* tsconfig.json $HOME/sea_urchin/
COPY client $HOME/sea_urchin/client
COPY .env $HOME/sea_urchin/.env

RUN chown -R app:app $HOME/*

RUN npm install

#RUN yarn build
#USER root
# COPY . $HOME/p-drum
#RUN chown -R app:app $HOME/*
#USER app

#CMD ["tail", "-f", "/dev/null"]
CMD ["npm", "run", "prd"]



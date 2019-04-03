FROM node

RUN mkdir /ExpressBases
ADD ./ /ExpressBases

WORKDIR /ExpressBases

ENV PATH ./node_modules/.bin/$PATH

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

RUN npm install

COPY . .

CMD ["npm", "start"]
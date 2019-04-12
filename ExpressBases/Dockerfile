#Reactjs Container FrontEnd
FROM node

RUN mkdir /ReactBases
ADD ./ /ReactBases

WORKDIR /ReactBases

ENV PATH ./node_modules/.bin/$PATH

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

COPY src/ ./src

RUN npm install
RUN npm install react-scripts@^2.1.8

EXPOSE 3000

CMD ["npm", "start"]
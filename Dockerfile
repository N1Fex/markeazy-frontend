FROM node:20-alpine3.21
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . /app

ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL $REACT_APP_BACKEND_URL

RUN npm run build
CMD ["npm", "start"]
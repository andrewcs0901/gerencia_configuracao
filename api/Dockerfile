FROM node:lts
WORKDIR /app

COPY package*.json ./ 
COPY tsconfig.json ./ 

RUN npm install

COPY . ./

ENV NODE_ENV=production
ENV PORT=5000 

RUN npm run build  

CMD ["npm", "start"]
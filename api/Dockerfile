FROM node:lts
WORKDIR /app

ENV NODE_ENV=development
ENV PORT=5000
ENV DATABASE_URL=postgres://rbckbeedgymnpo:ca5d02217e9b70ae49e8311c2b907b639448515c8d10768a7bf17309b5844696@ec2-44-196-244-150.compute-1.amazonaws.com:5432/dieijga5hd1vh

COPY package*.json ./ 
COPY tsconfig.json ./ 

RUN npm install

COPY . ./

RUN npm run build 

EXPOSE 5000 

CMD ["npm", "start"]
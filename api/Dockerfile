FROM node:lts
WORKDIR /app

COPY package*.json ./ 
COPY tsconfig.json ./ 

RUN npm install

COPY . ./

ENV NODE_ENV=production
ENV PORT=5000
ENV DATABASE_URL=postgres://rbckbeedgymnpo:ca5d02217e9b70ae49e8311c2b907b639448515c8d10768a7bf17309b5844696@ec2-44-196-244-150.compute-1.amazonaws.com:5432/dieijga5hd1vh

RUN npm run build  

CMD ["npm", "start"]

#STAGE 1: Build the application
#create-nodejs-image and in ubuntu
FROM node:20-alpine AS builder

#/mkdir app and cd /app
WORKDIR /app

#copy package.json and package-lock.json to /app
COPY package*.json ./

#copy all dependency to /app and
RUN npm ci

#copy all source code and build it 
COPY . .
RUN npm run build

#STAGE 2: Run the production 
FROM node:20-alpine 
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]




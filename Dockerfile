FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Build production files
RUN npm run build

# Use nginx to serve frontend
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

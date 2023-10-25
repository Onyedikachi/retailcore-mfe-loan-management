# Use the Node.js base image
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock /app/

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy the application code to the container
# COPY ./src /src
# COPY ./dist /dist
# COPY webpack.config.js babel.config.json nginx.conf tsconfig.json commitlint.config.js .env ./

COPY . /app/

# Build the application (replace with your build command)
RUN yarn build
# Stage 2 - Serve the application using Nginx
FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

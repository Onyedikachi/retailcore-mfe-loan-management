# Stage 1 - Build the application
FROM ghcr.io/sterling-retailcore-team/node-base-image:18 AS build

WORKDIR /src

COPY package.json yarn.lock ./

RUN yarn --ignore-scripts

COPY ./src /src/src/
COPY ./.eslintrc.js /src/.eslintrc.js
COPY ./babel.config.json /src/babel.config.json
COPY ./cert.pem /src/cert.pem
COPY ./Dockerfile /src/Dockerfile
COPY ./jest.config.js /src/jest.config.js
COPY ./key.pem /src/key.pem
COPY ./nginx.conf /src/nginx.conf
COPY ./package.json /src/package.json
COPY ./.prettierrc.js /src/.prettierrc.js
COPY ./sonar-project.properties /src/sonar-project.properties
COPY ./tsconfig.json /src/tsconfig.json
COPY ./webpack.config.js /src/webpack.config.js

RUN yarn --ignore-scripts build:webpack

# Stage 2 - Serve the application using Nginx
FROM ghcr.io/sterling-retailcore-team/nginx-base-image:3.17

# Create a non-root user named "appuser" for Nginx
RUN addgroup -S appuser && adduser -S appuser -G appuser

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application from the build stage
COPY --from=build /src/dist /usr/share/nginx/html

# Adjust ownership of copied files to "appuser"
RUN chown -R appuser:appuser /usr/share/nginx/html && \
    chown -R appuser:appuser /var/cache/nginx && \
    chown -R appuser:appuser /var/run && \
    chown -R appuser:appuser /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown appuser:appuser /var/run/nginx.pid

# Switch to the non-root user for running Nginx
USER appuser

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

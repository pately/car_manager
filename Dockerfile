FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Copy app source code
COPY . .

# Install app dependencies
RUN ./setup.sh

#Expose port and start application
EXPOSE 3000

CMD [ "npm", "start" ]
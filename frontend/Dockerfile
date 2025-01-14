FROM node:latest
WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev"]

# # Production Stage
# FROM nginx:latest AS production
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

FROM ruby:2.5-slim

WORKDIR /app

# System library dependencies
RUN apt-get update && apt-get install -y build-essential nodejs git

# Add and install Ruby library dependencies
ADD Gemfile* /app/
RUN gem install bundler && bundle

# Middleman's server port
EXPOSE 4567

# Run the development server by default
CMD middleman server

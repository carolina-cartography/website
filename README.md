# Carolina Cartography Collective website

Built with [Jekyll](https://jekyllrb.com/)

## Setup for local development

1. Setup Ruby 2.7 using RVM
```
curl -sSL https://get.rvm.io | bash -s stable
rvm install 2.7
rvm use 2.7
```

2. Setup Jekyll and Bundler
```
gem install jekyll bundler
```

3. Install required packages by running the following command from the repository directory:
```
bundle install
```
## Start develop mode

Run the following command from the repository directory to run Jekyll in development mode:
```
bundle exec jekyll serve
```

# Configuration
# set :environment, :production
set :rdoc, :layout_engine => :erb

configure :production do
  set :port, 80
end

configure :development do
  set :port, 8080
end
require "data-uri"

class Img
  attr_reader :name, :type, :size

  def initialize(name, type, data)
    @name = name
    @type = type
    @data = data
    @size = (File.size(@data).to_f / 1000).round(1)
  end

  def toURI
    Base64.encode64(@data.read).split(" ").join("")
  end
end
# puts "seeding users..."

# 5.times do 
#   User.create(
#     firstname: Faker::Name.first_name,
#     lastname: Faker::Name.last_name,
#     username: Faker::Twitter.unique.screen_name,
#     email: Faker::Internet.unique.email,
#     password_digest: Faker::Internet.unique.password
#   )
# end

# puts "done seeding users 🌱"

puts "seeding subject matters..."

SubjectMatter.create(
  title: "JavaScript"
)
SubjectMatter.create(
  title: "Ruby"
)
SubjectMatter.create(
  title: "Golang"
)
SubjectMatter.create(
  title: "React"
)
SubjectMatter.create(
  title: "Ruby on Rails"
)
SubjectMatter.create(
  title: "Mathematics"
)
SubjectMatter.create(
  title: "Data Structure and Algorithms"
)
SubjectMatter.create(
  title: "English"
)
SubjectMatter.create(
  title: "Communication"
)SubjectMatter.create(
  title: "Interview Skills"
)

puts "done seeding subject matters 🌱"
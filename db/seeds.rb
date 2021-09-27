puts "seeding users..."

5.times do 
  User.create(
    firstname: Faker::Name.first_name,
    lastname: Faker::Name.last_name,
    username: Faker::Twitter.unique.screen_name,
    email: Faker::Internet.unique.email,
    password_digest: Faker::Internet.unique.password
  )
end

puts "done seeding users 🌱"
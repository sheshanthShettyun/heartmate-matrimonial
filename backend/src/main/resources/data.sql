INSERT IGNORE INTO users (user_id, name, email, password) VALUES
(1, 'Sriyaan', 'sriyaan@example.com', '$2a$10$e7K.0g9yZ3p4.2.W2U8a3e7a0oYm74M4e4c2S6b1y4U5a3b2c1d2e'),
(2, 'Priya Patel', 'priya@example.com', '$2a$10$e7K.0g9yZ3p4.2.W2U8a3e7a0oYm74M4e4c2S6b1y4U5a3b2c1d2e'),
(3, 'Rohan Mehta', 'rohan@example.com', '$2a$10$e7K.0g9yZ3p4.2.W2U8a3e7a0oYm74M4e4c2S6b1y4U5a3b2c1d2e'),
(4, 'Ananya Singh', 'ananya@example.com', '$2a$10$e7K.0g9yZ3p4.2.W2U8a3e7a0oYm74M4e4c2S6b1y4U5a3b2c1d2e'),
(5, 'Vikram Reddy', 'vikram@example.com', '$2a$10$e7K.0g9yZ3p4.2.W2U8a3e7a0oYm74M4e4c2S6b1y4U5a3b2c1d2e'),
(6, 'Meera Nair', 'meera@example.com', '$2a$10$e7K.0g9yZ3p4.2.W2U8a3e7a0oYm74M4e4c2S6b1y4U5a3b2c1d2e'),
(7, 'Arjun Kapoor', 'arjun@example.com', '$2a$10$e7K.0g9yZ3p4.2.W2U8a3e7a0oYm74M4e4c2S6b1y4U5a3b2c1d2e'),
(8, 'Diya Joshi', 'diya@example.com', '$2a$10$e7K.0g9yZ3p4.2.W2U8a3e7a0oYm74M4e4c2S6b1y4U5a3b2c1d2e'),
(9, 'Kabir Malhotra', 'kabir@example.com', '$2a$10$e7K.0g9yZ3p4.2.W2U8a3e7a0oYm74M4e4c2S6b1y4U5a3b2c1d2e'),
(10, 'Isha Agarwal', 'isha@example.com', '$2a$10$e7K.0g9yZ3p4.2.W2U8a3e7a0oYm74M4e4c2S6b1y4U5a3b2c1d2e'),
(11, 'Siddharth Rao', 'siddharth@example.com', '$2a$10$e7K.0g9yZ3p4.2.W2U8a3e7a0oYm74M4e4c2S6b1y4U5a3b2c1d2e'),
(12, 'Nisha Verma', 'nisha@example.com', '$2a$10$e7K.0g9yZ3p4.2.W2U8a3e7a0oYm74M4e4c2S6b1y4U5a3b2c1d2e'),
(60, 'Admin User', 'admin@example.com', '$2a$10$e7K.0g9yZ3p4.2.W2U8a3e7a0oYm74M4e4c2S6b1y4U5a3b2c1d2e');

INSERT IGNORE INTO profiles (profile_id, user_id, age, gender, city, education, occupation, about) VALUES
(1, 1, 24, 'Male', 'Delhi', 'B.Tech CSE', 'Software Developer', 'Young and ambitious. Love coding, cricket, and weekend treks with friends.'),
(2, 2, 25, 'Female', 'Mumbai', 'MBA Finance', 'Financial Analyst', 'Foodie at heart. Love exploring cafes, reading fiction, and painting on lazy Sundays.'),
(3, 3, 30, 'Male', 'Bangalore', 'M.Tech Electronics', 'Hardware Engineer', 'Music lover, amateur guitarist. Work hard, play hard. Weekend cricket with friends.'),
(4, 4, 27, 'Female', 'Delhi', 'B.Com', 'Chartered Accountant', 'Calm and career-driven. Morning walks, classical dance, home-cooked meals.'),
(5, 5, 29, 'Male', 'Hyderabad', 'B.Tech IT', 'Product Manager', 'Avid traveler — 12 countries and counting. Photography, street food, long drives.'),
(6, 6, 26, 'Female', 'Chennai', 'M.Sc Data Science', 'Data Analyst', 'Bookworm and coffee enthusiast. Slow mornings, podcasts, weekend getaways.'),
(7, 7, 31, 'Male', 'Jaipur', 'MBA Marketing', 'Marketing Head', 'Fitness freak. Marathon runner. Dogs, cooking experiments, old Bollywood music.'),
(8, 8, 24, 'Female', 'Kolkata', 'B.A English Literature', 'Content Writer', 'Poetry lover. Journal every day. Rainy days, indie music, long conversations.'),
(9, 9, 23, 'Male', 'Mumbai', 'B.Tech Mechanical', 'Automobile Engineer', 'Car enthusiast and Formula 1 fan. Weekends are for road trips and trying new dhabas.'),
(10, 10, 23, 'Female', 'Pune', 'B.Sc Nursing', 'Nurse', 'Compassionate and caring. Love gardening, baking, and spending time with family.'),
(11, 11, 32, 'Male', 'Delhi', 'LLB', 'Lawyer', 'Argumentative by profession, chill by nature. Long walks in Lodhi Garden and street food.'),
(12, 12, 26, 'Female', 'Bangalore', 'B.Des Fashion', 'Fashion Designer', 'Creative soul. Love colors, textures, weekend art exhibitions, and thrift shopping.'),
(60, 60, 35, 'Male', 'Mumbai', 'Ph.D System Admin', 'System Administrator', 'Master admin account overseeing HeartMate database and candidate matches.');

INSERT IGNORE INTO interests (interest_id, sender_id, receiver_id, status) VALUES
(1, 1, 2, 'PENDING'),
(2, 3, 4, 'ACCEPTED'),
(3, 5, 6, 'PENDING'),
(4, 7, 2, 'PENDING'),
(5, 9, 10, 'PENDING'),
(6, 11, 12, 'PENDING');
